let friends = ""  //how many friend were chosen
let startingDiv = document.querySelector(".dificultyScreen") 
let status = document.querySelector(".gameStatus") 
let minutesLabel = document.querySelector(".minutes");
let secondsLabel = document.querySelector(".seconds");
let friendsLeft = document.querySelector(".friendsLeft");
let flagsLeft = document.querySelector(".flagsLeft");
let totalSeconds = 0; //variable to hold the seconds


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