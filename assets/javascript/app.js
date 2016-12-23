//GLOBAL VARIABLES..
var seconds = 20;
var showImage;
var timer;
var lastQuestionUnanswered = false;
var counter;
var currentCounter;
var count= 0, right = 0, wrong = 0, unanswered = 0;

//ARRAY OF QUESTIONS..
var questionsList = [
{	question: "Which Actor's voice has been heard in every feature-length Pixar film?", 
	choices: ["Robin Williams", "Albert Brooks", "John Ratzenburger","Tom Hanks"],
 	answer: 2,
    image: "./assets/images/pixar.gif" 
}, {
	question: "What is Remy the rat's special gift?", 
	choices: ["Sharp-eyeshight", "A keen sense of smell", "Above average hearing","He can talk to humans"],
 	answer: 1,
    image: "./assets/images/remy.gif" 
}, {
	question: "Including Up, how many feature-length films has Pixar completed to date?", 
	choices: ["6", "10","20", "17"],
 	answer: 3,
    image: "./assets/images/party.gif" 
}, {
	question: "What's the name of the 'big race' in Cars?", 
	choices: ["The Piston Cup", "Indy 500",  "North American Circuit","150 Yard Dash"],
 	answer: 0,
    image: "./assets/images/cars.gif" 
}, {
	question: "What was Jack-Jack's superpower in The Incredibles?", 
	choices: ["He doesnt have any powers", "Shape-shifting", "Flight", "Heat Vision"],
 	answer: 1,
    image: "./assets/images/jack.gif" 
}, {
	question: "What does everyone call James P. Sullivan?", 
	choices: ["Mr. Incredible", "Sir","Jim", "Sully"], 
 	answer: 3,
    image: "./assets/images/sully.gif" 
} ]

var sounds = {
 gameOver: {
     sound: new Howl({
         urls: ['./assets/sounds/Applause.mp3']
     })
 }, 
 gameOverBoo: {
    sound: new Howl({
        urls: ['./assets/sounds/Boo.mp3']
    })
 }
};

window.onload = function() {
    $(".non-header").hide();
    $(".resultArea").hide();
    $(".start").click(startGame); 
        $(".non-header").show();
        $(".option").on("click", function() {
        stop();
        answerChecking(this);
        })  
         
    $(".restartGame-btn").on("click", function() {
        $(".resultArea").hide();
        location.reload();    
    })
}

function startGame() {
    $(".start").hide();
    $(".resultArea").hide();
    populate();
    showImage = setInterval(populate, 20000);
    counter = setInterval(timer, 1000);
}

function stop() {
	clearInterval(counter);
    clearInterval(showImage);
    setTimeout(populate, 1000);
}

function nextQuestion() {
    counter = setInterval(timer, 1000);
}

function answerChecking(event) {
	currentCounter = count - 1;
    if (event.id == questionsList[currentCounter].answer) {
        $(event).css("background-color", "#abe575");
        right++;
    } else {
        $(event).css("background-color", "#f26d78");
        $("#" + questionsList[currentCounter].answer).css("background-color", "#abe575");
        wrong++;
    }

    if (count >= questionsList.length) {
        displayResult();
    } else {
        nextQuestion();
    }
}

function displayResult() {

    $(".display-timer").hide();
    $(".non-header").hide();
    $(".resultArea").show();
    $(".rightGuessClass").html(right);
    $(".wrongGuessClass").html(wrong);
    $(".unanswered").html(unanswered);
    if(right >= 5) {
        sounds.gameOver.sound.play();
     }
    else{
        sounds.gameOverBoo.sound.play();
     }    
}

function populate() {
    $(".display-timer").show();
    if(lastQuestionUnanswered){
        $(".display-timer").hide();
    	counter=setInterval(timer,1000);
       
    }
    
    if (count < questionsList.length) {
        seconds = 20;
        $(".display-timer").html(seconds + " seconds left!");
        $("#question").html( questionsList[count].question);
        $("#placeholder").html("<img src=" + questionsList[count].image + ">");
        $(".option").css("background-color", "white");
 
        $("#0").html(questionsList[count].choices[0]);
        $("#1").html(questionsList[count].choices[1]);
        $("#2").html(questionsList[count].choices[2]);
        $("#3").html(questionsList[count].choices[3]);
        count++;
    } else {
        clearInterval(showImage);
    }
}

function timer() {
  $(".display-timer").html("Seconds left: " + seconds);
       if (seconds === 0) {
           stop();
           $(".display-timer").hide();
           currentCounter = count - 1;
           $("#" + questionsList[currentCounter].answer).css("background-color", "#abe575 ");
           if ((unanswered + right + wrong) < questionsList.length){
               unanswered++;
           }
           $(".unanswered").html("unanswered:" + unanswered); 
           lastQuestionUnanswered=true;       
           
            if (count >= questionsList.length) {
                displayResult();
                clearInterval(counter);
           } 
           return;
       }

   lastQuestionUnanswered=false;
   seconds--;
}



	
 





















