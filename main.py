import logging
from google.appengine.ext import webapp
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
from django.utils import simplejson as json
from google.appengine.ext import db

meetups={}
shapes={}
        
class CanvasSheet:

    def __init__(self):
        self.members = []
        self.state = []
        self.objectids = []
        self.slide = 0

    def add_unit(self,message):
        self.state.append(message)

    def export_to_json(self):
        str=self.state
        print str	
        return json.dumps({
           'state': self.state,
        })
    def send_state_to_clients(self):
        
        json = self.export_to_json()
##        if (self.presenter):
##            channel.send_message(self.presenter.user_id(),json)
##        if (self.viewer):
##            channel.send_message(self.viewer.user_id(),json)
    def send_sync(self,user,type):
        channel.send_message(user.user_id(),json.dumps({
            'type' : type,
           'objects':  self.state
        }))
    #Sending message to all user except current user
    def send_all(self , user , message,type):
        for u in self.members :
            if u != user:
                channel.send_message(u.user_id(),json.dumps({
            'type' : type,
           'object':  message
        }))
    #Sending message to all user including current user       
    def send_all_users(self , user , url,type):
        for u in self.members :
            channel.send_message(u.user_id(),json.dumps({
            'type' : type,
           'url':  url
        }))
            
    def send_chat_message(self , user , message,type):
        for u in self.members :
                channel.send_message(u.user_id(),json.dumps({
            'type' : type,
            'user' : user.nickname(),
           'chat':  message
        }))
    def send_joined_message(self , user , message,type):
        for u in self.members :
            if u != user:
                channel.send_message(u.user_id(),json.dumps({
            'type' : type,
            'user' : user.nickname(),
           'chat':  message
            }))

class MoveHandler(webapp.RequestHandler):

    def get(self, meetid):
        global meetups

        user = users.get_current_user()
        if not user:
            self.redirect(users.create_login_url(self.request.uri))
            return
        if not meetid in meetups:
            self.error(404)
            self.response.out.write('sorry no meeting found "%s"' % meetid)
            return

        meeting = meetups[meetid]
       
        if user not in meeting.members:
            meeting.members.append(user)    
        token = channel.create_channel(user.user_id())

        self.response.out.write(template.render('sample_canvas.html', {
            'token': token,
            'nickname': user.nickname(),
        }))

    def post(self):
        """ Create a new game """
        global meetups
        user = users.get_current_user()
        if not self.request.get('meetid') in meetups:
            meeting = CanvasSheet()
            meeting.presenter = user
            meetups[self.request.get('meetid')] = meeting
        else:
            self.error(404)
            self.response.out.write('sorry no meeting found "%s"' % meetid)
            return

class OpenedHandler(webapp.RequestHandler):

    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        meeting.send_joined_message(users.get_current_user(),'' , 'joined')

class writeHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        meeting.send_state_to_clients()

class SyncHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        meeting.send_sync(users.get_current_user(),'sync')

class AddHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        message = self.request.get('object')
        objid =json.loads(message)[u'id']
        if(objid not in meeting.objectids):
            meeting.objectids.append(objid)
            meeting.state.append(message)
            meeting.send_all(users.get_current_user(),message,'add')

class MovedHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        message = self.request.get('object')
        objid =json.loads(message)[u'id']
        meeting.state[meeting.objectids.index(objid)] = message
        meeting.send_all(users.get_current_user(),message , 'move')
        
class ModifyHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        message = self.request.get('object')
        objid =json.loads(message)[u'id']
        meeting.state[meeting.objectids.index(objid)] = message
        meeting.send_all(users.get_current_user(),message , 'modify')

class ChatHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        message = self.request.get('chat')       
        meeting.send_chat_message(users.get_current_user(),message , 'chat')


class PPTHandler(webapp.RequestHandler):
    def post(self, meetid):
        global meetups
        meeting= meetups[meetid]
        command = self.request.get('command')
        url =  "/../../img/Slide"
        if(command == 'next'):
            meeting.slide = (meeting.slide+1)%21+1
            meeting.send_all_users(users.get_current_user(),url +str(meeting.slide)+".png", 'PPT')
        elif(command == 'prev'):
            meeting.slide = (meeting.slide-1)%21+1
            meeting.send_all_users(users.get_current_user(),url +str(meeting.slide) +".png" , 'PPT')
        
class MainHandler(webapp.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect(users.create_login_url(self.request.uri))
            return
        self.response.out.write(template.render('index.html', {
            'nickname': user.nickname(),
        }))

def main():
    application = webapp.WSGIApplication([
		('/meetups/(.*)/write',writeHandler),
                ('/meetups/(.*)/sync',SyncHandler),
                ('/meetups/(.*)/add',AddHandler),
                ('/meetups/(.*)/move',MovedHandler),
                ('/meetups/(.*)/modify',ModifyHandler),
                ('/meetups/(.*)/chat',ChatHandler),
                ('/meetups/(.*)/opened', OpenedHandler),
                ('/meetups/(.*)/ppt', PPTHandler),
                ('/meetups/(.*)', MoveHandler),
                ('/meetups', MoveHandler),
                ('/.*', MainHandler),
    ], debug=True)
    util.run_wsgi_app(application)

if __name__ == '__main__':
    main()
