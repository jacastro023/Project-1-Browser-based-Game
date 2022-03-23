let friends = "";
let startingDiv = document.querySelector(".dificultyScreen");
let status = document.querySelector(".gameStatus");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let friendsLeft = document.querySelector(".friendsLeft");
let flagsLeft = document.querySelector(".flagsLeft");
let resetButton = document.querySelector(".restartButton");
let resetButtonWin = document.querySelector(".restartButtonWin");
let resetButtonLose = document.querySelector(".restartButtonLose");
let gameGrid = document.querySelector(".gameBoard");
let cannon = document.querySelector(".cannonDisplay");
let win = document.querySelector(".winnerScreen");
let lose = document.querySelector(".loserScreen");
let gameDisplay = document.querySelector(".gameDisplay");
let WonInSeconds = document.querySelector(".secondsToWin");
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

function stopTimer() {
  clearInterval(setTime);
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
    let hourglass = setInterval(setTime, 1000);
    rows = 4;
    columns = 4;
    friends = 5;
    squaresLeft = 16;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex";
    cannon.style.display = "block";
  } else if (friends === "10") {
    // giving variables values and hiding and sisplaying divs
    startingDiv.style.display = "none";
    buildGrid(9, 9);
    flags = 10;
    status.style.display = "flex";
    friendsLeft.innerText = "10";
    flagsLeft.innerText = flags;
    let hourglass = setInterval(setTime, 1000);
    friends = 10;
    rows = 9;
    columns = 9;
    squaresLeft = 81;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex";
    cannon.style.display = "block";
  } else if (friends === "30") {
    // giving variables values and hiding and sisplaying divs
    startingDiv.style.display = "none";
    buildGrid(12, 12);
    flags = 30;
    status.style.display = "flex";
    friendsLeft.innerText = "30";
    flagsLeft.innerText = flags;
    let hourglass = setInterval(setTime, 1000);
    friends = 30;
    rows = 12;
    columns = 12;
    squaresLeft = 144;
    boardButtons = document.querySelectorAll(".gameBoard > button");
    addFriends();
    resetButton.style.display = "flex";
    cannon.style.display = "block";
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
    cell.id = i; // added an id to each button
    gameContainer.append(cell); // appended to display
  }
}

// event listener on board div
document.querySelector(".gameBoard").addEventListener("click", handleClick);

const noContext = document.querySelector(".gameBoard");

// preventing right click menu from appearing and adding the flags on right click instead
noContext.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.innerText == "🚩") {
    e.target.innerText = "";
    ++flags;
    flagsLeft.innerText = flags; // update display of flags
  } else if (
    (e.target.innerText == "" &&
      flags > 0 &&
      e.target.className === "grid-item") ||
    e.target.className === "grid-item mine"
  ) {
    // while flags is greater than 0 add a flag to square and remove one from total flags
    e.target.innerText = "🚩";
    --flags;
    flagsLeft.innerText = flags; // update display of flags
  } else if (e.target.className === "grid-item valid-square") {
    alert("Cant flag a checked square");
  }
});

function handleClick(newSquare) {
  let audio = document.getElementById("audio");
  // console.log(newSquare.target.id);
  // console.log(e.target.id)
  // let currentId = e.target.id
  if (newSquare.target.className === "grid-item mine") {
    audio.play();
    // if square with a bomb is clicked give it the wrong-square class and call the function to display the rest of the wrong ones
    newSquare.target.className = "grid-item wrong-square";
    showAllWrong();
  } else {
    if (newSquare.target.className === "grid-item valid-square") {
      alert("choose a different square");
    } else {
      audio.play();
      // if square clicked is correct, update the class and lower the total amount of squares by one
      newSquare.target.className = "grid-item valid-square";
      // console.log(e.target.getAttribute("data"))
      newSquare.target.innerText = newSquare.target.getAttribute("data");
      if (newSquare.target.getAttribute("data") == 0) {
        newSquare.target.innerText = "";
        // console.log(e.target.id)
        // maybe add recursion here
      }
      // console.log(e.target)
      --squaresLeft;
      if (rows == 4) {
        checkNeighbor1(newSquare.target.id);
      } else if (rows == 9) {
        checkNeighbor2(newSquare.target.id);
      } else if (rows == 12) {
        checkNeighbor3(newSquare.target.id);
      }
      // console.log(squaresLeft);
      if (squaresLeft == friends) {
        // check if only the bombs are left
        // clearInterval(setTime);
        stopTimer();
        WonInSeconds.innerText = `You Won in ${minutesLabel.innerText}:${secondsLabel.innerText}!`;
        setTimeout(displayWin, 1000); // after a second display the winner screen
      }
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
      // console.log(boardButtons[minespot]);
      boardButtons[minespot].className = "grid-item mine";
      placed++;
      minelocation.push(minespot);
    }
  }
  console.log(
    minelocation.sort(function (a, b) {
      return a - b;
    })
  );

  // finding adjacent squares
  //loop through all of the gameboard depending on board size
  if (rows == 4) {
    for (let i = 0; i < 16; i++) {
      let total = 0;
      // how to tell if its the edge
      const leftEdge = i % 4 === 0;
      const rightEdge = i % 4 === 3;

      if (boardButtons[i].class != "grid-item mine") {
        if (
          i > 0 &&
          !leftEdge &&
          boardButtons[i - 1].classList.contains("mine")
        )
          total++; // checks one square behind to see if theres a bomb
        if (
          i > 3 &&
          !rightEdge &&
          boardButtons[i - 3].classList.contains("mine")
        )
          total++; // check square one up to the right for bomb
        if (i >= 4 && boardButtons[i - 4].classList.contains("mine")) total++; // starting at index 4 check the one above for a bomb
        if (
          i >= 5 &&
          !leftEdge &&
          boardButtons[i - 5].classList.contains("mine")
        )
          total++; //starting at second row check one up to the left for bomb
        if (
          i < 15 &&
          !rightEdge &&
          boardButtons[i + 1].classList.contains("mine")
        )
          total++; // check square to the right
        if (
          i < 12 &&
          !leftEdge &&
          boardButtons[i + 3].classList.contains("mine")
        )
          total++; // starting second to last row check one down to the left for bomb
        if (
          i <= 10 &&
          !rightEdge &&
          boardButtons[i + 5].classList.contains("mine")
        )
          total++; // starting second to last row and if not a right edge check for bomb one down to the right for bomb
        if (i <= 11 && boardButtons[i + 4].classList.contains("mine")) total++; // check square directly below starting second to last row
        boardButtons[i].setAttribute("data", total);
        // console.log(boardButtons[i]);
      }
    }
  } else if (rows == 9) {
    for (let i = 0; i < 81; i++) {
      let total = 0;
      // how to tell if its the edge
      const leftEdge = i % 9 === 0;
      const rightEdge = i % 9 === 8;

      if (boardButtons[i].class != "grid-item mine") {
        if (
          i > 0 &&
          !leftEdge &&
          boardButtons[i - 1].classList.contains("mine")
        )
          total++; // checks one square behind to see if theres a bomb
        if (
          i > 8 &&
          !rightEdge &&
          boardButtons[i - 8].classList.contains("mine")
        )
          total++; // check square one up to the right for bomb
        if (i >= 10 && boardButtons[i - 9].classList.contains("mine")) total++; // starting at 10 check the one above for a bomb
        if (
          i >= 11 &&
          !leftEdge &&
          boardButtons[i - 10].classList.contains("mine")
        )
          total++; //starting at second row check one up to the left for bomb
        if (
          i < 80 &&
          !rightEdge &&
          boardButtons[i + 1].classList.contains("mine")
        )
          total++; // check square to the right
        if (
          i < 72 &&
          !leftEdge &&
          boardButtons[i + 8].classList.contains("mine")
        )
          total++; // starting second to last row check one down to the left for bomb
        if (
          i <= 70 &&
          !rightEdge &&
          boardButtons[i + 10].classList.contains("mine")
        )
          total++; // starting second to last row and if not a right edge check for bomb one down to the right for bomb
        if (i <= 71 && boardButtons[i + 9].classList.contains("mine")) total++; // check square directly below starting second to last row
        boardButtons[i].setAttribute("data", total);
        // console.log(boardButtons[i]);
      }
    }
  } else if (rows == 12) {
    for (let i = 0; i < 144; i++) {
      let total = 0;
      // how to tell if its the edge
      const leftEdge = i % 12 === 0;
      const rightEdge = i % 12 === 11;

      if (boardButtons[i].class != "grid-item mine") {
        if (
          i > 0 &&
          !leftEdge &&
          boardButtons[i - 1].classList.contains("mine")
        )
          total++; // checks one square behind to see if theres a bomb
        if (
          i > 11 &&
          !rightEdge &&
          boardButtons[i - 11].classList.contains("mine")
        )
          total++; // check square one up to the right for bomb
        if (i >= 13 && boardButtons[i - 12].classList.contains("mine")) total++; // starting at 13 check the one above for a bomb
        if (
          i >= 14 &&
          !leftEdge &&
          boardButtons[i - 13].classList.contains("mine")
        )
          total++; //starting at second row check one up to the left for bomb
        if (
          i < 143 &&
          !rightEdge &&
          boardButtons[i + 1].classList.contains("mine")
        )
          total++; // check square to the right
        if (
          i < 132 &&
          !leftEdge &&
          boardButtons[i + 11].classList.contains("mine")
        )
          total++; // starting second to last row check one down to the left for bomb
        if (
          i <= 130 &&
          !rightEdge &&
          boardButtons[i + 13].classList.contains("mine")
        )
          total++; // starting second to last row and if not a right edge check for bomb one down to the right for bomb
        if (i <= 131 && boardButtons[i + 12].classList.contains("mine"))
          total++; // check square directly below starting second to last row
        boardButtons[i].setAttribute("data", total);
        console.log(boardButtons[i]);
      }
    }
  }
}

// display all the wrong spots
function showAllWrong() {
  // console.log(minelocation)
  let minePlacement = "";
  let checkButtons = Array.from(boardButtons);

  minelocation.forEach((e) => {
    minePlacement = [e];

    for (let i = 0; i < checkButtons.length; i++) {
      if (minePlacement[0] == checkButtons[i].id) {
        let mineElems = document.querySelectorAll(".mine");
        for (let i = 0; i < mineElems.length; i++) {
          mineElems[i].style.backgroundColor = "red";
        }
      }
    }
  });
  setTimeout(displayLoss, 1000); // after a second display the loser screen
}

// function to display loser screen
function displayLoss() {
  resetButtonLose.style.display = "flex";
  lose.style.display = "block";
}

// function to display winner screen
function displayWin() {
  resetButtonWin.style.display = "flex";
  win.style.display = "block";
}

// use recursion function to open op more than one square is safe
// use same logic as adding adjacent mine numbers to the buttons
function checkNeighbor1(currentId) {
  // same as checking for adjacent mines, declare if it is a right or left edge
  const leftEdge = currentId % 4 === 0;
  const rightEdge = currentId % 4 === 3;
  // console.log(document.getElementById(currentId).getAttribute("data"));
  // if (document.getElementById(currentId).className === "grid-item") {
  if (document.getElementById(currentId).getAttribute("data") === "0") {
    if (currentId > 0 && !leftEdge) {
      const newId = parseInt(currentId) - 1; // to check the square right before it remove 1 from the id
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 3 && !rightEdge) {
      const newId = parseInt(currentId) - 3; // checking square one up to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 3) {
      const newId = parseInt(currentId) - 4; // checks square right on top
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 5 && !leftEdge) {
      const newId = parseInt(currentId) - 5; // checks square one up the the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 15 && !rightEdge) {
      const newId = parseInt(currentId) + 1; // make the id an intiger and add 1 to check square right of it
      // console.log(newId);
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 12 && !leftEdge) {
      const newId = parseInt(currentId) + 3; // check square one down to the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 11 && !rightEdge) {
      const newId = parseInt(currentId) + 5; // check square one down to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 12) {
      const newId = parseInt(currentId) + 4; // check square right below it
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
  } else if (document.getElementById(currentId).getAttribute("data") != "0") {
    document.getElementById(currentId).innerText = document
      .getElementById(currentId)
      .getAttribute("data");
  }
  // }
}

function checkNeighbor2(currentId) {
  // same as checking for adjacent mines, declare if it is a right or left edge
  const leftEdge = currentId % 9 === 0;
  const rightEdge = currentId % 9 === 8;
  // console.log(document.getElementById(currentId).getAttribute("data"));
  // if (document.getElementById(currentId).className === "grid-item") {
  if (document.getElementById(currentId).getAttribute("data") === "0") {
    if (currentId > 0 && !leftEdge) {
      const newId = parseInt(currentId) - 1; // to check the square right before it remove 1 from the id
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 8 && !rightEdge) {
      const newId = parseInt(currentId) - 8; // checking square one up to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 8) {
      const newId = parseInt(currentId) - 9; // checks square right on top
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 8 && !leftEdge) {
      const newId = parseInt(currentId) - 9; // checks square one up the the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 80 && !rightEdge) {
      const newId = parseInt(currentId) + 1; // make the id an intiger and add 1 to check square right of it
      // console.log(newId);
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 72 && !leftEdge) {
      const newId = parseInt(currentId) + 8; // check square one down to the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 71 && !rightEdge) {
      const newId = parseInt(currentId) + 10; // check square one down to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 72) {
      const newId = parseInt(currentId) + 9; // check square right below it
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
  } else if (document.getElementById(currentId).getAttribute("data") != "0") {
    document.getElementById(currentId).innerText = document
      .getElementById(currentId)
      .getAttribute("data");
  }
}

function checkNeighbor3(currentId) {
  // same as checking for adjacent mines, declare if it is a right or left edge
  const leftEdge = currentId % 12 === 0;
  const rightEdge = currentId % 12 === 11;

  if (document.getElementById(currentId).getAttribute("data") === "0") {
    if (currentId > 0 && !leftEdge) {
      const newId = parseInt(currentId) - 1; // to check the square right before it, remove 1 from the id
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 11 && !rightEdge) {
      const newId = parseInt(currentId) - 11; // checking square one up to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 11) {
      const newId = parseInt(currentId) - 12; // checks square right on top
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId > 11 && !leftEdge) {
      const newId = parseInt(currentId) - 13; // checks square one up the the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 143 && !rightEdge) {
      const newId = parseInt(currentId) + 1; // make the id an intiger and add 1 to check square right of it
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 132 && !leftEdge) {
      const newId = parseInt(currentId) + 11; // check square one down to the left
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 131 && !rightEdge) {
      const newId = parseInt(currentId) + 13; // check square one down to the right
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
    if (currentId < 132) {
      const newId = parseInt(currentId) + 12; // check square right below it
      const newSquare = document.getElementById(newId);
      handleClicks(newSquare);
    }
  } else if (document.getElementById(currentId).getAttribute("data") != "0") {
    document.getElementById(currentId).innerText = document
      .getElementById(currentId)
      .getAttribute("data");
  }
}

function handleClicks(newSquare) {
  // console.log("this is new: " + newSquare.id);
  if (newSquare.className === "grid-item") {
    // console.log(squaresLeft)
    if (newSquare.getAttribute("data") === "0") {
      --squaresLeft;
      console.log(newSquare.id);
      newSquare.className = "grid-item valid-square";
      checkNeighbor1(newSquare.id);
    } else {
      --squaresLeft;
      newSquare.className = "grid-item valid-square";
      document.getElementById(newSquare.id).innerText = document
        .getElementById(newSquare.id)
        .getAttribute("data");
    }
  }
}
