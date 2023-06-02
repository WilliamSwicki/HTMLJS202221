
var canvas;
var context;
var timer;
var interval;
var player;

//bullet vars
var maxShot = 100;
var eMaxShot = 100;
var shot = [];
var currentShot =0;
var eShot = [];
var eCurrentShot =0;
var shotDelay = 0;
var fireRate = 30;
var eShotDelay = 0;
var eFireRate = 30;

var iFrames = 150;
var hitCounter = 0;
eShoot = true;

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

	var level = new Level();

	level.generate(level.world[rand(0,level.world.length-1)],50,50,0);//rand(0,level.world.length-1)

	for(var sh =0; sh <=maxShot;sh++)
	{
		shot[sh]= new GameObject({force:3,width:10,height:10,color:"#5a5a5a"});
		shot[sh].x=player.x;
		shot[sh].y=-100;
	}
	//function generateShot(obj)
	//{
	for(var esh =0; esh <=eMaxShot;esh++)
	{
		eShot[esh]= new GameObject({force:3,width:10,height:10,color:"#c73232"});
		eShot[esh].x= -500;
		eShot[esh].y=-100;
	}
	//}
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
	//counters
	hitCounter--;
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
		eShotDelay--
	if(eShoot)
	{
		if(eShotDelay<0)
		{
			//----------------left bullet--------------

			eShot[eCurrentShot].vx=0;
			eShot[eCurrentShot].vy=0;
			//calulate shot angle
			eShot[eCurrentShot].ax = Math.cos(eLeftShotRadians);
			eShot[eCurrentShot].ay = Math.sin(eLeftShotRadians);
		
			//spwan shot on player
			eShot[eCurrentShot].x=level.bShip[e].x+Math.cos(eLeftShotRadians)*25;
			eShot[eCurrentShot].y=level.bShip[e].y+Math.sin(eLeftShotRadians)*25;
		
			//make shot move
			eShot[eCurrentShot].vx += eShot[eCurrentShot].ax * eShot[eCurrentShot].force;
			eShot[eCurrentShot].vy += eShot[eCurrentShot].ay * eShot[eCurrentShot].force;
		
			eShotDelay = fireRate*8;

			eCurrentShot++;
			//------------------right bullet-------------

			eShot[eCurrentShot].vx=0;
			eShot[eCurrentShot].vy=0;
			eShot[eCurrentShot].ax = Math.cos(eRightShotRadians);
			eShot[eCurrentShot].ay = Math.sin(eRightShotRadians);
		
			eShot[eCurrentShot].x=level.bShip[e].x+Math.cos(eRightShotRadians)*25;
			eShot[eCurrentShot].y=level.bShip[e].y+Math.sin(eRightShotRadians)* 25;

			eShot[eCurrentShot].vx += eShot[eCurrentShot].ax * eShot[eCurrentShot].force;
			eShot[eCurrentShot].vy += eShot[eCurrentShot].ay * eShot[eCurrentShot].force;
		
			eShotDelay = fireRate*8;

			eCurrentShot++;
			//----------------bullet reset-------------
}
			if(eCurrentShot>=eMaxShot)
			{
				eCurrentShot =0;
			}
	}
		

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
		//------------Enemy shot angles---------------
		var eLeftShotRadians = (level.bShip[e].angle-90)*Math.PI/180;
		var eRightShotRadians = (level.bShip[e].angle+90)*Math.PI/180;
		
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
		}
		/*if(dist<=150)
		{
		if(tdist<200)
		{
			level.shipTarget[e].angleRotate-=1;
			var rotateRadians = level.shipTarget[e].angleRotate * Math.PI/180;
			level.shipTarget[e].x = player.x + Math.cos(rotateRadians)*200;
			level.shipTarget[e].y = player.y + Math.sin(rotateRadians)*200;
		}
		}*/
		
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

		//----------------------------ship and enemy coloshions---------------------
		if(player.hitTestPoint(bSides[i]))
		{
			if(hitCounter<=0)
			{
			player.health-=level.bShip[e].damage;
			hitCounter=iFrames;
			}
		}
		for(esh=0;esh<eMaxShot;esh++)
		{
			if(eShot[esh].x<=player.right().x&&eShot[esh].x>=player.left().x&&eShot[esh].y<=player.bottom().y&&eShot[esh].y>=player.top().y||eShot[esh].x>=player.right().x&&eShot[esh].x<=player.left().x&&eShot[esh].y>=player.bottom().y&&eShot[esh].y<=player.top().y)
			{
				eShot[esh].vx=0;
				eShot[esh].vy=0;
				eShot[esh].x=-100;
				eShot[esh].y=-100;
				if(hitCounter<=0)
				{
					player.health-=level.bShip[e].damage;
					hitCounter=iFrames;
				}
			}
		}
		for(sh=0;sh<maxShot;sh++)
		{
			if(shot[sh].x>=level.bShip[e].right().x&&shot[sh].x<=level.bShip[e].left().x&&shot[sh].y>=level.bShip[e].bottom().y&&shot[sh].y<=level.bShip[e].top().y||shot[sh].x<=level.bShip[e].right().x&&shot[sh].x>=level.bShip[e].left().x&&shot[sh].y<=level.bShip[e].bottom().y&&shot[sh].y>=level.bShip[e].top().y)
			{
				level.bShip[e].health-=player.damage;
				shot[sh].x = -100;
				shot[sh].y = -100;
				shot[sh].vx = 0;
				shot[sh].vy = 0;
			}
		}
		//console.log(hitCounter);
		
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
		level.bShip[e].drawDebug();
		level.shipTarget[e].drawCircle();
		console.log(level.bShip[e].health);
		//console.log(player.damage);
	}		//level.grid[g].drawDebug();

	}

	/*
	-----This works for items-----
	while(island.hitTestObject(player))
	{
		player.x--;
		player.force =0;
	}*/
	//make shots move for now
	for(let sh=0;sh<currentShot;sh++)
	{
		shot[sh].move();
		shot[sh].drawDebug();
	}
	for(let esh=0;esh<eCurrentShot;esh++)
	{
		eShot[esh].move();
		eShot[esh].drawCircle();
		eShot[esh].drawDebug();
	}
	
	//console.log(player.force);
    player.drawShip();
	//console.log(level.x);
	player.drawDebug();
}