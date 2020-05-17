
//Find blocks function-- 
//determines how many study blocks, time remaining
function findBlocks(ptime){
    if(ptime <= 120){
        //how many 30 min blocks (25study/5break)
        blocks = Math.floor((ptime / 30));
        //set block element in html
        blockNumber.textContent = blocks; 
        fourtyblocks = 0  
    }
    else{
        timePast120 = ptime - 120;
        over120 = true;
        //always 4 blocks
        // how many (25/15)
        fourtyblocks = Math.floor((timePast120 / 40));
        blocks = 4 
        blockNumber.textContent = blocks + fourtyblocks
    }
}

//Start Timer function
function startTimer(duration, display) {
    //duration of timer
    var timer = duration, minutes, seconds;
    //run the timer every second
    var runningTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //set display in html
        display.textContent = minutes + ":" + seconds;
        //countdown
        --timer

        //Check when time is done, if it's time for break or study
        //study timer
        if (timer < 0 && breakTime == true) {
            //stop timer
            clearInterval(runningTimer)
            //show break button
            document.getElementById("startBreak").style.visibility = "visible";

        }
        //break timer
        else if (timer < 0 && breakTime == false) {
            clearInterval(runningTimer)
            document.getElementById("startStudy").style.visibility = "visible";

        }
    }, 1000);   
}

function checkTimer(){
    
    if (over120 == false) {
        //update block number
        blockNumber.textContent = blocks;
        if(blocks > 0){
            //run timer for 5 mins (Break)
            timerLength = 5 * 60
            startTimer(timerLength, display);
            --blocks
        }
        else{
            alert("All done!")
        }
    }
    else{
        //update block number
        blockNumber.textContent = blocks + fourtyblocks
        if(blocks > 0){
            //run timer for 5 mins (Break)
            timerLength = 5 * 60
            startTimer(timerLength, display);
            --blocks
        }
        else if (fourtyblocks > 0){
            //breaktime for 15
            timerLength = 15 * 60  
            startTimer(timerLength, display);  
            --fourtyblocks 
        }
        else{
            alert("All done!")
        }
    }
}


$(document).ready(function(){   
    //locate blockNumber for html
    blockNumber = document.querySelector('#blocksRemaining');
    breakStudy = document.querySelector('#breakstudy');
    //breaktime variable to switch b/w the two
    breakTime = false;
    over120 = false;

    //Start Pomodoro- 
    //Finds how much time to study
    //Starts running the function
    $("#startPomodoro").click( function() {
        //Find study time
        var ptime = document.getElementById("ptime").value
        if (ptime < 30){
            alert("Must be at least 30 minutes")
        }
        else{
            findBlocks(ptime)
            //Show start button
            document.getElementById("startStudy").style.visibility = "visible";
            //hide input
            var currentForm = document.querySelector('.pomodoroForm');
            var pomodoroTitle = document.createElement('div');
            pomodoroTitle.innerHTML= '<h1 id=pomodoroTitle>Pomodoro Timer<h1>';
            currentForm.parentNode.replaceChild(pomodoroTitle, currentForm);
            // document.getElementById("pomodoroForm").style.visibility = "hidden";
            const floatbox = document.getElementById("float-box");
            floatbox.classList.toggle("expanded");
            document.getElementById("blocksLocation").style.visibility = "visible";
            document.getElementById("timerLocation").style.visibility = "visible";
        }
    });


    //Start studying button
    $("#startStudy").click( function() {
        //set breaktime to true (after studying time for break)
        breakTime = true;
        display = document.querySelector('#time');
        breakStudy.textContent = "Work"; 
        
        //set timer length- will always be 25 min sessions
        timerLength = 25 * 60

        //run start timer
        startTimer(timerLength, display);

        //Hide study button
        document.getElementById("startStudy").style.visibility = "hidden";

        

        
        
    });


    $("#startBreak").click( function() {
        //breaktime false since just took break
        breakTime = false;
        breakStudy.textContent = "Break"; 
        
        //hide self no longer on break
        document.getElementById("startBreak").style.visibility = "hidden";
        
        
        
        checkTimer();
    });
    
    
    
    // set focus on initial load
    $("#ptime").focus();
});