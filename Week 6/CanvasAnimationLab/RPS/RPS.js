//alert("Hello this is the alert");
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

ctx.font = "40px Calibri";
ctx.fillStyle = "Blue";
ctx.strokeStyle = "#001287";
ctx.lineWidth = 2;
alignText("Welcom to RPS Game!", 400, 50, "blue");
ctx.strokeText("Welcom to RPS Game!", 400, 50);
//Array datatype arrays need "[]"
//var rps = ["Rock",'Paper',"Scissors"];
var rps = new Array("Rock", "Paper", "Scissors");

document.getElementById("rock").addEventListener('click', function (e) {
    ctx.clearRect(0,70,800,600)
    alignText("You clicked " + rps[0], 400, 100, "blue");
    playGame(rps[0]);
});
document.getElementById("paper").addEventListener('click', function (e) {
    ctx.clearRect(0,70,800,600)
    alignText("You clicked " + rps[1], 400, 100, "blue");
    playGame(rps[1]);
});
document.getElementById("scissors").addEventListener('click', function (e) {
    ctx.clearRect(0,70,800,600)
    alignText("You clicked " + rps[2], 400, 100, "blue");
    playGame(rps[2]);
});

function playGame(playerChoise) {
    var cpuChoise = Math.floor(Math.random() * 2.99);
    console.log(cpuChoise, playerChoise);

    switch (playerChoise) {
        case "Rock":
            if (cpuChoise == 0) {
                //its a tie
                alignText("CPU chose Rock.", 400, 200, "red")
                alignText("It's a tie!", 400, 400, "black")
            }
            else if (cpuChoise == 1) {
                alignText('CPU chose Paper.', 400, 200, "red")
                alignText('CPU wins!', 400, 400, "red")
            }
            else{
                alignText("CPU chose Scissors.", 400, 200, "red")
                alignText(" You win!", 400, 400, "blue")
            }
            break;
        case "Paper":
            if (cpuChoise == 0) {
                //its a tie
                alignText("CPU chose Rock.", 400, 200, "red")
                alignText("You win!", 400, 400, "blue")
            }
            else if (cpuChoise == 1) {
                alignText("CPU chose Paper.", 400, 200, "red")
                alignText("It's a tie!", 400, 400, "black")
            }
            else {
                alignText("CPU chose Scissors.", 400, 200, "red")
                alignText("CPU wins!", 400, 400, "red")
            }
            break;
        case "Scissors":
            if (cpuChoise == 0) {
                //its a tie
                alignText("CPU chose Rock.", 400, 200, "red")
                alignText("CPU wins!", 400, 400, "red")
            }
            else if (cpuChoise == 1) {
                alignText('CPU chose Paper.', 400, 200, "red")
                alignText('You win!', 400, 400, "blue")
            }
            else {
                alignText("CPU chose Scissors.", 400, 200, "red")
                alignText("It's a tie!", 400, 400, "black")
            }
            break;
    }
}
function alignText(text,x ,y, color){
    ctx.fillStyle = color
    ctx.textAlign = "center";
    ctx.fillText(text,x ,y)
}