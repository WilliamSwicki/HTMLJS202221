function rand(low,high)
{
    Math.random()*(high-low)+low;
}

function GameThing(obj)
{
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.vx = 0
    this.vy = 0
    this.ax = 1
    this.ay = 1
    this.width = 50
    this.height = 50
    this.color = "#ffff00"
    this.force = 1

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
    
    this.gravity = function(grav)
    {
        this.vy+=grav;
    }
    this.friction =function(fx)
    {
        this.vx*=fx;
    }
    this.move = function()
    {
		this.x += this.vx;
   		this.y += this.vy;
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
    
    this.left = function()
    {
        return {x:this.x - this.width/2,y: this.y}
    }
    this.right = function()
    {
        return {x:this.x + this.width/2,y: this.y}
    }
    this.top = function()
    {
        return {x:this.x ,y: this.y-this.height/2}
    }
    this.bottom = function()
    {
        return {x:this.x ,y: this.y+this.height/2}
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
}