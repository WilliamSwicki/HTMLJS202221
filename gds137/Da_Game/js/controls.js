var w = false;
var a = false;
var s = false;
var d = false;
var space = false;
var eShoot = false;
var esc = false;


document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = true;
	}
	if(e.keyCode == 65)
	{
		a = true;
	}
	if(e.keyCode == 83)
	{
		s = true;
	}
	if(e.keyCode == 68)
	{
		d = true;
	}
	if(e.keyCode == 32)
	{
		space = true;
	}
	if(e.keyCode == 186)
	{
		eShoot = true;
	}
	if(e.keyCode == 27)
	{
		esc = true;
	}
}

function release(e)
{
	//---This logs key codes into the browser's console.
	//console.log(e.keyCode);
	
	if(e.keyCode == 87)
	{
		w = false;
	}
	if(e.keyCode == 65)
	{
		a = false;
	}
	if(e.keyCode == 83)
	{
		s = false;
	}
	if(e.keyCode == 68)
	{
		d = false;
	}
	if(e.keyCode == 32)
	{
		space = false;
	}
	if(e.keyCode == 186)
	{
		eShoot = false;
	}
	if(e.keyCode == 27)
	{
		esc = false;
	}
}
