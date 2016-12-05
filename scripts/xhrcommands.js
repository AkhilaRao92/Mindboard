function xhrSync() {
    console.log("object=" + JSON.stringify(canvasShapes));
    sendto("/sync", "");
}
function xhrAddShape(shape) {
    console.log("object=" + JSON.stringify(shape));
    sendto("/add", "object=" + JSON.stringify(shape));
}
function xhrMoveShape(shape) {

    console.log("object=" + JSON.stringify(shape));
    lockMoveShape = true;
    sendto("/move", "object=" + JSON.stringify(shape));
}
function xhrModifyShape(shape) {

    console.log("Modified object=" + JSON.stringify(shape));
    sendto("/modify", "object=" + JSON.stringify(shape));
}
function xhrDeleteShape(shape) {
    console.log("object=" + JSON.stringify(shape));
    //	sendto("delete", "object="+JSON.stringify(shape));
}
function xhrChatSubmit() {
    chat = document.getElementById("chatMsg");
    console.log("Submitting chat" + chat.value);
    sendto("/chat", "chat=" + chat.value);
    chat.value = "";
}

function xhrPPTCommand(command) {
    console.log("Submitting PPT command");
    sendto("/ppt", "command="+command);
}