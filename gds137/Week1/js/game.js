var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var w = false;
var s = false;

var interval = 1000/60;

var player1;

player1 = new GameObject();
player1.width = 33;
player1.height = 100;
player1.vy = 0;

var timer = setInterval(animate, interval);

document.addEventListener("keydown", press);
document.addEventListener("keyup", release);

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
}

function animate()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    
    //draw on the left
    player1.x = 50;
    
    if(w)
    {
      player1.vy = -10;
      player1.y += player1.vy;
    }
    
    if(s)
    {
        player1.vy = 10;
        player1.y += player1.vy;
    }
    

    if(player1.y < 0+player1.height/2)
    {
        player1.y = 0+player1.height/2;
        player1.vy = 0;
    }
    if(player1.y+player1.height/2>canvas.height)
    {
        player1.y=canvas.height - player1.height/2;
        player1.vy = 0;
    }

    player1.drawRect();
}