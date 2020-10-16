var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).keypress(function () {
  if(!started) {
    // $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});



$(".btn").click(function() {
  var userChosenColour=  $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length -1);
  sounds(userChosenColour);
  animatePress(userChosenColour);


});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
    console.log("success");

    if(gamePattern.length=== userClickedPattern.length) {
      setTimeout(  function() {
        nextSequence();
      } ,1000);
    }
  } else {
    console.log("wrong");
    var wrong= new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("GameOver! Press any key to Restart");
    startOver();
  }
}
function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  sounds(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function sounds(colourClicked) {
  var audio= new Audio("sounds/"+colourClicked+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
      $("#"+currentColour).removeClass("pressed")
  }, 100);
}

function startOver() {
  gamePattern=[];
  started=false;
  level=0;
}
