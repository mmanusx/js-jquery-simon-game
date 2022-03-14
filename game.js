var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var is_game_started = false;
var level = 0;
var index_of_the_last_answer = 0;

$(document).keypress(function(){

    if(is_game_started == false){
        
        // game title level i değiştirmek
        $("#level-title").text("level " + level);
        nextSequence();
        is_game_started = true;
    }
}
);

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatedPress(userChosenColour);

    checkAnswer(level);
}
);

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(
                function(){
                    nextSequence();
                },
                1000
            );
        }
    }else {
        // Yanlış Cevap
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }

}

function nextSequence(){
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColur = buttonColours[randomNumber];
    gamePattern.push(randomChosenColur);

    $("#" + randomChosenColur).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColur);

    // next level
    level ++;
    $("#level-title").text("level " + level);
}


function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}

function animatedPress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(
        function(){
            $("#" + currentColour).removeClass("pressed");
        },
        100
    );
}

function startOver(){
    // Reset variables
    level = 0;
    gamePattern = [];
    is_game_started = false;
    
}



