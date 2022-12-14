//alert("Hello this is the alert");
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

var wins = 0
var loss = 0

var rock = new Image();
var paper = new Image();
var scissors = new Image();
var hrock = new Image();
var hpaper = new Image();
var hscissors = new Image();

rock.src ="images/Sloop.png";
paper.src ="images/Brigantine.png";
scissors.src ="images/Galleon.png";
hrock.src ="images/Sloop2.png";
hpaper.src ="images/Brigantine2.png";
hscissors.src ="images/Galleon2.png";

var result = "Select a button from above to choose.";

hscissors.onload = function(){
    draw(rock, paper, scissors, rock, paper, scissors);
}

document.addEventListener('keydown',keyPressDown);
document.addEventListener('keyup',keyPressUp);

var gameOver = true;

function keyPressDown(e){
    console.log(e.keyCode);
}

function keyPressUp(e){
    console.log(e.keyCode);
    if(e.keyCode == 32){
        gameOver = false;
        draw(rock,paper,scissors,rock,paper,scissors);
    }
}

function draw(rock,paper,scissors, crock, cpaper, cscissors){
    if(gameOver == true){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 0.5;
        ctx.fillStyle = "black";
        ctx.fillText("Welcome Press Space to Play", canvas.width/2, 100);
        ctx.strokeText("Welcome Press Space to Play", canvas.width/2, 100);
        return;
    }
    //clear canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.strokeStyle = "white";
    ctx.lineWidth = 0.5;
    ctx.fillStyle = "black";
    ctx.fillText("Player Choices", canvas.width/2, 100);
    ctx.strokeText("Player Choices", canvas.width/2, 100);
    ctx.drawImage(rock, canvas.width/2 -rock.width/2-100, 150);
    ctx.drawImage(paper, canvas.width/2 -paper.width/2, 150);
    ctx.drawImage(scissors, canvas.width/2 -scissors.width/2+100, 150);

    ctx.fillText("Computer Choices", canvas.width/2, 325);
    ctx.strokeText("Computer Choices", canvas.width/2, 325);
    ctx.drawImage(crock, canvas.width/2 -rock.width/2-100, 375);
    ctx.drawImage(cpaper, canvas.width/2 -paper.width/2, 375);
    ctx.drawImage(cscissors, canvas.width/2 -scissors.width/2+100, 375);

    ctx.fillText(result, canvas.width/2, 525);
    ctx.strokeText(result, canvas.width/2, 525);

    ctx.fillText("Wins:"+ wins, 250, 100);
    ctx.strokeText("Wins:"+ wins, 250, 100);
    ctx.fillText("Loss:"+ loss, 750, 100);
    ctx.strokeText("Loss:"+ loss, 750, 100);
}

ctx.font = "40px Calibri";
ctx.fillStyle = "Blue";
ctx.strokeStyle = "#001287";
ctx.lineWidth = 2;
/*alignText("Welcome to RPS Game!", 500, 50, "blue");
ctx.strokeText("Welcome to RPS Game!", 500, 50);*/
//Array datatype arrays need "[]"
//var rps = ["Rock",'Paper',"Scissors"];
var rps = new Array("Rock", "Paper", "Scissors");

document.getElementById("rock").addEventListener('click', function (e) {
    //ctx.clearRect(0,70,800,600)
    //alignText("You clicked " + rps[0], 500, 100, "blue");
    playGame(rps[0]);
});
document.getElementById("paper").addEventListener('click', function (e) {
    //ctx.clearRect(0,70,800,600)
    //alignText("You clicked " + rps[1], 500, 100, "blue");
    playGame(rps[1]);
});
document.getElementById("scissors").addEventListener('click', function (e) {
    //ctx.clearRect(0,70,800,600)
    //alignText("You clicked " + rps[2], 500, 100, "blue");
    playGame(rps[2]);
});

function playGame(playerChoise) {
    if(gameOver == true){
        return;
    }
    var cpuChoise = Math.floor(Math.random() * 2.99);
    console.log(cpuChoise, playerChoise);

    switch (playerChoise) {
        case "Rock":
            if (cpuChoise == 0) {
                //its a tie
                /*alignText("CPU chose Rock.", 500, 200, "red")
                alignText("It's a tie!", 500, 400, "black")*/
                result = "CPU chose Sloop. It's a Tie!"
                draw(hrock, paper, scissors, hrock, paper,scissors)
            }
            else if (cpuChoise == 1) {
                /*alignText('CPU chose Paper.', 500, 200, "red")
                alignText('CPU wins!', 500, 400, "red")*/
                loss++;
                result = "CPU chose Brigantine. CPU Wins!"
                draw(hrock, paper, scissors, rock, hpaper,scissors)
            }
            else{
                /*alignText("CPU chose Scissors.", 500, 200, "red")
                alignText(" You win!", 500, 400, "blue")*/
                wins++;
                result = "CPU chose Galleon. You Win!"
                draw(hrock, paper, scissors, rock, paper,hscissors)
            }
            break;
        case "Paper":
            if (cpuChoise == 0) {
                //its a tie
                /*alignText("CPU chose Rock.", 500, 200, "red")
                alignText("You win!", 500, 400, "blue")*/
                wins++;
                result = "CPU chose Sloop. You Win!"
                draw(rock, hpaper, scissors, hrock, paper,scissors)
            }
            else if (cpuChoise == 1) {
                /*alignText("CPU chose Paper.", 500, 200, "red")
                alignText("It's a tie!", 500, 400, "black")*/
                result = "CPU chose Brigantine. It's a Tie!"
                draw(rock, hpaper, scissors, rock, hpaper,scissors)
            }
            else {
                /*alignText("CPU chose Scissors.", 500, 200, "red")
                alignText("CPU wins!", 500, 400, "red")*/
                loss++;
                result = "CPU chose Galleon. CPU Wins!"
                draw(rock, hpaper, scissors, rock, paper,hscissors)
            }
            break;
        case "Scissors":
            if (cpuChoise == 0) {
                //its a tie
                /*alignText("CPU chose Rock.", 500, 200, "red")
                alignText("CPU wins!", 500, 400, "red")*/
                loss++;
                result = "CPU chose Sloop. CPU Wins!"
                draw(rock, paper, hscissors, hrock, paper,scissors)
            }
            else if (cpuChoise == 1) {
                /*alignText('CPU chose Paper.', 500, 200, "red")
                alignText('You win!', 500, 400, "blue")*/
                wins++;
                result = "CPU chose Brigantine. You Win!"
                draw(rock, paper, hscissors, rock, hpaper,scissors)
            }
            else {
                /*alignText("CPU chose Scissors.", 500, 200, "red")
                alignText("It's a tie!", 500, 400, "black")*/
                result = "CPU chose Galleon. It's a Tie!"
                draw(rock, paper, hscissors, rock, paper,hscissors)
            }
            break;
    }
}
function alignText(text,x ,y, color){
    ctx.fillStyle = color
    ctx.textAlign = "center";
    ctx.fillText(text,x ,y)
}