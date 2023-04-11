var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;

var player1;
var ball;
var accelration = 1.05;

player1 = new GameObject();
player1.width = 20;
player1.height = 150;
player1.vy = 0;
 player1.x = 50;

ball = new GameObject();
	ball.vx = -5;
	ball.vy = 5;
    ball.width = 50;
    ball.height = 50;

var timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    
    //pattle movement
    //draw on the left
   
    
    if(w)
    {
      player1.vy = -10;
      player1.y += player1.vy;
    }
    
    if(s)
    {
        player1.vy = 10;
        player1.y += player1.vy;
    }

    if(player1.y < 0+player1.height/2)
    {
        player1.y = 0+player1.height/2;
        player1.vy = 0;
    }
    if(player1.y>canvas.height-player1.height/2)
    {
        player1.y=canvas.height - player1.height/2;
        player1.vy = 0;
    }

    //Ball movement
    ball.x += ball.vx;
    ball.y += ball.vy;

	if(ball.x>canvas.width-ball.width/2)
	{
        ball.x = canvas.width-ball.width/2;
		ball.vx = -ball.vx*accelration;
        ball.color="#00ff00";
	}
	
	if(ball.x<ball.width/2)
	{
		ball.vx = 5;
        ball.vy = 5;
        ball.x=canvas.width/2;
        ball.y=canvas.height/2;
		ball.color="#ff0000";
	}

	if(ball.y+ball.height/2>canvas.height)
	{
        ball.y = canvas.height-ball.height/2;
		ball.vy = -ball.vy*accelration;
		ball.color="#0000ff";
	}
	
	if(ball.y<ball.height/2)
	{
		ball.vy = -ball.vy*accelration;
		ball.color="#ffff00";
	}
 
    if(ball.hitTestObject(player1))
    {
        if(ball.y < player1.y - player1.height/6)
        {           
            ball.vx=-ball.vx;
            ball.vy=ball.vy;
        }
        if(ball.y > player1.y + player1.height/6)
        {    
            ball.vx=-ball.vx;
            ball.vy= -ball.vy;
        }
        if(ball.y>player1.y-player1.height/6 && ball.y<player1.y+player1.height/6)
        {
            ball.vx=-ball.vx;
        }
    }
	//Update the Screen
	player1.drawRect();
   ball.drawCircle();

}