var buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
//For starting the game
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level );
        nextSequence();
        started = true;
    }
});
//User Input is identified and stored
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
});
//Random colors are picked
function nextSequence(){
    userClickedPattern = [] ;
    level++;
    $("#level-title").text("Level " + level );
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);    
}
//For playing sounds
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//Animating the button press
function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
}
//For Checkking the checking the aanswer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        //console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
        }
    }
    else{
            var w = "wrong";
            playSound(w);
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over")
            },200);
            startOver();
    }
}   
//When input is wrong the game is restarted
function startOver(){
    level = 0;
    gamePattern = [];
    started = false ;
}
