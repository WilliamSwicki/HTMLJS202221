// JavaScript Document
function GameObject()
{
	//player's location
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	
	//player's dimensions
	this.width = 100;
	this.height = 100;
	
	//player's velocity or speed on each axis
	this.vx = 0;
	this.vy = 0;
	this.force = 1;
	
	this.ax = 1;
	this.ay = 1;
	
	//Text 
	this.align = "left";

	//movement
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
	this.left = function() 
	{
		return this.x - this.width/2;
	}
	this.right = function() 
	{
		return this.x + this.width/2;
	}
	
	this.top = function() 
	{
		return this.y - this.height/2;
	}
	this.bottom = function() 
	{
		return this.y + this.height/2;
	}
	this.hitTestObject = function(obj)
	{
		if(this.left() < obj.right() && 
		   this.right() > obj.left() &&
		   this.top() < obj.bottom() &&
		   this.bottom() > obj.top())
		{
			return true
		}
		return false;
	}

	//player's color
	this.color = "#ff0000";
	
	//This draws the player to the screen
	this.drawCircle = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x, this.y);
			context.beginPath();
			context.arc(0,0,this.width/2,0,360*Math.PI/180,true);
			context.closePath();
			context.fill();
		context.restore();
		
	}	
	
	this.drawRect = function()
	{
		context.save();
			context.fillStyle = this.color;
			context.translate(this.x,this.y);
			context.fillRect(-this.width/2,-this.height/2,this.width,this.height);
		context.restore();
	}

	this.drawTxt = function(text, font)
	{
		context.save();
		context.textAlign = this.align;
   		context.font = font;
  		context.fillText(text,this.x,this.y);
	}

	this.drawLine = function(x1,y1,x2,y2)
	{
		context.save();
		context.beginPath();
  		context.moveTo(x1,y1);
   		context.lineTo(x2,y2);
   		context.closePath();
   		context.lineWidth = this.width;
   		context.stroke();
   		context.restore();
	}

	//This changes the player's position
	this.move = function()
	{
		this.x += this.vx;
		this.y += this.vy;
	}
}
