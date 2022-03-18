let friends = "";
let startingDiv = document.querySelector(".dificultyScreen");
let status = document.querySelector(".gameStatus");
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let friendsLeft = document.querySelector(".friendsLeft");
let flagsLeft = document.querySelector(".flagsLeft");
let totalSeconds = 0;
let boardButtons = "";
let numsArray = "";
let rows = "";
let columns = "";
let minelocation = [];

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
  // console.log(val)
  friends = val;
  // console.log(friends)
  if (friends === "") {
    alert("Please make a choice");
  } else if (friends === "5") {
    startingDiv.style.display = "none";
    buildGrid(4, 4);
    status.style.display = "flex";
    friendsLeft.innerText = "5";
    flagsLeft.innerText = "10";
    setInterval(setTime, 1000);
    // randomUniqueNumbers(10, 5);
    rows = 4;
    columns = 4;
    friends = 5;
    // console.log(nums);
    boardButtons = document.querySelectorAll(".gameBoard > button");
    // console.log(boardButtons)
    addFriends();
  } else if (friends === "10") {
    startingDiv.style.display = "none";
    buildGrid(9, 9);
    status.style.display = "flex";
    friendsLeft.innerText = "10";
    flagsLeft.innerText = "20";
    setInterval(setTime, 1000);
    // randomUniqueNumbers(81, 10);
    friends = 10;
    rows = 9;
    columns = 9;
    // console.log(nums)
    boardButtons = document.querySelectorAll(".gameBoard > button");
    // console.log(boardButtons)
    addFriends();
  } else if (friends === "30") {
    startingDiv.style.display = "none";
    buildGrid(12, 12);
    status.style.display = "flex";
    friendsLeft.innerText = "30";
    flagsLeft.innerText = "50";
    setInterval(setTime, 1000);
    // randomUniqueNumbers(144, 30);
    friends = 30;
    rows = 12;
    columns = 12;
    // console.log(nums)
    boardButtons = document.querySelectorAll(".gameBoard > button");
    // console.log(boardButtons)
    addFriends();
  }
}

const gameContainer = document.querySelector(".gameBoard");
console.log(gameContainer);
// function that created the grid based on user choice
function buildGrid(row, cols) {
  console.log(row);
  console.log(cols);
  gameContainer.style.setProperty("--grid-rows", rows);
  gameContainer.style.setProperty("--grid-cols", cols);
  for (i = 0; i < row * cols; i++) {
    let cell = document.createElement("button"); // create a button for each number
    // cell.innerText = i; //added number to button starting with #1
    cell.className = "grid-item";
      cell.id = (i); // added an id to each button
    gameContainer.append(cell); // appended to display
  }
}

// event listener on board div
document.querySelector(".gameBoard").addEventListener("click", handleClick);

function handleClick(e) {

  if (e.target.className === "grid-item mine"){
    e.target.className = "grid-item wrong-square"
    showAllWrong();
  } else {
    e.target.className = "grid-item valid-square"
  }
}

// let nums = "";
// // get random numbers to place the friends/bombs on
// const randomUniqueNumbers = (range, count) => {
//   nums = new Set();
//   while (nums.size < count) {
//     nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
//   }
//   return [...nums];
// };

function addFriends() {
  console.log(friends);
  let placed = 0;
  while (placed < friends) {
    let column = Math.floor(Math.random() * columns);
    let row = Math.floor(Math.random() * rows);
    let minespot = column * row;

    if (boardButtons[minespot].className != "grid-item mine") {
      console.log(boardButtons[minespot]);
      boardButtons[minespot].className = "grid-item mine";
      // minespot = boardButtons[minespot].innerText
      placed++;
      console.log(minespot)
      minelocation.push(minespot);
      
    }
  }
}

function showAllWrong() {
console.log(minelocation)
let minePlacement = ""
// console.log(e.target.id)
// console.log(boardButtons)
let checkButtons = Array.from(boardButtons)
// console.log(checkButtons)

minelocation.forEach(e => {
minePlacement = [e]

  for (let i = 0; i < checkButtons.length; i++) {
// console.log(minePlacement[0])
// console.log(checkButtons[i].id)

  // console.log(minelocation[i] === (checkButtons[i].id))
  if(minePlacement[0] == checkButtons[i].id){
    // document.querySelectorAll(".mine").style.backgroundColor = "red"
    let mineElems = document.querySelectorAll(".mine");
    for (let i = 0; i < mineElems.length; i++) {
        mineElems[i].style.backgroundColor = "red";
  
    }
  }
}
});
setTimeout(displayLoss, 1000);
};


function displayLoss(){
alert("you lose")
}

function displayWin(){
alert("you win")
}