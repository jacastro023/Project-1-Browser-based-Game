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