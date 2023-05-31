
var canvas;
var context;
var timer;
var interval;
var player;

//bullet vars
var maxShot = 5000;
var shot = [];
var currentShot =0;
var eShot = [];
var eCurrentShot =0;
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
	player.color = "brown";

	hiddenPoint = new GameObject({x:player.x,y:player.y});
	hiddenPoint.height = 15;
	hiddenPoint.width = 15;
	hiddenPoint.color = "white";

	var level = new Level();

	level.generate(level.world[rand(0,level.world.length-1)],50,50,0);//rand(0,level.world.length-1)

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

	var hdx = player.x - hiddenPoint.x;
	var hdy = player.y - hiddenPoint.y;

	var hdist = Math.sqrt(hdx*hdx+hdy*hdy);
	
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
		
		while(sides[i].x>canvas.width)
		{
			player.x--
			sides[i].x--
		}

		while(sides[i].x<0)
		{
			player.x++
			sides[i].x++
		}	
	
	for(var e=0;e<level.bShip.length;e++)
	{
		for(var g = 0; g < level.grid.length; g++)
		{
		var bSides = [
			level.bShip[e].right(),
			level.bShip[e].top(),
			level.bShip[e].bottom(),
			level.bShip[e].left(),
			level.bShip[e].topLeft(),
			level.bShip[e].topRight(),
			level.bShip[e].bottomLeft(),
			level.bShip[e].bottomRight()
		]

		level.bShip[e].accelerationSpeed = 0.2;
		level.bShip[e].force = 0;
		//-----------enemy ship to its target points-----------
		var dx = level.shipTarget[e].x - level.bShip[e].x;
		var dy = level.shipTarget[e].y - level.bShip[e].y;
		var dist = Math.sqrt(dx*dx+dy*dy);
		var pointRadians = Math.atan2(dy,dx);
		//------------target points to player---------
		var tdx = player.x - level.shipTarget[e].x;
		var tdy = player.y - level.shipTarget[e].y;
		var tdist = Math.sqrt(tdx*tdx+tdy*tdy);
		var targetRadians = Math.atan2(tdy,tdx);
		
		//-----------target point colishions----------
		//top bottom
		while(bSides[i].y>canvas.height)
		{
			level.shipTarget[e].y--
			bSides[i].y--
			level.bShip[e].y--
		}	

		while(bSides[i].y<0)
		{
			level.shipTarget[e].y++
			bSides[i].y++
			level.bShip[e].y++
		}
		//left right
		while(bSides[i].x>canvas.width)
		{
			level.shipTarget[e].x--
			bSides[i].x--
			level.bShip[e].x--
		}

		while(bSides[i].x<0)
		{
			level.shipTarget[e].x++
			bSides[i].x++
			level.bShip[e].x++
		}	

		if(dist>150)
		{
			level.shipTarget[e].x+=0;
			level.shipTarget[e].y+=0;
		}
		else
		{
		level.shipTarget[e].x+=tdx/300;
		level.shipTarget[e].y+=tdy/300;
		
		
		if(tdist<200)
		{
			level.shipTarget[e].angleRotate-=1;
			var rotateRadians = level.shipTarget[e].angleRotate * Math.PI/180;
			level.shipTarget[e].x = player.x + Math.cos(rotateRadians)*200;
			level.shipTarget[e].y = player.y + Math.sin(rotateRadians)*200;
		}
		}
		level.bShip[e].angle=pointRadians*180/Math.PI
		
		level.bShip[e].ax = Math.cos(pointRadians);
		level.bShip[e].ay = Math.sin(pointRadians);
		
		if(level.bShip[e].force<1)
		{
			level.bShip[e].force+=level.bShip[e].accelerationSpeed;
		}

		level.bShip[e].vx = level.bShip[e].ax * level.bShip[e].force;
		level.bShip[e].vy = level.bShip[e].ay * level.bShip[e].force;
		level.bShip[e].angleRotate= pointRadians * 180/Math.PI - 180;

		//enemy shooting 
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
	//islands
		//level 1
		
			level.grid[g].drawRect();
			while(level.grid[g].hitTestPoint(sides[i]))
			{
				//------------player ship--------------
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
			while(level.grid[g].hitTestPoint(bSides[i]))
			{
				//-------enemy ships------
				if(bSides[i].x<level.grid[g].x-level.grid[g].width/4)
				{	
					level.bShip[e].x--
					level.shipTarget[e].x--
					bSides[i].x--
					level.shipTarget[e].angleRotate-=1;
					
				}
				if(bSides[i].x>level.grid[g].x+level.grid[g].width/4)
				{	
					level.bShip[e].x++
					level.shipTarget[e].x++
					bSides[i].x++
					level.shipTarget[e].angleRotate-=1;
						
				}
				if(bSides[i].y<level.grid[g].y-level.grid[g].height/4)
				{	
					level.bShip[e].y--
					level.shipTarget[e].y--
					bSides[i].y--
					level.shipTarget[e].angleRotate-=1;
					
				}
				if(bSides[i].y>level.grid[g].y+level.grid[g].height/4)
				{	
					level.bShip[e].y++
					level.shipTarget[e].y++
					bSides[i].y++
					level.shipTarget[e].angleRotate-=1;
					
				}
			}
			
	
			if(sides[i].x>canvas.width && eAlive==0) // add an extra conditnol to check for enemies
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
			level.bShip[e].move();
		
		level.bShip[e].drawShip();
		level.shipTarget[e].drawCircle();
		//console.log(level.grid[0].x);
	}		//level.grid[g].drawDebug();
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
	hiddenPoint.drawCircle();
	//island.drawDebug();
}