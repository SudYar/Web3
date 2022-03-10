
const graph = document.getElementById("graph");
const cont = graph.getContext('2d');
const height = 250;
const weight = 250;
const countXY = 5;
const unit = (height / (2 * countXY)) * 0.9;
var dots = new Array();
let publicR;

window.onload = function() {

    updateCanv();
}

function updateCanv(){
    dots = new Array();
    getAllDots();
    reDraw();
}


// $("input[name='r']").change(function (){
//     reDraw();
//     // $('#r-error').css({"visibility":"hidden"});
// });

// document.getElementById("request-coordinates:reset_button").onclick = function (){
//     clear();
//     drawGrid(cont, weight/2, height/2);
//     drawDots();
//
// };

function getR(){
    let rForm = document.getElementById("request-coordinates:r");
    if (rForm !== undefined) {
        var R = document.getElementById("request-coordinates:r").value;
        if (R == null) return 0;
        if (R < 1) return 0;
        if (R > 4) return 0;
        else return R;
    }else return 0;
}

function setX(x){
    if (x<-5){
        x=-5;
    }else if(x>3){
        x=3;
    }
    document.getElementById("request-coordinates:x").value = x.toFixed(4);
}

function setY(y){
    if (y<-3){
        y=-3;
    }else if(y>3){
        y=3;
    }
    ice.ace.instance("request-coordinates:y").setValue( y.toFixed(1));
}

function setR(r) {
    let res;
    if (r < 1){
        res = 1;
    }else if (r > 4){
        res = 4;
    }else {
        res = r;
    }
    publicR = res;
    document.getElementById(r).value = res;
    reDraw();
}

function setCoordinates(x, y) {
    if (getR() !== 0){
        setX(x);
        setY(y);
        return true;
    } else {
        alert("Сначала выберите нужный вам R");
        return false;
    }
}

//мы определяем координаты клика на canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: convertXtoUnits(evt.clientX - rect.left),
        y: convertYtoUnits(evt.clientY - rect.top)
    };
}
function convertXtoUnits(x1){
    return (x1 - weight/2 )/( weight * 0.9/ (2*countXY));
}
function convertYtoUnits(y1){
    return (height/2 - y1)/(height * 0.9 / (2*countXY));
}

// function clickOnGraph(){
//     var mousePos = getMousePos(graph, evt);
//     if (setCoordinates(mousePos.x, mousePos.y)) {
//         document.getElementById("request-coordinates:submit-button").click();
//     }
// }

graph.addEventListener('click', function(evt) {
    var mousePos = getMousePos(graph, evt);
    if (setCoordinates(mousePos.x, mousePos.y)) {
        document.getElementById("request-coordinates:submit-button").click();
        updateCanv();
    }

}, false);




function clear(){
    cont.fillStyle = "#FFFFFF";
    cont.fillRect(0,0, weight, height);
}

function reDraw(){

    const x0 = weight / 2;
    const y0 = height/2;
    let r = getR();


    clear();

    r*=unit;
    cont.fillStyle="#3974af";
// прямоугольник
    cont.fillRect(x0-r,y0,r,r/2);

// треугольник
    cont.beginPath();
    cont.moveTo(x0, y0);
    cont.lineTo(x0, y0-r);
    cont.lineTo(x0-r/2, y0);
    cont.fill();

    // четверть круга
    cont.beginPath();
    cont.arc(x0, y0, r/2, 0  , Math.PI * 1/2);
    cont.lineTo(x0, y0);
    cont.fill();

    console.log("Рисую сетку");
    drawGrid(cont, x0, y0);
    drawDots();
}

function drawGrid(cont, x, y) {
    cont.fillStyle = "#000000";
    cont.beginPath();
    cont.moveTo(0, y);
    cont.lineTo(weight, y);
    cont.moveTo(x, 0);
    cont.lineTo(x, height);
    cont.closePath();
    cont.stroke();
    cont.font = '20px serif';
    //проставляем числа над осями
    for (let i = -countXY; i<=countXY; i++){
        if (i<=0){
            cont.fillText(i, x+i*unit-10, y+15);
        }else {
            cont.fillText(i, x+i*unit-5, y+15);
        }
        if(i===0){continue;}
        cont.fillText(i, x+2, y-i*unit+5);
    }
}

function getAllDots(){
    let rows = document.getElementById("answer-table").rows;
    if (rows.length>1){
        for(let i = 1; i<rows.length; i++){
            let cells = rows[i].cells;
            if (cells[0].innerHTML.trim().length == 0){continue;}
            dots.push({
                x: cells[0].innerHTML.trim(),
                y: cells[1].innerHTML.trim(),
                res: cells[3].innerHTML.trim()
            });
        }
    }
    console.log(dots);
}

function drawDots(){
    for (let i = 0; i < dots.length; i++) {
        drawOneDot(dots[i]);
    }
}

function drawOneDot(dot){
    if (dot.x > 5 || dot.x < -5 || dot.y > 5 || dot.y < -5) return;
    let dotX = dot.x * unit + weight/2;
    let dotY = height/2 - dot.y * unit;

    if (dot.res.includes("false")) {
        cont.fillStyle = "red";
    } else {
        cont.fillStyle = "lightgreen";
    }
    cont.beginPath();
    cont.arc(dotX, dotY, 2.5, 0 , Math.PI * 2);
    cont.fill();
}