let friends = ""  //how many friend were chosen
let startingDiv = document.querySelector(".dificultyScreen") 
let status = document.querySelector(".gameStatus") 
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let friendsLeft = document.querySelector(".friendsLeft");
let flagsLeft = document.querySelector(".flagsLeft");
let totalSeconds = 0; //variable to hold the seconds
let rows = "" 
let columns = ""
let boardButtons = ""
let numsArray = ""


// setting timer to display seconds and minutes
function setTime()
{
    ++totalSeconds;
    secondsLabel.innerText = timer(totalSeconds%60);
    minutesLabel.innerText = timer(parseInt(totalSeconds/60));
}

function timer(val)
{
    let valString = val + "";
    if(valString.length < 2)  //is timer is less than 2 digits add a 0 to the begginning
    {
        return "0" + valString;
    }
    else
    {
        return valString; // else just return the value of seconds
    }
}

// getting the selected choice from the user
function inputValue() {
    let radios = document.getElementsByName('choice');
    let val= "";
    for (i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
           val = radios[i].value; 
           break;
         }
    }
// console.log(val)
friends = val
// console.log(friends)
    if(friends === ""){
        alert("Please make a choice")
    } else if(friends === "5"){
        startingDiv.style.display = "none";
        buildGrid(4, 4);
        status.style.display = "flex";
        friendsLeft.innerText = "5";
        flagsLeft.innerText = "10";
        setInterval(setTime, 1000);
        randomUniqueNumbers(10, 5);
        rows = 4;
        columns = 4;
        friends = 5;
        console.log(nums)
        boardButtons = document.querySelectorAll(".gameBoard > button");
        // console.log(boardButtons)
        addFriends();
    } else if(friends === "10"){
        startingDiv.style.display = "none";
        buildGrid(9, 9);
        status.style.display = "flex";
        friendsLeft.innerText = "10";
        flagsLeft.innerText = "20";
        setInterval(setTime, 1000);
        randomUniqueNumbers(81, 10);
        friends = 10;
        rows = 9;
        columns = 9;
        // console.log(nums)
        boardButtons = document.querySelectorAll(".gameBoard > button");
        // console.log(boardButtons)
        addFriends();
    } else if(friends === "30"){
        startingDiv.style.display = "none";
        buildGrid(12, 12);
        status.style.display = "flex";
        friendsLeft.innerText = "30";
        flagsLeft.innerText = "50";
        setInterval(setTime, 1000);
        randomUniqueNumbers(144, 30);
        friends = 30;
        rows = 12;
        columns = 12;
        // console.log(nums)
        boardButtons = document.querySelectorAll(".gameBoard > button");
        // console.log(boardButtons)
        addFriends();
    }

  };

const gameContainer = document.querySelector(".gameBoard");
//   console.log(gameContainer)
// function that created the grid based on user choice
  function buildGrid(row, cols) {
      console.log(row)
      console.log(cols)
      gameContainer.style.setProperty('--grid-rows', rows);
      gameContainer.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (row * cols); i++) {
      let cell = document.createElement("button"); // create a button for each number
      cell.innerText = (i + 1); //added number to button starting with #1
      cell.className = "grid-item"
    //   cell.id = (i + 1); // added an id to each button
      gameContainer.append(cell) // appended to display
    };
  };

  // event listener on board div
  document.querySelector('.gameBoard').addEventListener('click', handleClick);

  function handleClick(e){

  }