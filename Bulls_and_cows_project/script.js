//numbers from comp
var firstNum, secondNum, thirdNum, forthNum = 0
//empty array for random numbers
var compArr = []
//user input
var userInputEl = document.getElementById ('userInput')
var userStr = ""
var userArr = []
//game vars
var numOfTrials = 0
var checkBtn = document.getElementById ('check')
//output
var showResult = document.getElementById ('output')
var winOrLoseEl = document.getElementById ('winOrLose')

//deactivate btn till check will be done
checkBtn.disabled = true

//creating random numbers
function randomizer (from, to) {
    return Math.floor(from + Math.random()*(to + 1 - from))
}

function randomNums () {
    //call randomizer for each num and compare with previous
    firstNum = randomizer (0, 9)

    secondNum = randomizer (0, 9)
    while (secondNum == firstNum) {
        secondNum = randomizer (0, 9) 
    }

    thirdNum = randomizer (0, 9)
    while (thirdNum == firstNum || thirdNum == secondNum) {
        thirdNum = randomizer (0, 9) 
    }

    forthNum = randomizer (0, 9)
    while (forthNum == firstNum || forthNum == secondNum || forthNum == thirdNum) {
        forthNum = randomizer (0, 9) 
    }

    compArr[0] = firstNum
    compArr[1] = secondNum
    compArr[2] = thirdNum
    compArr[3] = forthNum

    return compArr
}

randomNums ();
// console.log (compArr)

function check () {

    //transform user input string to user array with numbers
    var userStr = userInputEl.value
    userArr = userStr.split ("");
    for (var i = 0; i < userArr.length; i++) {
        userArr[i] = Number (userArr[i])
    }
    
    // console.log (userArr)

    //check if all numbers in input are different and there are four numbers
    if (userArr.length === 4 && userArr[0] !== userArr [1] && userArr[0] !== userArr [2] && userArr[0] !== userArr [3] && userArr[1] !== userArr [2] && userArr[1] !== userArr [3] && userArr[2] !== userArr [3]) {
        checkBtn.disabled = false 
    }

}

function game () {
    numOfTrials += 1
    
    var bulls = 0, cows = 0; 

        //count bulls and cows
        userArr.forEach(function(el, index) {
            
            if (userArr[index] == compArr[index]) {
                bulls += 1
            }
            
            else if (compArr.indexOf (userArr[index]) > -1) {
                cows += 1
            }
        });

        //show attempt, the amount of bulls and cows
        showResult.innerHTML += "It's your " + numOfTrials + " trial. Your row is " + userInputEl.value + ". You've got " + bulls + " bulls and " + cows + " cows <br>"
  
        //if the user won
        if (bulls === 4) {
            winOrLoseEl.innerText = "Congratulations! You are the winner! The row was " + compArr.join ('')
            restart ()
        } else if (numOfTrials >= 8) {
            //if the user lost
            winOrLoseEl.innerText = "You've used all your attempts and lost. Try again. The row was " + compArr.join ('')
            restart () 
        }
       
    //clear input
    userInputEl.value = ""
    checkBtn.disabled = true
    
}

function enter (event) {

    if (event.keyCode === 13) 
    checkBtn.click()

}

function restart () {
    //create reset btn
    resetBtn = document.createElement('resetBtn');
    resetBtn.id = "restartBtn" 
    resetBtn.textContent = 'Start a new game'; 
    //insert element in the end
    document.getElementById('theBiggest').appendChild(resetBtn); 
    resetBtn.addEventListener('click', resetGame); 
}

function resetGame () {
    showResult.innerText = ""
    winOrLoseEl.innerText = ""
    resetBtn.parentNode.removeChild(resetBtn)
    randomNums ()
    // console.log (compArr)
    numOfTrials = 0
}

userInputEl.addEventListener ('input', check)
userInputEl.addEventListener ('keyup', enter)
checkBtn.addEventListener ('click', game)

