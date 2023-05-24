
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

    playerHit = function()
    {
        player.color="#ffff00";
    }

    var score =0;

    var bBall=[]
    var aBall=[]
    var gravity =.25;
    for(let i =0;i<5;i++)
    {
    aBall[i] = new GameThing({width:25 , height:25, color:"#a020f0", y:850});
    bBall[i]=new GameThing ({width:25 , height:25, color:"#ffc0cb", y:850});
    }

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

    if(player.x>canvas.width-player.width/2)
    {
        player.x=canvas.width-player.width/2;
    }
    if(player.x<player.width/2)
    {
        player.x=player.width/2;
    }

    for(i=0;i<5;i++)
    {
        //thing go fall
        bBall[i].vy+=gravity;
        bBall[i].y+=bBall[i].vy;
        aBall[i].vy+=gravity;
        aBall[i].y+=aBall[i].vy;

        if(aBall[i].y>canvas.height)
        {
        aBall[i].x=rand(aBall[i].width/2,canvas.width-aBall[i].width/2);
        aBall[i].y=rand(-400,0);
        aBall[i].vy=rand(0.1,0.5);
        }
        if(bBall[i].y>canvas.height)
        {
        bBall[i].x=rand(bBall[i].width/2,canvas.width-bBall[i].width/2);
        bBall[i].y=rand(-400,0);
        bBall[i].vy=rand(0.1,0.5);
        }
        
        if(player.hitTestObject(bBall[i]))
        {
            for(i=0;i<5;i++)
            {
            aBall[i].x=rand(aBall[i].width/2,canvas.width-aBall[i].width/2);
            aBall[i].y=rand(-400,0);
            aBall[i].vy=rand(0.1,0.5);
            bBall[i].x=rand(bBall[i].width/2,canvas.width-bBall[i].width/2);
            bBall[i].y=rand(-400,0);
            bBall[i].vy=rand(0.1,0.5);
            }
            player.color="red";
            setTimeout(playerHit,500);
            score = 0;
        }
        if(player.hitTestObject(aBall[i]))
        {
            aBall[i].x=rand(aBall[i].width/2,canvas.width-aBall[i].width/2);
            aBall[i].y=rand(-400,0);
            aBall[i].vy=rand(0.1,0.5);
            player.color="green";
            setTimeout(playerHit,500);
            score++;
        }
        console.log(player.hitTestObject(bBall[i]));

        bBall[i].drawCircle();
        aBall[i].drawRect();
    }
    player.drawRect();

    context.font="bold 30px Arial";
    context.fillStyle=this.color;
    context.fillText("Score: " + score,50,50);
}