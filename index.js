var userClickedPattern=[];
var choosenColor=[];
var colours=["red","green","yellow","blue"];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    level++;
    gameLevel();
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour=colours[randomNumber];
    choosenColor.push(randomChosenColour);
    flicker(randomChosenColour);
    playSound(randomChosenColour);

}

function flicker(name){
    $("#"+name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(name){
    var sound="sounds/"+ name +".mp3";
    var audio=new Audio(sound);
    audio.play();
}

// $(document).keydown(function(event){
//    nextSequence();
// });


$(".box").click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(colorName){
    $("."+colorName).addClass("clicked");
    setTimeout(function(){
        $("."+ colorName).removeClass("clicked");
    },100);
}

function gameLevel(){
    $("h1").text("Level " + level);
}

function checkAnswer(currentLevel){
    if(choosenColor[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===choosenColor.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game-over,Press any key or press here to start");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function startOver() {
    level = 0;
    choosenColor = [];
    started = false;
  }


  function startGame() {
    if (!started) {
        nextSequence();
        started = true;
    }
}

$(document).keydown(startGame);
$("h1").click(startGame); 
