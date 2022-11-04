var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.fillStyle="yellow";
ctx.strokeStyle="black";
ctx.lineWidth="5";
ctx.fillRect(85,300,100,100);
ctx.strokeRect(85,300,100,100);

ctx.beginPath();
ctx.strokeStyle="rgb(255,0,0)";
ctx.lineWidth="5";
ctx.moveTo(85,683);
ctx.lineTo(280,550);
ctx.stroke();

ctx.beginPath();
ctx.fillStyle="#ffff00";
ctx.strokeStyle="red";
ctx.lineWidth="5";
ctx.arc(385,440,65,0,(2*Math.PI),true);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.fillStyle="#ff00ff";
ctx.strokeStyle="#00ffff";
ctx.lineWidth="5";
ctx.moveTo(558,310);
ctx.lineTo(670,285);
ctx.lineTo(725,380);
ctx.lineTo(650,465);
ctx.lineTo(550,420);
ctx.closePath();
ctx.fill();
ctx.stroke();

ctx.beginPath();
ctx.fillStyle="#ffff00";
ctx.strokeStyle="rgb(32,32,32)"
ctx.lineWidth="5";
ctx.moveTo(635,496);
ctx.lineTo(668,554);
ctx.lineTo(733,567);
ctx.lineTo(688,616);
ctx.lineTo(696,682);
ctx.lineTo(637,653);
ctx.lineTo(575,682);
ctx.lineTo(580,615);
ctx.lineTo(540,565);
ctx.lineTo(605,554);
ctx.closePath();
ctx.fill();
ctx.stroke();