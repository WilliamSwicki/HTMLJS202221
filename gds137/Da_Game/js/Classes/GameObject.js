
function GameObject(obj)
{	
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.width = 100;
		this.height = 100;
		this.color = "#ff0000";
		this.teamColor = "#0000ff";
		this.force = 1;
		this.ax = 1;
		this.ay = 1;
		this.vx = 0;
		this.vy = 0;
		this.angle =0;
		this.rotationSpeed = 2;
		this.accelerationSpeed =1;
		this.dx;
		this.dy;

	//whether or not the object can jump
	this.canJump = false;
	this.jumpHeight = -25;
	//var for bullets
	this.damage = 0;
	
	//------Allows us to pass object literals into the class to define its properties--------//
		//------This eliminate the need to pass in the property arguments in a specific order------------//
		if(obj!== undefined)
		{
			for(value in obj)
			{
				if(this[value]!== undefined)
				{
					this[value] = obj[value];
				}
			}
		}
		
	this.drawRect = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.rotate(this.angle*Math.PI/180);
			context.fillRect((-this.width/2), (-this.height/2), this.width, this.height);
		context.restore();
		
	}	
	
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.beginPath();
			context.translate(this.x, this.y);
			context.arc(0, 0, this.radius(), 0, 360 *Math.PI/180, true);
			context.closePath();
			context.fill();
		context.restore();
		
	}	

	this.drawShip = function()
	{
		context.save();
			context.beginPath();
			
			context.fillStyle = this.color;
			context.translate(this.x,this.y);
			context.rotate(this.angle*Math.PI/180);
			context.ellipse(0,0,(this.width/2),(this.height/2),0,0,360 *Math.PI/180,false);
			context.fill();
			context.fillRect(0+this.width/2-3,0-this.height/10,this.width/4,this.height/5);
			context.fillStyle = this.teamColor;
			context.fillRect(0-this.width/20,0-this.height*0.75,this.width/10,this.height*1.5);
			context.fillStyle = this.color;
			context.closePath();
	context.restore();
	}
	
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
	
	
	//---------Returns object's for the top, bottom, left and right of an object's bounding box.
	this.left = function() 
	{
		return {x:this.x -Math.cos((player.angle+180)*Math.PI/180) * -this.width/2 , y:this.y+Math.sin((player.angle+180)*Math.PI/180)*this.width/2}
	}
	this.right = function() 
	{
		return {x: this.x + Math.cos(this.angle * Math.PI/180)*this.width/2 , y:this.y+Math.sin(this.angle * Math.PI/180)*this.width/2}
	}
	
	this.top = function() 
	{
		return {x:this.x - Math.cos((player.angle-90)*Math.PI/180)*-this.height/2, y:this.y-Math.sin((player.angle-90)*Math.PI/180) *-this.height/2}
	}
	this.bottom = function() 
	{
		return {x:this.x + Math.cos((player.angle+90)*Math.PI/180) *this.height/2, y:this.y + Math.sin((player.angle+90)*Math.PI/180)*this.height/2}
	}
	
	this.hitTestObject = function(obj)
	{
		if(this.left().x <= obj.right().x && 
		   this.right().x >= obj.left().x &&
		   this.top().y <= obj.bottom().y &&
		   this.bottom().y >= obj.top().y)
		{
			return true
		}
		return false;
	}
		
	//------Tests whether a single point overlaps the bounding box of another object-------
	this.hitTestPoint = function(obj)
	{
		if(obj.x >= this.left().x && 
		   obj.x <= this.right().x &&
		   obj.y >= this.top().y &&  
		   obj.y <= this.bottom().y)
		{
			return true;
		}
		return false;
	}
	
	/*-----Sets or gets the radius value--------*/
	this.radius = function(newRadius)
	{
			return this.width/2; 
	}
	
	//Draws the collision points
	this.drawDebug = function()
	{
		var size = 5;
		context.save();
		context.fillStyle = "black";
		context.fillRect(this.left().x-size/2, this.left().y-size/2, size, size);
		context.fillRect(this.right().x-size/2, this.right().y-size/2, size, size);
		context.fillRect(this.top().x-size/2, this.top().y-size/2, size, size);
		context.fillRect(this.bottom().x-size/2, this.bottom().y-size/2, size, size);
		context.fillRect(this.x-size/2, this.y-size/2, size, size);
		context.restore();
	}

}