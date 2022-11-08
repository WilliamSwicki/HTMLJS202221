var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timer = requestAnimationFrame(main);
var x = 300;
var y = 300;
var radius = 50;
var speedX = 2;
var speedY = 2;
var dvd = new Image();
dvd.src = "images/dvdsaver2.png";
dvd.onload = function(){
    main();
}
var bg = new Image();
bg.src = "images/background.jpeg";
bg.onload = function(){
    main();
}

function main(){
    //clear the canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //drawCircle("blue", x, y, radius);
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(dvd, x - radius, y - radius, 100, 100)
    //update the position of object
    x += speedX;
    y += speedY;

    //create condition when the object is off screen
    createCanvasBoundary(x, canvas.width, radius, "speedX");
    createCanvasBoundary(y, canvas.height, radius, "speedY");
    /*if(speedX > 10){
        speedX = 2
    }
    else{
        x > 750
        speedX = -2
    }
    if(speedY > 10){
        speedY = 2
    }
    */

    //update the animation frame
    timer = requestAnimationFrame(main);
    //console.log(x);
    console.log(speedY);
}

function drawCircle(color, posX, posY, radius){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, (2 * Math.PI), false);
    ctx.closePath();
    ctx.fill();
}
function createCanvasBoundary(position, canvasSize, objectRadius, direction){
    if(position > canvasSize - objectRadius || position < objectRadius){
        if(direction == "speedX"){
            speedX *= -1.05
        }
        else{
            speedY *=-1.05
        }
    }
}