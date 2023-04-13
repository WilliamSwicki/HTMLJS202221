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

 player2 = new GameObject();
 player2.width = 20;
player2.height = 150;
player2.vy = 0;
 player2.x = canvas.width-50;
 player2.color="#0000ff";

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

    //Player2 movement
    if(upArrow)
    {
      player2.vy = -10;
      player2.y += player2.vy;
    }
    
    if(downArrow)
    {
        player2.vy = 10;
        player2.y += player2.vy;
    }

    if(player2.y < 0+player2.height/2)
    {
        player2.y = 0+player2.height/2;
        player2.vy = 0;
    }
    if(player2.y>canvas.height-player2.height/2)
    {
        player2.y=canvas.height - player2.height/2;
        player2.vy = 0;
    }

    //Ball movement
    ball.x += ball.vx;
    ball.y += ball.vy;

	if(ball.x>canvas.width-ball.width/2)
	{
        ball.vx = ball.vx;
		ball.vy = -ball.vy;
        ball.x=canvas.width/2;
        ball.y=canvas.height/2;
        ball.color="#00ff00";
	}
	
	if(ball.x<ball.width/2)
	{
		ball.vx = ball.vx;
        ball.vy = -ball.vy;
        ball.x=canvas.width/2;
        ball.y=canvas.height/2;
		ball.color="#ff0000";
	}

	if(ball.y+ball.height/2>canvas.height)
	{
        ball.y = canvas.height-ball.height/2;
		ball.vy = -ball.vy;
		ball.color="#0000ff";
	}
	
	if(ball.y<ball.height/2)
	{
		ball.vy = -ball.vy;
		ball.color="#ffff00";
	}
    
    //player1 ball colishion
    if(ball.hitTestObject(player1))
    {
        ball.vx=-ball.vx;
        ball.x=player1.x+ball.width/2+player1.width/2;
        if(ball.y < player1.y - player1.height/6)
        {           
            ball.vy=-Math.abs(ball.vy);
        }
        if(ball.y > player1.y + player1.height/6)
        {    
            ball.vy= Math.abs(ball.vy);
        }
    }

    //player2 ball colishion
    if(ball.hitTestObject(player2))
    { 
        ball.vx=-ball.vx;
        ball.x=player2.x-ball.width/2-player2.width/2;
        if(ball.y < player2.y - player2.height/6)
        {           
            ball.vy=-Math.abs(ball.vy);
        }
        if(ball.y > player2.y + player2.height/6)
        {    
            ball.vy= Math.abs(ball.vy);
        }
           
    }

	//Update the Screen
	player1.drawRect();
    player2.drawRect();
   ball.drawCircle();

}