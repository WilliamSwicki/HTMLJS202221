
var canvas;
var context;
var timer;
var interval;
var player;

//bullet vars
var maxShot = 5000;
var shot = [];
var currentShot =0;
var shotDelay = 60;
var fireRate = 30;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    player = new GameObject({x:500, y:canvas.height/2-100});
	player.height = 50;
	player.angle;
	player.rotationSpeed = 3;
	player.ax =0;
	player.ay =0;
	player.force=0;
	player.accelerationSpeed= 0.02;

	for(var i =0; i <=maxShot;i++)
	{
		shot[i]= new GameObject({force:3,width:10,height:10,color:"#5a5a5a"});
		shot[i].x=player.x;
		shot[i].y=-100;
	}

	var fX = .85;
	var fY = .85;

    interval = 1000/60;
	timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);

	
		var radians = player.angle * Math.PI/180;
		var leftShotRadians = (player.angle-90)*Math.PI/180;
		var rightShotRadians = (player.angle+90)*Math.PI/180;
		//console.log(leftShotRadians);
		//Calculate acceleration modifiers (length and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		
		player.vx += player.ax * player.force;
		player.vy += player.ay * player.force;

	if(w)
	{
		if(player.force<1)
		{
		player.force+=player.accelerationSpeed;
		}
	}
	if(s)
	{
		if(player.force>0)
		{
		player.force-=player.accelerationSpeed;

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

	shotDelay--;
	if(space)
	{
		if(shotDelay<=0)
		{
		//----------------left bullet--------------

		shot[currentShot].vx=0;
		shot[currentShot].vy=0;
		//calulate shot angle
		shot[currentShot].ax = Math.cos(leftShotRadians);
		shot[currentShot].ay = Math.sin(leftShotRadians);
		
		//spwan shot on player
		shot[currentShot].x=player.x+Math.cos(leftShotRadians)*25;
		shot[currentShot].y=player.y+Math.sin(leftShotRadians)* 25;
		
		//make shot move
		shot[currentShot].vx += player.vx + shot[currentShot].ax * shot[currentShot].force;
		shot[currentShot].vy += player.vy + shot[currentShot].ay * shot[currentShot].force;
		
		shotDelay = fireRate;

		currentShot++;
		//------------------rihgt bullet-------------

		shot[currentShot].vx=0;
		shot[currentShot].vy=0;
		shot[currentShot].ax = Math.cos(rightShotRadians);
		shot[currentShot].ay = Math.sin(rightShotRadians);
		
		shot[currentShot].x=player.x+Math.cos(rightShotRadians)*25;;
		shot[currentShot].y=player.y+Math.sin(rightShotRadians)* 25;;

		shot[currentShot].vx += player.vx + shot[currentShot].ax * shot[currentShot].force;
		shot[currentShot].vy += player.vy + shot[currentShot].ay * shot[currentShot].force;
		
		shotDelay = fireRate;

		currentShot++;
		//----------------bullet reset-------------

		if(currentShot>=maxShot)
		{
			currentShot =0;
		}
		}
		//console.log(shot[currentShot].force);
		//console.log(shot[currentShot].vy);
		//console.log(shot[currentShot].ay);
	}
	else
	{
		shotDelay =0;
	}

	player.vx *= fX;
	player.vy *= fY;

	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	//wall colishion
	if(player.y-player.height/2<0)
	{
		player.y=player.y+player.height/2;
		player.force = 0;
	}
	//make shots move for now
	for(var i=0;i<currentShot;i++)
	{
		shot[i].move();
		shot[i].drawCircle();
	}

    player.drawShip();
	//player.drawRect();
	player.drawDebug();
}