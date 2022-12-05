var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);
var start = 58;
var finish = 956;
var speed = randomNumber(6,2);

//car vars
var carPos=2;
var sFuel= randomNumber(970, 900);
var fuel = sFuel;
var fuelBarWidth = 512;
var gameOver=true;
var carWidth = 50;
var carHeight = 30;

//timer vars
var seconds = 3;
var fps = 60;
var frames = fps;

document.addEventListener("keydown",pressSpace);

var carSprite = new Image
carSprite.src = "image/ufo.png"
var background = new Image
background = "image/Cbackground.jpg"

background.onload = function(){
    main();
}
carSprite.onload = function(){
    main();
}

function pressSpace(e){
    if(e.keyCode==32 && gameOver){
        gameOver=false
    }
    if(fuel<= 0){
        restartGame();
    }
}

function main(){
    //clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(gameOver==true){
        //Main Menu Screen
        ctx.save();
        ctx.fillStyle = "white";
        ctx.font ="30px Space";
        ctx.textAlign ="center";
        ctx.fillText("Press Space to Start",canvas.width/2,canvas.height/2 );
        ctx.restore();
    }
    else{
        if(!gameOver && seconds>0){
            runStartTimer();
            drawStartTimer();
        }
        else{
            if(fuel>0){
            //update the car's position
            carPos +=speed;
            fuel -=speed;
            }
        }
    //draw start line
    drawStartFinishLine();
    drawCar(0, "#ffffff00");
    //extra cars 
    //drawCar(150,"green");
    //drawCar(-150,"purple");
    
    
    drawFuelBar();
    if(fuel<=0 || carPos + 50 > finish){
        drawResults();
    }
    }
    
    //refresh the main function
    timer = requestAnimationFrame(main);
}

function drawStartFinishLine(main){
    //draw start line
    ctx.fillStyle = "aqua";
    ctx.fillRect(start, 58, 10 ,668);
    
    //draw finish line
    ctx.fillRect(finish, 50, 10 ,668);
}

function drawCar(position,color){
    //draw car
    ctx.fillStyle = color;
    ctx.fillRect(carPos,canvas.height/2+position,carWidth,carHeight);
    ctx.drawImage(carSprite,carPos,canvas.height/2,carWidth,carHeight);
}

function drawFuelBar(){
    var currentBarWidth = fuelBarWidth * (fuel/sFuel);
    ctx.fillStyle = "white";
    ctx.fillRect(start,30,fuelBarWidth,10);
    ctx.font="25px Space";
    ctx.fillText("Fuel",start,25);
    if(fuel>0){
        ctx.fillStyle = "rgb(199, 156, 40)";
        ctx.fillRect(start,30,currentBarWidth,10);    
    }
}
function drawResults(){
    if(carPos + 50>finish){
        ctx.save();
        ctx.fillStyle ="white";
        ctx.font="25px Space";
        ctx.textAlign="center";
        ctx.fillText("You made it to the finish... You Win!",canvas.width/2, canvas.height/2);
        ctx.fillText("Press Any Button to restart",canvas.width/2,canvas.height/2+30);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.fillStyle ="white";
        ctx.font="25px Space";
        ctx.textAlign="center";
        ctx.fillText("You ran out of fuel... You Lose!",canvas.width/2, canvas.height/2);
        ctx.fillText("Press Any Button to restart",canvas.width/2,canvas.height/2+30);
        ctx.restore();
    }
}
//utility function
function randomNumber(high,low){
    return Math.round(Math.random()*(high-low)+low);
}
function restartGame(){
    location.reload();
}

function runStartTimer(){
    frames -= 1;
    if(frames<0){
        frames = fps;
        seconds-=1;
    }
}
function drawStartTimer(){
    if(Math.ceil(seconds)>0){
        ctx.save();
        ctx.fillStyle ="white";
        ctx.font = "40px Space";
        ctx.textAlign = "center";
        ctx.fillText(seconds, canvas.width/2, canvas.height/2);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.fillStyle ="white";
        ctx.font = "40px Space";
        ctx.textAlign = "center";
        ctx.fillText("Go!", canvas.width/2, canvas.height/2);
        ctx.restore();
    }
    
}