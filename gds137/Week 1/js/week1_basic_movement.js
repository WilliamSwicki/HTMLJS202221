//Declare my variables

var canvas;
var context;
var timer;
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
		ball.vx = -ball.vx;
	}
	
	if(ball.x<ball.width/2)
	{
		ball.vx = -ball.vx;
	}

	ball.y += ball.vy;

	if(ball.y+ball.height/2>canvas.height)
	{
		ball.vy = -ball.vy;
	}
	
	if(ball.y<ball.height/2)
	{
		ball.vy = -ball.vy;
	}

	//Update the Screen
	ball.draw();
}
