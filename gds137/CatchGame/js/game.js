var canvas;
var context;
var timer;
var interval;
//pink and purple
    canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");

    interval = 1000/60;
    timer = setInterval(animate, interval);

    var player= new GameThing;
    player.x= canvas.width/2
    player.y= canvas.height-25-player.height/2
    player.ax= 1;
    player.force = 1;

function animate()
{
    context.clearRect(0,0,canvas.width, canvas.height);
   
    //controlls
    if(a)
    {
        player.vx+=-player.ax*player.force; 
    }
    if(d)
    {
        player.vx+=player.ax*player.force;
    }
    player.friction(0.87);
    player.x+=player.vx;
    console.log(player.vx);
    player.drawRect();
}