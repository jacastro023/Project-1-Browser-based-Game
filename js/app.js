let friends = "";
let startingDiv = document.querySelector(".dificultyScreen");
let status = document.querySelector(".gameStatus");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let friendsLeft = document.querySelector(".friendsLeft");
let flagsLeft = document.querySelector(".flagsLeft");
let resetButton = document.querySelector(".restartButton")
let resetButtonWin = document.querySelector(".restartButtonWin")
let resetButtonLose = document.querySelector(".restartButtonLose")
let gameGrid = document.querySelector(".gameBoard")
let cannon = document.querySelector(".cannonDisplay")
let win = document.querySelector(".winnerScreen")
let lose = document.querySelector(".loserScreen")
let gameDisplay = document.querySelector(".gameDisplay")
let WonInSeconds = document.querySelector(".secondsToWin")
let totalSeconds = 0;
let boardButtons = "";
let numsArray = "";
let rows = "";
let columns = "";
let minelocation = [];
let squaresLeft = "";
let flags = "";

// setting timer to display seconds and minutes
function setTime() {
  ++totalSeconds;
  secondsLabel.innerText = timer(totalSeconds % 60);
  minutesLabel.innerText = timer(parseInt(totalSeconds / 60));
}

function timer(val) {
  let valString = val + "";
  if (valString.length < 2) {
    //is timer is less than 2 digits add a 0 to the begginning
    return "0" + valString;
  } else {
    return valString; // else just return the value of seconds
  }
}

// getting the selected choice from the user
function inputValue() {
  let radios = document.getElementsByName("choice");
  let val = "";
  for (i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      val = radios[i].value;
      break;
    }
  }
  friends = val;
  if (friends === "") {
    alert("Please make a choice");
  } else if (friends === "5") {
    // giving variables values and hiding and sisplaying divs
    startingDiv.style.display = "none";
    buildGrid(4, 4);
    flags = 5;
    status.style.display = "flex";
    friendsLeft.innerText = "5";
    flagsLeft.innerText = flags;
    setInterval(setTime, 1000);
    rows = 4;
    columns = 4;
    friends = 5;
    squaresLeft = 16;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex"
    cannon.style.display = "block"
  } else if (friends === "10") {
    // giving variables values and hiding and sisplaying divs
    startingDiv.style.display = "none";
    buildGrid(9, 9);
    flags = 10;
    status.style.display = "flex";
    friendsLeft.innerText = "10";
    flagsLeft.innerText = flags;
    setInterval(setTime, 1000);
    friends = 10;
    rows = 9;
    columns = 9;
    squaresLeft = 81;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex"
    cannon.style.display = "block"
  } else if (friends === "30") {
    // giving variables values and hiding and sisplaying divs
    startingDiv.style.display = "none";
    buildGrid(12, 12);
    flags = 30;
    status.style.display = "flex";
    friendsLeft.innerText = "30";
    flagsLeft.innerText = flags;
    setInterval(setTime, 1000);
    friends = 30;
    rows = 12;
    columns = 12;
    squaresLeft = 144;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex"
    cannon.style.display = "block"
  }
}

const gameContainer = document.querySelector(".gameBoard");
// function that created the grid based on user choice
function buildGrid(row, cols) {
  gameContainer.style.setProperty("--grid-rows", rows);
  gameContainer.style.setProperty("--grid-cols", cols);
  for (i = 0; i < row * cols; i++) {
    let cell = document.createElement("button"); // create a button for each number
    cell.className = "grid-item";
      cell.id = (i); // added an id to each button
    gameContainer.append(cell); // appended to display
  }
}

// event listener on board div
document.querySelector(".gameBoard").addEventListener("click", handleClick);

const noContext = document.querySelector('.gameBoard');

// preventing right click menu from appearing and adding the flags on right click instead
noContext.addEventListener('contextmenu', e => {
  e.preventDefault();
    if(e.target.innerText == "🚩"){
      e.target.innerText = ""
      ++flags
      flagsLeft.innerText = flags; // update display of flags
    } else if (e.target.innerText == "" && flags > 0){ // while flags is greater than 0 add a flag to square and remove one from total flags
      e.target.innerText = "🚩"
      --flags
      flagsLeft.innerText = flags; // update display of flags
    }

});

function handleClick(e) {
  let audio = document.getElementById("audio");
        audio.play();
  if (e.target.className === "grid-item mine"){
    // if square with a bomb is clicked give it the wrong-square class and call the function to display the rest of the wrong ones
    e.target.className = "grid-item wrong-square"
    showAllWrong();
  } else {
    // if square clicked is correct, update the class and lower the total amount of squares by one
    e.target.className = "grid-item valid-square"
    console.log(e.target)
    -- squaresLeft
    console.log(squaresLeft)
    if(squaresLeft == friends){ // check if only the bombs are left
      clearTimeout(); 
      WonInSeconds.innerText = `You Won in ${minutesLabel.innerText}:${secondsLabel.innerText}!`
      setTimeout(displayWin, 1000); // after a second display the winner screen

    }
  }
}

function addFriends() {
  let placed = 0;
  while (placed < friends) {
    // get random values for the row and column to place the bomb
    let column = Math.floor(Math.random() * columns);
    let row = Math.floor(Math.random() * rows);
    let minespot = column * row;
 // using the spots from above place a bomb on it if there isnt one there and update how many have been placed
    if (boardButtons[minespot].className != "grid-item mine") {
      console.log(boardButtons[minespot]);
      boardButtons[minespot].className = "grid-item mine";
      placed++;
      minelocation.push(minespot);
      
    }
  }
}

// display all the wrong spots
function showAllWrong() {
console.log(minelocation)
let minePlacement = ""
let checkButtons = Array.from(boardButtons)

minelocation.forEach(e => {
minePlacement = [e]

  for (let i = 0; i < checkButtons.length; i++) {
  if(minePlacement[0] == checkButtons[i].id){
    let mineElems = document.querySelectorAll(".mine");
    for (let i = 0; i < mineElems.length; i++) {
        mineElems[i].style.backgroundColor = "red";
  
    }
  }
}
});
setTimeout(displayLoss, 1000); // after a second display the loser screen
};

// function to display loser screen
function displayLoss(){
  resetButtonLose.style.display = "flex"
  lose.style.display = "block"
}

// function to display winner screen
function displayWin(){
  resetButtonWin.style.display = "flex"
  win.style.display = "block"
}
