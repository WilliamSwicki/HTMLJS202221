var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var interval = 1000/60;

var player1;

player1 = new GameObject();
player1.width = 33;
player1.height = 100;

var timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    
    //draw on the left
    player1.x = 100;
    
    player1.drawRect();
}