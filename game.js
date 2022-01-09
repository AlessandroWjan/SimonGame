let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let inGame = false;

let record = 0;


function playGame() {
    if (!inGame) {
        $("h1").text("Level " + level);
        $(".playBtn").css("visibility", "hidden");
        $("#subtitle").css("visibility", "hidden");
        nextSequence();
        inGame = true;
        }
}

$(".btn").on("click", function () {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#subtitle").css("visibility", "hidden");
        $("h1").text("Game over! Press The Button Below To Restart");
        $(".playBtn").text("Restart");
        $(".playBtn").css("visibility", "visible");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        resetGame();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    if (record < level) {
        record = level;
    }

    $(".playBtn").text("Play");
    $("h1").text("Level " + level);
    $(".record").text("Record: Level " + record);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeTo(50, 0).fadeTo(50,1);

    playSound(randomChosenColour);
}

function playSound(colour) {
    let soundToPlay = new Audio("sounds/" + colour + ".mp3");
    soundToPlay.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function resetGame() {
    level = 0;
    gamePattern = [];
    inGame = false;
}

window.onbeforeunload = function() {
    return confirm("message");
};
