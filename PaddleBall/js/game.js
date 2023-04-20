var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60
var ball;
var paddle;
var text;
var string;
var score = 0;
var gravity = 1;
var friction = 0.9;

var timer = setInterval(animate, interval);

ball = new GameObject();
ball.width = 80;
ball.height = 80;
ball.x = canvas.width/2;
ball.y = canvas.height/2;
ball.vx = 0;
ball.vy = 0;
ball.ax = 1;
ball.ay = 1;
ball.force =1;
ball.color="#ff00ff";

paddle = new GameObject();
paddle.width=250;
paddle.height=40
paddle.y = canvas.height-50;
paddle.x = canvas.width/2;
paddle.vx = 1;
paddle.ax = 1;
paddle.ay = 1;
paddle.force =1;
paddle.color = "#00ffff";

text = new GameObject();
text.x=80;
text.y=25;
text.color="#555555";

string = new GameObject();
string.width=1;

function animate()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    
    ball.vy= ball.vy+gravity;
    ball.move();
    paddle.move();

    //paddle controls
    if(a)
    {
      paddle.vx += paddle.ax * -paddle.force;
    }
    
    if(d)
    {
        paddle.vx += paddle.ax * paddle.force;
    }

     paddle.vx*=friction;

    console.log(paddle.vx);
    //paddle wall colishion
    if(paddle.x < paddle.width/2)
    {
        paddle.x = paddle.width/2;
        paddle.vx = 0;
    }
   
    if(paddle.x>canvas.width-paddle.width/2)
    {
        paddle.x=canvas.width - paddle.width/2;
        paddle.vx = 0;
    }

    
    //Ball and Wall colishion
    if(ball.x>canvas.width-ball.width/2)
	{
        ball.x = canvas.width-ball.width/2;
        ball.vx = -ball.vx;
	}
	
	if(ball.x<ball.width/2)
	{
        ball.x=ball.width/2;
		ball.vx = -ball.vx;
	}

	if(ball.y+ball.height/2>canvas.height)
	{
        ball.y = canvas.height-ball.height/2;
		ball.vy = -ball.vy*0.67;
        score = 0;
	}
	
	if(ball.y<ball.height/2)
	{
        ball.y=ball.height/2;
		ball.vy = -ball.vy;
	}

    if(ball.hitTestObject(paddle))
    {
        ball.vy=-35;

        ball.y=paddle.y-ball.height/2-paddle.height/2;
        
        score++;
        if(ball.x < paddle.x - paddle.width/6)
        {           
            ball.vx=-ball.force;
        }
        if(ball.x < paddle.x - paddle.width/6*2)
        {
            ball.vx=-ball.force*5;
        }
        if(ball.x > paddle.x + paddle.width/6)
        {    
            ball.vx= ball.force;
        }
        if(ball.x>paddle.x+paddle.width/6*2)
        {
            ball.vx= ball.force*5;
        }
    }

    ball.drawCircle();
    paddle.drawRect();
    string.drawLine(ball.x,ball.y,paddle.x,paddle.y);
    text.drawTxt("Score: " + score, "16px Arial black");
}