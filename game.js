var gameStarted = false;
var gameOver = false;
var gamePattern = [];
var userPattern = [];
var levelCount = 0;
var buttons = ["green","red","yellow","blue"]

//Event listeners
$(document).on("keypress", (e) => {

  if (!gameStarted || gameOver === true) {
    startGame();
  }
});

$(".btn").on("click", (e) => {

  if (gameStarted) {

    var id = e.target.id;

    playSound(id);
    userPattern.push(id);
    validatePattern(id);
  }
});

function startGame() {

  gamePattern = [];
  levelCount = 0;
  gameStarted = true;
  gameOver = false;

  nextLevel();
  nextSeq();
}

//Functions
function playSound(id) {

  buttonAnimation(id);
  var sound = new Audio("sounds/" + id + ".mp3");
  sound.play();  
}

function validatePattern() {

  if (userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {

    if (userPattern.length - 1 === gamePattern.length - 1) {

      nextLevel();

      setTimeout(() => {
        nextSeq();
      }, 1500);
       
    } 

  } else {
    setGameOver();
  }
}

function nextLevel() {

  userPattern = [];
  levelCount++;

  $("#level-title").text("Level " + levelCount);
}


function nextSeq() {

  let nextSeq = Math.floor(Math.random() * 4);
  let randomButton = buttons[nextSeq];

  gamePattern.push(randomButton);
  playSound(randomButton);
}

function buttonAnimation(id) {

  $("#" + id).addClass("pressed");

  setTimeout(() => {
    $("#" + id).removeClass("pressed");
  }, 100);
}

function setGameOver() {

  //Game over Sound
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();

  //Game over effect
  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);

  //Reset Game
  $("#level-title").text("Game Over, Press Any Key to Restart");
  gameOver = true;
}