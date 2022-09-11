var gamePattern = [];
var buttonColours = ['red', 'green', 'blue', 'yellow'];
var userClickedPattern = [];
// startGame
var started = false;
// Level
var level = 0;
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
})
// userClickHandeler
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userChosenColour);
});
// sequencing function
function nextSequence() {
    userClickedPattern = [];
    $("#level-title").text("level " + level);
    level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("pushed:"+gamePattern);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
// playing the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// animation
function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function(){
    removePressed(currentColour);
  }, 100);
}
function removePressed(currentColour){
  $(currentColour).removeClass("pressed");
}
// testing
$(".btn").click(function() {
  var currentId = "#"+$(this).attr("id");
  animatePress(currentId);
  console.log("clickGame:"+gamePattern);
  console.log("clickUser:"+userClickedPattern);
  answerChecker(userClickedPattern.length - 1);

});

function answerChecker(currentLevel) {

  console.log("answerCheckGame:"+gamePattern);
  console.log("answerCheckUser:"+userClickedPattern);
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("right");
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play();
    gameOver();
  }

}
function gameOver(){
  $("body").addClass("game-over");
  setTimeout(function(){
    remove();
  }, 200);

  $("h1").text("Game Over. Press any key to restart");
  $(document).keypress(function(){
    restart();
  })
}
function remove(){
  $("body").removeClass("game-over")
}
function restart(){

  location.reload(true);

}
