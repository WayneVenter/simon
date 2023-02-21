var gameStarted = false;
var gameOver = false;
var gamePattern = [];
var userPattern = [];
var levelCount = 0;
var buttons = ["green","red","yellow","blue"]
var seqInProgress = false;

//Event listeners
$("#level-title").on("click", (e) => {

  if (!gameStarted || gameOver === true) {
    startGame();
  }
});

$(".btn").on("click", (e) => {

  if (gameStarted && !seqInProgress) {

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
  setTimeout(nextSeq, 500);
}

//Functions
function playSound(id) {

  var sound = new Audio("sounds/" + id + ".mp3");
  sound.play(); 
  
  buttonAnimation(id);
}

function validatePattern() {

  if (userPattern[userPattern.length - 1] === gamePattern[userPattern.length - 1]) {

    if (userPattern.length - 1 === gamePattern.length - 1) {

      nextLevel();
      setTimeout(playSeq, 500);
    } 

  } else {
    setGameOver();
  }
}

function nextLevel() {

  userPattern = [];
  levelCount++;

  $("#level-title").text("Go!");
  $("#level-circle").text(levelCount);
}


function nextSeq() {

  let nextSeq = Math.floor(Math.random() * 4);
  let randomButton = buttons[nextSeq];

  gamePattern.push(randomButton);
  playSound(randomButton);    
}

function buttonAnimation(id) {

  let pressClass = "btn-" + id + "-pressed";

  $("#" + id).addClass(pressClass);

  setTimeout(() => {
    $("#" + id).removeClass(pressClass);
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
  $("#level-title").text("Game Over, Press here to Restart");
  gameOver = true;
}

async function playSeq() {

  if(!gameOver){


    seqInProgress = true;
    $("#level-title").text("Next sequence");

    for (var k = 0; k < gamePattern.length; k++) {
  
      var id  = gamePattern[k];
      await callPlaySound(playSound, id, 1000);
    }
  
    await callNextSeq(nextSeq, 1000);
  
    seqInProgress = false
    $("#level-title").text("Go!");

  }
}

async function callPlaySound(func ,id, dur) {

  await wait(dur);
  func(id);
}

async function callNextSeq(func, dur) {

  await wait(dur);
  func();
}

// Simply forces the async operation to wait for a set duration
function wait(duration){
  return new Promise(resolve => setTimeout(resolve, duration));
}


 
