var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function playSound(name) {
    var sound = new Audio(`sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => { $("#"+currentColour).removeClass("pressed"); }, 200);
}

function nextSequence() {
    var buttons = ["green", "red", "yellow", "blue"];
    var randomNumber = Math.floor((Math.random()*4));
    console.log(buttons[randomNumber]);
    gamePattern.push(buttons[randomNumber]);
    $("#"+buttons[randomNumber]).animate({opacity:.1},1000).animate({opacity:1},800);
    playSound(buttons[randomNumber]);
    level++;
    $("#level-title").text("Level "+level);
    
}

function checkAnswer(currentLevel) {
    for (var i = 0; i <= currentLevel; i++){
        if(userClickedPattern[i] === gamePattern[i]){
            console.log("success");        }
        else{
            console.log("error");
        }
    }
    userClickedPattern = [];
    
}

$("body").keydown( function (e) {
    nextSequence();
    $("#level-title").text("Level "+level);
    $('#body').bind('keypress', function(ev) {
        ev.stopPropagation(); 
    });
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    console.log(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(level);
    console.log(userClickedPattern);
    playSound(userChosenColour);
});


