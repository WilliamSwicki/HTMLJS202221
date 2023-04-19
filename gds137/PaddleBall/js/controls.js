document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

var w = false;
var s = false;
var upArrow = false;
var downArrow = false;

function press(e)
{
    if(e.keyCode == 87)
    {
        w = true;
    }
    if(e.keyCode == 83)
    {
        s = true;
    }
    if(e.keyCode == 38)
    {
        upArrow = true;
    }
    if(e.keyCode == 40)
    {
        downArrow = true;
    }
}
function release(e)
{
    if(e.keyCode == 87)
    {
        w = false;
    }
    if(e.keyCode == 83)
    {
        s = false;
    }
    if(e.keyCode == 38)
    {
        upArrow = false;
    }
    if(e.keyCode == 40)
    {
        downArrow = false;
    }
}