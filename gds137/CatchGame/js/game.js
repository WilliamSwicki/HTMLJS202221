
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
    var aBall=[];
    var bBall=[];

    var dicks =0;
    dicks = rand(20,30);
        console.log(dicks);


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

    for(let i=0;i<5;i++)
    {
        //bBall[i]=new GameThing ({width:25 , height:25, color:"#ffc0cb",x:rand(100,900) });
        //bBall[i].;//(bBall[i].width/2,canvas.width-bBall[i].width/2)
        
       // aBall[i]=new GameThing({width:25 , height:25, color:"#ao2ofo", x: rand(20,30)});
        
        
        bBall[i].drawCircle();
        aBall[i].drawRect();
    }
    player.drawRect();
}