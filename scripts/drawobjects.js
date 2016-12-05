function drawRect(rectangle) {

    rectCanvas = document.createElement('canvas');
    rectCanvas.id = rectangle.id;
    rectCanvas.width = rectangle.width;
    rectCanvas.height = rectangle.height;
    rectCanvas.fontSize = rectangle.fontSize;
    rectCanvas.msg = rectangle.msg;
    rectCanvas.style.position = "absolute";
    rectCanvas.style.zIndex = 8;
    mainCanvas.appendChild(rectCanvas);
    modifyRect(canvasShapes[rectCanvas.id]);
    rectCanvas.onmousedown = mouseDown;
    rectCanvas.onmouseup = mouseUp;
    //rectCanvas.onmouseover=select;	

}

function drawCircle(circle) {

    cirCanvas = document.createElement('canvas');
    cirCanvas.id = circle.id;
    cirCanvas.fontSize = circle.fontSize;
    cirCanvas.msg = circle.msg;
    cirCanvas.width = circle.width;
    cirCanvas.height = circle.height;

    cirCanvas.style.position = "absolute";
    cirCanvas.style.zIndex = 8;

    //alert("Circle!" + body);
    mainCanvas.appendChild(cirCanvas);
    modifyCircle(canvasShapes[cirCanvas.id]);
    cirCanvas.onmousedown = mouseDown;
    cirCanvas.onmouseup = mouseUp;
    //cirCanvas.onmouseover = select;

}
function drawTriangle(triangle) {

    triCanvas = document.createElement('canvas');
    triCanvas.id = triangle.id;
    triCanvas.width = triangle.width;
    triCanvas.height = triangle.height;
    triCanvas.fontSize = triangle.fontSize;
    triCanvas.msg = triangle.msg;
    triCanvas.style.position = "absolute";
    triCanvas.style.zIndex = 8;
    mainCanvas.appendChild(triCanvas);
    modifyTriangle(canvasShapes[triCanvas.id]);
    triCanvas.onmousedown = mouseDown;
    triCanvas.onmouseup = mouseUp;
    //rectCanvas.onmouseover=select;

}
function drawHorLine(horizontalLine) {

    hlineCanvas = document.createElement('canvas');
    hlineCanvas.id = horizontalLine.id;
    hlineCanvas.width = horizontalLine.width;
    hlineCanvas.height = horizontalLine.height;
    hlineCanvas.fontSize = horizontalLine.fontSize;
    hlineCanvas.msg = horizontalLine.msg;
    hlineCanvas.style.position = "absolute";
    hlineCanvas.style.zIndex = 8;
    mainCanvas.appendChild(hlineCanvas);
    modifyHLine(canvasShapes[hlineCanvas.id]);
    hlineCanvas.onmousedown = mouseDown;
    hlineCanvas.onmouseup = mouseUp;

}


function drawVerLine(verticalLine) {

    vlineCanvas = document.createElement('canvas');
    vlineCanvas.id = verticalLine.id;
    vlineCanvas.width = verticalLine.width;
    vlineCanvas.height = verticalLine.height;
    vlineCanvas.fontSize = verticalLine.fontSize;
    vlineCanvas.msg = verticalLine.msg;
    vlineCanvas.style.position = "absolute";
    vlineCanvas.style.zIndex = 8;
    mainCanvas.appendChild(vlineCanvas);
    modifyVLine(canvasShapes[vlineCanvas.id]);
    vlineCanvas.onmousedown = mouseDown;
    vlineCanvas.onmouseup = mouseUp;

}


function modifyRect(rectangle) {

    var rect = document.getElementById(rectangle.id);
    var ctx = rect.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, rect.width, rect.height);
    ctx.stroke();
    ctx.closePath();
    var metrics = ctx.measureText(rect.msg);
    var textWidth = metrics.width;
    var xPosition = (rect.width / 2 - textWidth / 2);
    var yPosition = (rect.height / 2);
    var tempColor = "#000000";
    ctx.font = rect.fontSize;
    ctx.fillStyle = tempColor;
    ctx.fillText(rect.msg, xPosition, yPosition);

}

function modifyCircle(circleShape) {

    //console.log("circle:"+circle+":"+circle.x+":"+circle.y+":"+circle.width);
    var circle = document.getElementById(circleShape.id);
    var ctx = circle.getContext("2d");
    var centerX = circle.width / 2;
    var centerY = circle.height / 2;
    radius = circle.width / 2;

    //var radius = 50;
    ctx.beginPath();
    //Arcs are defined by a center point, a radius, a starting angle, an ending angle, and the drawing direction 
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.stroke();

    ctx.closePath();

    var metrics = ctx.measureText(circle.msg);
    var textWidth = metrics.width;
    var xPosition = (radius - textWidth / 2);
    var yPosition = (radius);
    var tempColor = "#000000";
    ctx.font = circle.fontSize;
    ctx.fillStyle = tempColor;
    ctx.fillText(circle.msg, xPosition, yPosition);

}
function modifyTriangle(triangleShape) {
    var triangle = document.getElementById(triangleShape.id);
    var ctx = triangle.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(triangle.width / 2, 0);
    ctx.lineTo(0, triangle.height);
    ctx.lineTo(triangle.width, triangle.height);
    ctx.lineTo(triangle.width / 2, 0);
    ctx.stroke();
    ctx.closePath();
    var metrics = ctx.measureText(triangle.msg);
    var textWidth = metrics.width;
    var xPosition = (triangle.width / 2 - textWidth / 2);
    var yPosition = (triangle.height / 2);
    var tempColor = "#000000";
    ctx.font = triangle.fontSize;
    ctx.fillStyle = tempColor;
    ctx.fillText(triangle.msg, xPosition, yPosition);
}

function modifyHLine(hlineShape) {
    var hline = document.getElementById(hlineShape.id);
    var ctx = hline.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, hline.height / 2);
    ctx.lineTo(hline.width, hline.height / 2);
    //ctx.lineTo(hline.width,hline.height);
    //ctx.lineTo(hline.width/2,0);
    ctx.stroke();
    ctx.closePath();
}

function modifyVLine(vlineShape) {
    var vline = document.getElementById(vlineShape.id);
    var ctx = vline.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(vline.width / 2, 0);
    ctx.lineTo(vline.width / 2, vline.height);
    //ctx.lineTo(hline.width,hline.height);
    //ctx.lineTo(hline.width/2,0);
    ctx.stroke();
    ctx.closePath();
}
