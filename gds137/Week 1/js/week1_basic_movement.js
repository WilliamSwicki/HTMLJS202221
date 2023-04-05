//Declare my variables

var canvas;
var context;
var timer;
var accelration = 1.05;
//1000 ms or 1 second / FPS
var interval = 1000/60;
var ball;

	//Set Up the Canvas
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");	
	
	//Instantiate the Player
	ball = new Ball();
	ball.vx = 5;
	ball.vy = 5;
	
	//Set the Animation Timer
	timer = setInterval(animate, interval);

function animate()
{
	//Erase the Screen
	context.clearRect(0,0,canvas.width, canvas.height);	
	
	//Move the Player
	ball.x += ball.vx;

	if(ball.x+ball.width/2>canvas.width)
	{
		ball.vx = -ball.vx*accelration;
		ball.color="#00ff00";
		if (ball.vx >10 ||ball.vx<-10)
		{
			ball.vx=-5;
		}
	}
	
	if(ball.x<ball.width/2)
	{
		ball.vx = -ball.vx*accelration;
		ball.color="#ff0000";
	}

	ball.y += ball.vy;

	if(ball.y+ball.height/2>canvas.height)
	{
		ball.vy = -ball.vy*accelration;
		ball.color="#0000ff";
		if (ball.vy >10 ||ball.vy<-10)
		{
			ball.vy=-5;
		}
	}
	
	if(ball.y<ball.height/2)
	{
		ball.vy = -ball.vy*accelration;
		ball.color="#ffff00";
	}

	//Update the Screen
	ball.draw();
}
