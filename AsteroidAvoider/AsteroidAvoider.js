var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var timer = requestAnimationFrame(main);
var gameOver = true;
var gameState = []
var currentState = 0;

//score var
var score = 0;
var highScore = 0;

//ship var
var yspeed = 5
var xspeed = 10
var ship = new PlayerShip();
var shipSprite = new Image();
shipSprite.src = "images/ship.png"

function PlayerShip() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.width = 20;
    this.height = 20;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.vx = 0;
    this.vy = 0;

    this.drawShip = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(shipSprite,this.width - 30,this.height - 30);
        ctx.fillStyle = "#ffffff00";
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-10, 10);
        ctx.lineTo(-10, -10);
        ctx.lineTo(10, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    this.moveShip = function () {
        this.x += this.vx;
        this.y += this.vy;

        //add bounderies to canvas
        //bottem
        if (this.y > canvas.height - this.height / 2) {
            this.y = this.height / 2;
            this.vy = 0;
        }
        //top
        if (this.y < this.height / 2) {
            this.y = canvas.height - this.height / 2;
            this.vy = 0;
        }
        //right
        if (this.x > canvas.width - this.width / 2) {
            this.x = canvas.width - this.width / 2;
            //this.vx = 0;
        }
        //left
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
            //this.vx = 0;
        }
    }
}

document.addEventListener("keydown", pressKeyDown);
document.addEventListener("keyup", pressKeyUp);

function pressKeyDown(e) {
    if(!gameOver) {
        if(e.keyCode == 87) {
            //ship goes up
            ship.up = true;
        }
        if(e.keyCode == 65) {
            //left
            ship.left = true;
        }
        if(e.keyCode == 68) {
            //right
            ship.right = true;
        }
        if(e.keyCode == 83) {
            //down
            ship.down = true;
        }
        //arrow keys
        if(e.keyCode == 38) {
            //ship goes up
            ship.up = true;
        }
        if(e.keyCode == 37) {
            //left
            ship.left = true;
        }
        if(e.keyCode == 39) {
            //right
            ship.right = true;
        }
        if(e.keyCode == 40) {
            //down
            ship.down = true;
        }
    }
    if(gameOver){
        if(e.keyCode == 32){
            if(currentState == 2){
                //from the game over screen
                currentState = 0;
                numAsteroids = 20;
                asteroids = [];
                score = 0;
                gameStart();
                main();
            }
            else{
                //from the main menu
                gameStart();
                gameOver = false;
                currentState = 1;
                scoreTimer();
                main();
            }
        
        }
    }

}

function pressKeyUp(e) {
    if(!gameOver) {
        if(e.keyCode == 87) {
            //ship goes up
            ship.up = false;
        }
        if(e.keyCode == 65) {
            //left
            ship.left = false;
        }
        if(e.keyCode == 68) {
            //right
            ship.right = false;
        }
        if(e.keyCode == 83) {
            //down
            ship.down = false;
        }
        //arrow keys
        if(e.keyCode == 38) {
            //ship goes up
            ship.up = false;
        }
        if(e.keyCode == 37) {
            //left
            ship.left = false;
        }
        if(e.keyCode == 39) {
            //right
            ship.right = false;
        }
        if(e.keyCode == 40) {
            //down
            ship.down = false;
        }
    }

}
//var for asteroid making
var numAsteroids = 20;
var asteroids = [];
var asteroidSprite = new Image();
asteroidSprite.src = "images/asteroid.png";

//class for asteroid
function Asteroid() {
    this.radius = randomRange(15, 2);
    this.x = randomRange(canvas.width - this.radius, this.radius) + canvas.width;
    this.y = randomRange(canvas.height - this.radius, this.radius);
    this.vx = randomRange(10, 5);
    this.color = "#ffffff";

   
    this.drawAsteroid = function () {
        //comands to draw asteroids
        ctx.save();
        // ctx.beginPath();
        // ctx.fillStyle = this.color;
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        // ctx.closePath();
        // ctx.fill();
        ctx.drawImage(asteroidSprite, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        ctx.restore();
    }
}


//utility functions
function gameStart(){
    //creating the asteroids
    for (var i = 0; i < numAsteroids; i++) {
        asteroids[i] = new Asteroid();
    }
    //create new instance of player ship
    ship = new PlayerShip();
}

function randomRange(high, low) {
    return Math.random() * (high - low) + low;
}

function detectCollision(distance, calcDistance) {
    return distance < calcDistance;
}

function scoreTimer(){
    if(!gameOver){
        score++;
        if(score % 300 == 0){
            numAsteroids += 10;
            console.log(numAsteroids);
        }
        //timer in ms
        setTimeout(scoreTimer,17);
    }
}

//asteroid game state machine
//main menu
var menu = new Image();
menu.src ="images/MenuBG.png";
menu.onload = function(){
    main();
}

gameState[0] = function(){
    ctx.save();
    ctx.drawImage(menu, 0, 0, canvas.width, canvas.height);
    ctx.font = "30px Space";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Asteroid Avoider", canvas.width/2, canvas.height/2 - 30);
    ctx.font = "15px Space";
    ctx.fillText("Press Space to Start", canvas.width/2, canvas.height/2 + 20);
    ctx.restore();
}
//game scene
gameState[1] = function(){
        //draw score
        ctx.save();
        ctx.font = "15px Space";
        ctx.fillStyle = "white";
        ctx.fillText("Score: " + score.toString(), canvas.width-150, 30);
        ctx.restore();
    
        //setup vertical movement
        if (ship.up) {
            ship.vy = -yspeed;
        }
        else if (ship.down) {
            ship.vy = yspeed;
        }
        else {
            ship.vy = 0;
        }
        //setup horazontal movement
        if (ship.left) {
            ship.vx = -xspeed;
        }
        else if (ship.right) {
            ship.vx = xspeed;
        }
        else {
            ship.vx = 0;
        }
    
        //draw ship
        ship.moveShip();
        ship.drawShip();
    
        for (var i = 0; i < asteroids.length; i++) {
            var dX = ship.x - asteroids[i].x;
            var dY = ship.y - asteroids[i].y;
            var distance = Math.sqrt((dX * dX) + (dY * dY));
    
            //collision Dection is here
            if (detectCollision(distance, (ship.height / 2 + asteroids[i].radius))) {
                //alert("Hit Asteroid Game Over");
                gameOver = true;
                currentState = 2;
                main();
                //clears astroids
                return;
            }
    
            if (asteroids[i].x < canvas.width - canvas.width + asteroids[i].radius) {
                asteroids[i].y = randomRange(canvas.width - asteroids[i].radius, asteroids[i].radius);
                asteroids[i].x = randomRange(canvas.height - asteroids[i].radius, asteroids[i].radius) + canvas.width;
                asteroids[i].vx -= 0.0;
            }
            //draw the asteroids
            asteroids[i].x -= asteroids[i].vx;
            asteroids[i].drawAsteroid();

            //check to see if we need to add more astroids
            while(asteroids.length < numAsteroids){
                //add and create new asteroids in the array
                asteroids.push(new Asteroid());
            }
        }
}
//game over
gameState[2] = function(){
    ctx.drawImage(menu, 0, 0, canvas.width, canvas.height);
    if(score> highScore){
        //new high score
        highScore = score;
        ctx.save();
    ctx.font = "30px Space";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Over Your Score was : " + score.toString(), canvas.width/2, canvas.height/2 - 60);
    ctx.fillText("Your New High Score is : " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
    ctx.fillText("New Record!", canvas.width/2, canvas.height/2);
    ctx.font = "15px Space";
    ctx.fillText("Press Space to Replay", canvas.width/2, canvas.height/2 + 20);
    ctx.restore();
    }
    else{
        //regular high score
        //console.log(currentState);
    ctx.save();
    ctx.font = "30px Space";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Game Over Your Score was : " + score.toString(), canvas.width/2, canvas.height/2 - 60);
    ctx.fillText("Your High Score is : " + highScore.toString(), canvas.width/2, canvas.height/2 - 30);
    ctx.font = "15px Space";
    ctx.fillText("Press Space to Replay", canvas.width/2, canvas.height/2 + 20);
    ctx.restore();
    }
    
}

function main() {
    //clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameState[currentState]();

    if (!gameOver) {
        timer = requestAnimationFrame(main);
    }
}