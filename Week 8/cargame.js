var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);
var start = 50;
var finish = 750;
var speed = randomNumber(6,2);

//car vars
var carPos=2;
var sFuel= randomNumber(canvas.width-40, 600);
var fuel = sFuel;
var fuelBarWidth = 300;
var gameOver=true;

//timer vars
var seconds = 3;
var fps = 60;
var frames = fps;

document.addEventListener("keydown",pressSpace);

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
        ctx.fillStyle = "black";
        ctx.font ="30px Arial";
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
    drawCar(0,"red");
    drawCar(150,"green");
    drawCar(-150,"purple");
    
    
    drawFuelBar();
    if(fuel<=0 || carPos + 40 > finish){
        drawResults();
    }
    }
    
    //refresh the main function
    timer = requestAnimationFrame(main);
}

function drawStartFinishLine(main){
    //draw start line
    ctx.fillStyle = "black";
    ctx.fillRect(start, 50, 10 ,500);
    //draw finish line
    ctx.fillRect(finish, 50, 10 ,500);
}

function drawCar(position,color){
    //draw car
    ctx.fillStyle = color;
    ctx.fillRect(carPos,canvas.height/2+position,40,20);
}

function drawFuelBar(){
    var currentBarWidth = fuelBarWidth * (fuel/sFuel);
    ctx.fillStyle = "black";
    ctx.fillRect(start,30,fuelBarWidth,10);
    ctx.font="25px Arial";
    ctx.fillText("Fuel",start,25);
    if(fuel>0){
        ctx.fillStyle = "rgb(199, 156, 40)";
        ctx.fillRect(start,30,currentBarWidth,10);    
    }
}
function drawResults(){
    if(carPos + 40>finish){
        ctx.save();
        ctx.fillStyle ="black";
        ctx.font="25px Arial";
        ctx.textAlign="center";
        ctx.fillText("You made it to the finish... You Win!",canvas.width/2, canvas.height/2);
        ctx.fillText("Press Any Button to restart",canvas.width/2,canvas.height/2+30);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.fillStyle ="black";
        ctx.font="25px Arial";
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
        ctx.fillStyle ="black";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText(seconds, canvas.width/2, canvas.height/2);
        ctx.restore();
    }
    else{
        ctx.save();
        ctx.fillStyle ="black";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Go!", canvas.width/2, canvas.height/2);
        ctx.restore();
    }
    
}