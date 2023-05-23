var a = false;
var d = false;

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

function press(e)
{
    console.log(e.keyCode);
    if(e.keyCode == 65)
	{
		a = true;
	}
    if(e.keycode == 68)
    {
        d = true;
    }
}

function release(e)
{
    if(e.keycode == 65)
    {
        a = false;
    }
    if(e.keycode == 68)
    {
        d = false;
    }
}