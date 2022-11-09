//alert("Hello this is the alert");
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

ctx.font = "40px Arial";
ctx.fillText("Welcom to RPS Game!", 200, 50);
//Array datatype arrays need "[]"
//var rps = ["Rock",'Paper',"Scissors"];
var rps = new Array("Rock", "Paper", "Scissors");

document.getElementById("rock").addEventListener('click', function (e) {
    alert("You clicked " + rps[0]);
    playGame(rps[0]);
});
document.getElementById("paper").addEventListener('click', function (e) {
    alert("You clicked " + rps[1]);
    playGame(rps[1]);
});
document.getElementById("scissors").addEventListener('click', function (e) {
    alert("You clicked " + rps[2]);
    playGame(rps[2]);
});

function playGame(playerChoise) {
    var cpuChoise = Math.floor(Math.random() * 2.99);
    console.log(cpuChoise, playerChoise);

    switch (playerChoise) {
        case "Rock":
            if (cpuChoise == 0) {
                //its a tie
                alert("CPU chose Rock. It's a tie!")
            }
            else if (cpuChoise == 1) {
                alert('CPU chose Paper. CPU wins!')
            }
            else{
                alert("CPU chose Scissors. You win!")
            }
            break;
        case "Paper":
            if (cpuChoise == 0) {
                //its a tie
                alert("CPU chose Rock. You win!")
            }
            else if (cpuChoise == 1) {
                alert("CPU chose Paper. It's a tie!")
            }
            else {
                alert("CPU chose Scissors. CPU wins!")
            }
            break;
        case "Scissors":
            if (cpuChoise == 0) {
                //its a tie
                alert("CPU chose Rock. CPU wins!")
            }
            else if (cpuChoise == 1) {
                alert('CPU chose Paper. You win!')
            }
            else {
                alert("CPU chose Scissors. It's a tie!")
            }
            break;
    }
}