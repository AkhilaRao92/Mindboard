function shape(id, x, y, msg, fontSize, type, width, height) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.msg = msg;
    this.fontSize = fontSize + "px serif";
    this.width = width;
    this.height = height;
    this.draw = function () {
        if (this.type == 1) {
            drawRect(this);
        } else if (this.type == 2) {
            drawCircle(this);
        } else if (this.type == 3) {
            drawTriangle(this);

        } else if (this.type == 4) {
            drawHorLine(this);

        } else if (this.type == 5) {
            drawVerLine(this);
        }
        xhrAddShape(this);
    }

    this.modify = function () {
        if (this.type == 1) {
            modifyRect(this);

        }else if (this.type == 2) {
            modifyCircle(this);

        } else if (this.type == 3) {
            modifyTriangle(this);

        } else if (this.type == 4) {
            modifyHLine(this);

        } else if (this.type == 5) {
            modifyVLine(this);
        }
    }
    this.move = function (x, y) {
        //change the x and y values to the desiredvalue
        this.x = x;
        this.y = y;    
    }

    this.heightChange = function (height) {
        this.height = height;   
    }
    this.widthChange = function (width) {
        this.width = width;
    }
    this.textChange = function (msg) {
        this.msg = msg;
    }
    this.fontChange = function (fontSize) {
        this.fontSize = fontSize;
    }
}

function creatRect() {
    shapeId = guid();
    var rect = new shape(shapeId, 20, 20, "", 20, 1, 20, 40);
    canvasShapes[shapeId] = rect;
    //alert(JSON.stringify(rect));
    rect.draw();
}


function creatCircle() {
    shapeId = guid();
    var circle = new shape(shapeId, 50, 50, "", 20, 2, 100, 100);
    canvasShapes[shapeId] = circle;
    circle.draw();
}

function creatTriangle() {
    shapeId = guid();
    var triangle = new shape(shapeId, 20, 20, "", 20, 3, 50, 100);
    canvasShapes[shapeId] = triangle;
    triangle.draw();
}

function creatHorizontal() {
    shapeId = guid();
    var horLine = new shape(shapeId, 100, 50, "", 20, 4, 100, 50);
    canvasShapes[shapeId] = horLine;
    horLine.draw();
}

function creatVertical() {
    shapeId = guid();
    var verLine = new shape(shapeId, 50, 100, "", 20, 5, 100, 50);
    canvasShapes[shapeId] = verLine;
    verLine.draw();
}
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
