

onOpened = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/meetups/' + location.href.split('meetups/')[1] + '/opened');
    xhr.send();
};

function sendto(handle, message) {
    //  var textbox=document.getElementById("words");
    var params = message;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/meetups/' + location.href.split('meetups/')[1] + handle);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(params);
}
onMessage = function (message) {
    var json = JSON.parse(message.data);
    //document.querySelector('.sidebar .presenter').innerHTML = 'Presenter:  ' + json.presenter;
    //document.querySelector('.sidebar .viewer').innerHTML = 'Viewer:  ' + json.viewer;
    console.log(json);
    if (json.type == "sync") {
        canvasShapes = {};
        for (i = 0 ; i < json.objects.length ; i++) {
            var obj = JSON.parse(json.objects[i]);
            console.log(obj.id);
            var sh = new shape(obj.id, obj.x, obj.y, obj.msg, obj.fontSize, obj.type, obj.width, obj.height);
            canvasShapes[obj.id] = sh;
            sh.draw();
            sh.move(obj.x, obj.y);
            moveShapeId(obj.x, obj.y, obj.id);

        }
    } else if (json.type == "move") {
        var obj = JSON.parse(json.object);
        canvasShapes[obj.id].move(obj.x, obj.y);
        moveShapeId(obj.x, obj.y, obj.id);
    } else if (json.type == "modify") {
        //var obj = JSON.parse(json.object);
        //canvasShapes[obj.id].x = obj.x;
        //canvasShapes[obj.id].y = obj.y;
        //canvasShapes[obj.id].msg = obj.msg;
        //canvasShapes[obj.id].fontSize = obj.fontSize;
        //canvasShapes[obj.id].type = obj.type;
        //canvasShapes[obj.id].width = obj.width;
        //canvasShapes[obj.id].height = obj.height;
        //canvasShapes[obj.id].modify();
        //console.log("Modifying the object" + obj.id);
        //deleteShapeModify(obj.id);
        //console.log("Done removng");
        //Why is it not calling this :(
        var obj = JSON.parse(json.object);
        shape = document.getElementById(obj.id);
        mainCanvas.removeChild(shape);
        canvasShapes[obj.id].x = obj.x;
        canvasShapes[obj.id].y = obj.y;
        canvasShapes[obj.id].msg = obj.msg;
        canvasShapes[obj.id].fontSize = obj.fontSize;
        canvasShapes[obj.id].type = obj.type;
        canvasShapes[obj.id].width = obj.width;
        canvasShapes[obj.id].height = obj.height;
        canvasShapes[obj.id].draw();
        canvasShapes[obj.id].move(obj.x, obj.y);
        moveShapeId(obj.x, obj.y, obj.id);
    } else if (json.type == "add") {
        var obj = JSON.parse(json.object);
        var sh = new shape(obj.id, obj.x, obj.y, obj.msg, obj.fontSize, obj.type, obj.width, obj.height);
        canvasShapes[obj.id] = sh;
        sh.draw();
    } else if (json.type == "chat") {
        
            document.getElementById("chatbox").innerHTML += json.user + ":" + json.chat + "<br/>";
            //document.getElementById("chat").value="";
        
    } else if (json.type == "joined") {
            document.getElementById("chatbox").innerHTML += json.user + " has joined the room" + "<br/>";
    } else if (json.type == "PPT") {
        document.getElementById("slideimage").src =json.url;
    }
}

