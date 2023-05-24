
var canvas;
var context;
var timer;
var interval;
var player;

//bullet vars
var maxShot = 5000;
var shot = [];
var currentShot =0;
var shotDelay = 0;
var fireRate = 30;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    player = new GameObject({x:100, y:canvas.height/2});
	player.height = 50;
	player.angle;
	player.rotationSpeed = 3;
	player.ax =0;
	player.ay =0;
	player.force=0;
	player.accelerationSpeed= 0.02;

	/*island = new GameObject({x: canvas.width/2,y:canvas.height/2})
	island.color="brown";
	island.angle = 0;
	island.width = 50;
	island.height = 50;*/

	var level = new Level();

	level.generate(level.world[rand(0,level.world.length-1)],50,50,0);

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
		var backRadians = (player.angle+180)*Math.PI/180;
		//console.log(leftShotRadians);
		//Calculate acceleration modifiers (length and height of triangle)
		player.ax = Math.cos(radians);
		player.ay = Math.sin(radians);
		//player.right().y = Math.sin(radians);
		//console.log(player.angle);
		//console.log(player.right());
		//console.log(player.top());
		//console.log(island.bottom());
		//console.log(Math.cos(radians));
		//move on angle
		player.vx += player.ax * player.force;
		player.vy += player.ay * player.force;

	//player movement
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
		shot[currentShot].y=player.y+Math.sin(leftShotRadians)*25;
		
		//make shot move
		shot[currentShot].vx += player.vx + shot[currentShot].ax * shot[currentShot].force;
		shot[currentShot].vy += player.vy + shot[currentShot].ay * shot[currentShot].force;
		
		shotDelay = fireRate;

		currentShot++;
		//------------------right bullet-------------

		shot[currentShot].vx=0;
		shot[currentShot].vy=0;
		shot[currentShot].ax = Math.cos(rightShotRadians);
		shot[currentShot].ay = Math.sin(rightShotRadians);
		
		shot[currentShot].x=player.x+Math.cos(rightShotRadians)*25;
		shot[currentShot].y=player.y+Math.sin(rightShotRadians)* 25;

		shot[currentShot].vx += player.vx + shot[currentShot].ax * shot[currentShot].force;
		shot[currentShot].vy += player.vy + shot[currentShot].ay * shot[currentShot].force;
		
		//shotDelay = fireRate;

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
	//uncomment to allow spam fire
	else
	{
		//shotDelay =0;
	}

	player.vx *= fX;
	player.vy *= fY;

	player.x += Math.round(player.vx);
	player.y += Math.round(player.vy);

	var sides = [
		player.right(),
		player.top(),
		player.bottom(),
		player.left(),
		player.topLeft(),
		player.topRight(),
		player.bottomLeft(),
		player.bottomRight()
	]
	
	//wall colishion
	//top bottom walls
	for(let i=0; i<sides.length; i++)
	{
		while(sides[i].y>canvas.height)
		{
			player.y--
			sides[i].y--
		}	

		while(sides[i].y<0)
		{
			player.y++
			sides[i].y++
		}	

	//left right walls
		/*while(sides[i].x>canvas.width) // add an extra conditnol to check for enemies
		{
			level.world.x--
			player.x--
			sides[i]--
			player.force=0
		}*/
		/*while(sides[i].x>canvas.width)
		{
			player.x--
			sides[i].x--
		}*/

		while(sides[i].x<0)
		{
			player.x++
			sides[i].x++
		}	
	//goons to shoot
	for(var e=0;e<level.bShip.length;e++)
	{
		level.bShip[e].drawShip();
	}
	//islands
		//level 1
		for(var g = 0; g < level.grid.length; g++)
		{
			level.grid[g].drawRect();
			while(level.grid[g].hitTestPoint(sides[i]))
			{
				//left right
				if(sides[i].x<level.grid[g].x-level.grid[g].width/4)
				{
					player.x--
					sides[i].x--
					player.force=0;
				}
				if(sides[i].x>level.grid[g].x+level.grid[g].width/4)
				{
					player.x++
					sides[i].x++
					player.force=0;
				}
				//top bottom
				if(sides[i].y<level.grid[g].y-level.grid[g].height/4)
				{
					player.y--
					sides[i].y--
					player.force=0;
				}
				if(sides[i].y>level.grid[g].y+level.grid[g].height/4)
				{
					player.y++
					sides[i].y++
					player.force=0;
				}
			}

			if(sides[i].x>canvas.width) // add an extra conditnol to check for enemies
			{
				
				for(g = 0;g<level.grid.length; g++)
				{
				level.grid[g].x=level.grid[g].x - canvas.width; 
				}

				level.generate(level.world[rand(0,level.world.length-1)],50,50,0);
				player.x= player.x - canvas.width + player.width
				sides[i].x=sides[i].x- canvas.width + player.width
				player.force=0
			}
		}
			//console.log(level.grid[0].x);
			//level.grid[g].drawDebug();
		/*for(let g = 0; g<level.bShip.length;g++)
		{
			level.bShip.drawShip();
		}*/
	}

	/*
	-----This works for items-----
	while(island.hitTestObject(player))
	{
		player.x--;
		player.force =0;
	}*/
	//make shots move for now
	for(var i=0;i<currentShot;i++)
	{
		shot[i].move();
		shot[i].drawCircle();
	}
	
	//island.drawRect();
    player.drawShip();
	//console.log(level.x);
	//player.drawRect();
	player.drawDebug();
	//island.drawDebug();
}