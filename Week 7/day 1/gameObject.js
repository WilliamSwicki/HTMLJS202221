var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var timer = requestAnimationFrame(main);
var speed = 5;
var gravity = 0.05;

/*var coin = new Image();
//coin.src ="images/coin.png"
//coin.onload = function(){
    main();
}*/

//ctx.fillStyle = "green";
//ctx.fillRect(500, 250, 100, 100);

//utkity function
function randomRange(high, low){
    return Math.random()*(high-low)+low;
}
//example of GamrObjcet class
function GameObject(){
    //examples of properties inside our class
    this.width = 10//randomRange(100, 10);
    this.height = this.width;
    this.radius = 5//randomRange(50,5);
    this.x = 400//randomRange(canvas.width-this.width, 0);
    this.y = 300//randomRange(canvas.height-this.height, 0);
    this.vx = randomRange(speed, -speed);
    this.vy = randomRange(speed, -speed);
    this.color = `rgb(${randomRange(255,0)},${randomRange(255,0)},${randomRange(255,0)})`;

    //examples of methods in a class
    this.drawSquare = function(){
        //all the procedures to draw a square go here
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.drawCircle=function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
    }

    /*this.drawImage = function(){
        ctx.drawImage(coin, this.x-this.radius, this.y-this.radius, this.radius * 2, this.radius * 2);
    }*/

    this.move = function(){
        this.x += this.vx;
        if(this.x > canvas.width - this.radius){
            this.x = canvas.width - this.radius;
            this.vx *= -1;
        }
        if(this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        }
        this.y += this.vy;
        if(this.y > canvas.height - this.radius){
            this.y = canvas.height - this.radius;
            this.vy *= -1;
        }
        if(this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        }
    }
}

var square = new GameObject();

//square.color = "yellow"
//square.y = 50;
square.drawCircle();

var square2 = new GameObject();
//square2.color = "purple";
square2.drawCircle();

var circle = new GameObject();
circle.drawCircle();

var numberOfObjects = 1000

var circles = [square, square2, circle];

for( var i = 0; i<numberOfObjects; i++){
    circles[i] = new GameObject()
}
function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //square.drawCircle();
    //square2.drawCircle();
    //circle.drawCircle();

    for(var i = 0; i<circles.length; i++){
        circles[i].move();
        circles[i].vy /= gravity;
        circles[i].vx *= gravity;
        circles[i].drawCircle();
        //circles[i].drawImage();
    }

    timer = requestAnimationFrame(main);
}

main();