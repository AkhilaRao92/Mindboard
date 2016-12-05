function mouseMove(event) {
    if (dragok) {
        var x = event.pageX - diffX;//- mainCanvas.offsetLeft;
        var y = event.pageY - diffY;

        if (x + elem.width <= mainCanvas.width + mainCanvas.offsetLeft && y + elem.height <= mainCanvas.height + mainCanvas.offsetTop && x >= mainCanvas.offsetLeft && y >= mainCanvas.offsetTop) {
            moveShape(x, y);
        }
        if (lockMoveShape) {
            //console.log(canvasShapes[elem.id]);
            lockMoveShape = false;
            setTimeout(xhrMoveShape, 300, canvasShapes[elem.id]);
        }
    }
}

function moveShape(x, y) {
    //elem.style.cursor="pointer";
    elem.x = x;
    elem.y = y;
    elem.style.position = "absolute";
    elem.style.left = elem.x + "px";
    elem.style.top = elem.y + "px";
    canvasShapes[elem.id].move(x, y);
}
function moveShapeId(x, y, id) {
    elem = document.getElementById(id);
    //elem.style.cursor="pointer";
    elem.x = x;
    elem.y = y;
    elem.style.position = "absolute";
    elem.style.left = elem.x + "px";
    elem.style.top = elem.y + "px";
    canvasShapes[elem.id].move(x, y);
}



function mouseDown(event) {
    targetShape = event.target;
    elem = event.target;
    if (prevTargetShape) {
        prevTargetShape.style.border = "0px solid white";
    }
    targetShape.style.border = "1px dotted red";
    dragok = true;
    mainCanvas.onmousemove = mouseMove;

    mousex = event.clientX;
    mousey = event.clientY;

    divleft = elem.offsetLeft + elem.offsetParent.offsetLeft;
    divtop = elem.offsetTop + elem.offsetParent.offsetTop;

    diffX = mousex - divleft;
    diffY = mousey - divtop;
}

function mouseUp(event) {
    prevTargetShape = targetShape;
    //  targetShape.style.border="0px solid white";
    dragok = false;
    mainCanvas.onmousemove = null;
}

function textBoxChanged(event) {
    var target = event.target;
    var context = targetShape.getContext("2d");
    targetShape.style.border = "1px dotted red";
    context.clearRect(0, 0, targetShape.width, targetShape.height);
    targetShape.msg = target.value;
    canvasShapes[targetShape.id].textChange(targetShape.msg);
    console.log("TextChanged");
    canvasShapes[targetShape.id].modify();
    setTimeout(xhrModifyShape, 100, canvasShapes[targetShape.id]);
}



function textSizeChanged(event) {
    var target = event.target;
    var context = targetShape.getContext("2d");

    context.clearRect(0, 0, targetShape.width, targetShape.height);
    targetShape.style.border = "1px dotted red";
    targetShape.fontSize = target.value + "px serif";
    canvasShapes[targetShape.id].fontChange(targetShape.fontSize);

    canvasShapes[targetShape.id].modify();
    setTimeout(xhrModifyShape, 100, canvasShapes[targetShape.id]);

}


function canvasWidthChanged(event) {
    var target = event.target;
    var context = targetShape.getContext("2d");
    targetShape.style.border = "1px dotted red";
    var initialWidth = targetShape.width;
    var value = parseInt(target.value);
    if (value + targetShape.x <= mainCanvas.width + mainCanvas.offsetLeft) {
        context.clearRect(0, 0, targetShape.width, targetShape.height);
        targetShape.width = target.value;
        canvasShapes[targetShape.id].widthChange(targetShape.width);
        canvasShapes[targetShape.id].modify();
        setTimeout(xhrModifyShape, 100, canvasShapes[targetShape.id]);
    }


    //textBoxChanged(event) ;
    //textSizeChanged(event) ;
}

function canvasHeightChanged(event) {
    var target = event.target;
    var context = targetShape.getContext("2d");
    targetShape.style.border = "1px dotted red";
    var initialHeight = targetShape.height;
    var value = parseInt(target.value);
    if (value + targetShape.y <= mainCanvas.height + mainCanvas.offsetTop) {
        context.clearRect(0, 0, targetShape.width, targetShape.height);
        targetShape.height = target.value;
        canvasShapes[targetShape.id].heightChange(targetShape.height);
        canvasShapes[targetShape.id].modify();
        setTimeout(xhrModifyShape, 100, canvasShapes[targetShape.id]);
    }
    //textBoxChanged(event) ;
    //textSizeChanged(event) ;
}

function deleteShape() {

    if (targetShape) {
        xhrDeleteShape(canvasShapes[targetShape.id]);
        delete canvasShapes[targetShape.id];
        targetShape.parentNode.removeChild(targetShape);

        if (prevTargetShape) {
            delete canvasShapes[prevTargetShape.id];
            if (prevTargetShape.parentNode) prevTargetShape.parentNode.removeChild(prevTargetShape);
        }
    }

}

function deleteShapeModify(shapeid) {
    delete canvasShapes[shapeid];
    shape = document.getElementById(shapeid);
    mainCanvas.removeChild(shape);
}

$('html').keyup(function (e) {
    if (e.keyCode == 46) {
        if (targetShape) deleteShape();
    }
});