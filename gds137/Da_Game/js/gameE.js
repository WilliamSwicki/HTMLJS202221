
var canvas;
var context;
var timer;
var interval;
var player;
var maxShot;
var shot = [];
var currentShot =0;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    player = new GameObject({x:500, y:canvas.height/2-100});
	player.height = 50;
	player.angle;
	player.rotationSpeed = 3;
	player.force=0;

	shot.width = 10;
	shot.height = 10;
	shot.color = "#5a5a5a";
	shot.angle;

	for(var i =0; i <=maxShot;i++)
	{
		shot[i]= new GameObject;
		shot.x=player.x;
		shot.y=-100;
	}

	var fX = .85;
	var fY = .85;

    interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

	
		var radians = player.angle * Math.PI/180;
		
		//Calculate acceleration modifiers (lengtha and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * player.force;
		player.vy += player.ay * player.force;
	if(w)
	{
		if(player.force<1)
		{
		player.force+=0.1;
		}
	}
	if(s)
	{
		if(player.force>0)
		{
		player.force-=0.01;
		}
	}
	if(a)
	{
		player.angle-=player.rotationSpeed;
	}
	if(d)
	{
		player.angle+=player.rotationSpeed;
	}
	if(space)
	{
		shot[currentShot].x=player.x;
		shot[currentShot].y=player.y;
		
	}
	player.vx *= fX;
	player.vy *= fY;

	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	//console.log(player.vx);
	//console.log(player.vy);
	console.log(player.x);

	//wall colishion
	if(player.y-player.height/2<0)
	{
		player.y=player.y+player.height/2;
		player.force = 0;
	}
	

    player.drawShip();
	//player.drawRect();
	player.drawDebug();
}