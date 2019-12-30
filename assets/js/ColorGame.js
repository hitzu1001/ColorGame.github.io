var numOfSquares = 6;
var colors = [];
var pickedColor;

var bodyBackground = document.body.style.backgroundColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
// var easyBtn = document.getElementById("easyBtn");
// var hardBtn = document.getElementById("hardBtn");
var modeButtons = document.getElementsByClassName("mode");

init();

function init() {
  //mode buttons eventListener
  setupModeButtons();
  //squares eventListener
  setupSquares();
  refresh();
}

//mode buttons eventListener
function setupModeButtons() {
  for(var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6;
      refresh();
    }); 
  }
}

//squares eventListener
function setupSquares() {
  for(var i = 0; i < squares.length; i++) {
    //add click listener to squares
    squares[i].addEventListener("click", function(){
      //grab color of clicked square
      var clickedColor = this.style.backgroundColor;
      //compare color to pickedColor
      if(clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColors(clickedColor);
        h1.style.backgroundColor = clickedColor;
      } else {
        this.style.backgroundColor = bodyBackground;
        messageDisplay.textContent = "Try Again";
      }
    });
  }
}

// easyBtn.addEventListener("click", function() {
//   this.classList.add("selected");
//   hardBtn.classList.remove("selected");
//   numOfSquares = 3;
//   refresh(numOfSquares);
// });

// hardBtn.addEventListener("click", function() {
//   this.classList.add("selected");
//   easyBtn.classList.remove("selected");
//   numOfSquares = 6;
//   refresh(numOfSquares);
// });

resetButton.addEventListener("click", function() {
  refresh();
});

function changeColors(color) {
  for(var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  //make a array
  var arr = [];
  //add num random colors to array
  for(var i = 0; i < num; i++) {
    //get random color and push into arr
    arr.push(randomColor());
  }
  //return array
  return arr;
}

function randomColor() {
  //pick a "red"
  var r = Math.floor(Math.random() * 256);
  //pick a "green"
  var g = Math.floor(Math.random() * 256);
  //pick a "blue"
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function refresh() {
  //generate all new colors
  colors = generateRandomColors(numOfSquares);
  //change colors of squares
  for(var i = 0; i < squares.length; i++) {
    //add initial colors to squares
    if(colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    } 
  }
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  h1.style.backgroundColor = bodyBackground;
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colors";
}