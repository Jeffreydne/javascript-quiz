
//Initialize variables for DOM manipulation
// Pages or other elements to hide and/or event listening
const startPage = document.querySelector("#start-page");
const gameOver = document.querySelector("#game-over-page");
const quizPage = document.querySelector("#quiz-page");
const mainPage = document.querySelector("#main-page-container");
const highScorePage = document.querySelector("#highScore-page-container");

// Dom elements variables to change or retrieve content
const scoreTracker = document.querySelector("#score-tracker");
const quizQuestion = document.querySelector("#quiz-question");
const result = document.querySelector("#result");
const timer = document.querySelector("#timer");
const timerP = document.querySelector("#timer-paragraph");
const finalResults = document.querySelector("#final-results");
const initials = document.querySelector("#initials");
const scoreSection = document.querySelector("#topScores");

// Buttons
const viewScores = document.querySelector("#high-score-button");
const startBtn = document.querySelector("#start-btn");
const ansA = document.querySelector("#ansA");
const ansB = document.querySelector("#ansB");
const ansC = document.querySelector("#ansC");
const ansD = document.querySelector("#ansD");
const submitInitialsBtn = document.querySelector("#submit-initials");
const returnToQuiz = document.querySelector("#returnBtn");
const clearScores = document.querySelector("#resetBtn");


//initialize variables for time and score
let timeLeft = 0;
let questionsAttempted = 0;
let numCorrect = 0;
let timerId = null;

//initialize variables to compare user's answer to correct answwer
let correctAnsIndx;
let userAns;
let trueAns;
let score;
let arrToPost = [];

// Hide game over section and high-score page on load
gameOver.style.display = "none";
highScorePage.style.display = "none";

// function to load sample question format at start of quiz and on restart
function sampleQuestionFxn() {
    const sampleQuestion = {
        question: "This is a sample of what a quiz question might look like:",
        ansArr: ["Sample answer A", "Sample answer B", "Sample answer C", "Sample answer D"]
    } 
    quizQuestion.textContent = `${sampleQuestion.question}`;
    ansA.textContent = `${sampleQuestion.ansArr[0]}`;
    ansB.textContent = `${sampleQuestion.ansArr[1]}`;
    ansC.textContent = `${sampleQuestion.ansArr[2]}`;
    ansD.textContent = `${sampleQuestion.ansArr[3]}`;
}
sampleQuestionFxn();
// questionBank is an array of 12 objects. Each object contains the questions to display, an array of possible answers, and the array index of the correct answer to compare to the users answer. 

const questionBank = [
    {
        question: "Which of the following is not considered a semantic element?",
        ansArr: ["<aside>", "<main>", "<nav>", "<div>"],
        correctAns: 3
    },
    {
        question: `Given the following CSS declaration: h1 h2 { color: black }\nHow does this effect the document ?`,
        ansArr: ["Changes the background color of all h1 and h2 elements to black.","Changes the background color to black, only for h2 elements that are descendants of an h1.","Changes the text color of all h1 and h2 elements to black.","Changes the text color to black, only for h2 elements that are descendants of an h1."],
        correctAns: 2
    },
    {
        question: `In JavaScript, if you have the following array:\nlet array = ["air", "blue", "car", "photo"]\nWhat is the value or array[2]?`,
        ansArr: ["undefined","air","blue","car"],
        correctAns: 3
    },
    {
        question: `In HTML, which of the following elements are self-closing, and therefore don't need a closing tag?`,
        ansArr: ["<img>","<p>","<video>","<nav>"],
        correctAns: 0
    },
    {
        question: `Which of the below answers shows the correct shorthand for the border property in CSS`,
        ansArr: ["p { border: black dotted 3px; }","p { border: dotted black 3px; }","p { border: 3px dotted black; }","p { border: 3px black dotted; }"],
        correctAns: 2
    },
    {
        question: `Which of the following answers is correct regarding the following javasScript code:\nfor(i =0; i < 10.5; i++) {\nconsole.log(i);\n}`,
        ansArr: ["You need to use var or let to declare the variable i. If you don't then if i was previously declared in the global space, it will be changed by this for loop.","You need to use whole numbers in a for loop. Decimals will break the code.","You need to separate the expressions within the parentheses with commas. Using semicolons will break the code.","The above statement is formatted correctly. No change is needed."],
        correctAns: 0
    },
    {
        question: `Which of the following is the correct way to add a comment into HTML?`,
        ansArr: ["// This is a comment in HTML","<!--This is a comment in HTML-->","-m 'This is a comment in HTML'","/* This is a comment in HTML */"],
        correctAns: 1
    },
    {
        question: `If you want to place an element at the top of the browser window, so that it does not move even when the user scrolls, which CSS declaration do you use?`,
        ansArr: [`position: absolute;\ntop:0px;`,`position: window;\ntop: 0px;`, `position: fixed:\ntop: 0px;`, `position: relative\ntop: 0px;`],
        correctAns: 2
    },
    {
        question: `Given the following javascript statement:\nconst paragraph = document.querySelectorAll("p");\nlet x = paragraph.value;\nWhat will be the value of x ?`,
        ansArr: ["x will equal the text content of the first paragraph element in the HTML.","x will equal an array with each member of the array equal to the text content of one of the paragraphs in the HTML.","This will give you an error because you are trying to get a single value using the querySelectorAll method.","You won't get an error, but x will equal undefined because you are trying to get a single value using the querySelectorAll method."],
        correctAns: 1
    },
    {
        question: `Which of the following answers correctly decribes how to display a numbered list using HTML?`,
        ansArr: ["Each numbered item should be an <li> element that is a child of an <ol> element.","Each numbered item should be an <li> element that is a child of a <ul> element.","Each numbered item should be an <ol> element that is a child of an <li> element.","Each numbered item should be a <ul> element that is a child of an <li> element."],
        correctAns: 0
    },
    {
        question: `Given the following HTML:\n<body>\n\t<p id="p1" class="greeting">Hello</p>\n</body>\nand the following CSS:\nbody {\ncolor: blue !important;\n}\n#p1 {\ncolor: orange;\n}\n.greeting {\ncolor: green\n}\nWhat color will the text be in the browser window?`,
        ansArr: ["Green, because it is the last of the applicable CSS declarations.","Orange, because #p1 is the id and id is the most specific type of selector.","Blue, because !important overrides other rules.","Black, because that is the defualt color for text, and the color property is used to set the background color, not the text color."],
        correctAns: 2
    },
    {
        question: `Given the following set of statments in JavaScript:\nx = 2;\ny = "7";\nz = x + y;\nWhat is the vaule of z?`,
        ansArr: [`"27"`, `9`, `NaN`, `undefined`],
        correctAns: 0
    }
]
// function to start quiz (event listener to call this function at bottom of code)
function startQuiz() {
    startBtn.style.display = "none";
    presentNext();
    startTimer();
}
// function to start timer
function startTimer() {
   timerP.style.fontWeight = "700";
   timerP.style.fontSize = "larger";
   timeLeft = 90;
   timerId = setInterval(function(){
        if(timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            endQuiz();
        } else {
            timeLeft--;
            timer.textContent = `${timeLeft}`
        }
   }, 1000);
}

// function to present the questions and answers
function presentNext() {
    result.style.display = "none";
    scoreTracker.textContent = `Questions attempted: ${questionsAttempted}\nNumber of correct answers: ${numCorrect}`;
    scoreTracker.style.display = "block";
quizQuestion.textContent = `${questionBank[questionsAttempted].question}`;
ansA.textContent = `${questionBank[questionsAttempted].ansArr[0]}`;
ansB.textContent = `${questionBank[questionsAttempted].ansArr[1]}`;
ansC.textContent = `${questionBank[questionsAttempted].ansArr[2]}`;
ansD.textContent = `${questionBank[questionsAttempted].ansArr[3]}`;
correctAnsIndx = questionBank[questionsAttempted].correctAns;
// function to tell user they are correct. If all 12 questions have been answered the quizEnd fxn is called, if not the next question will appear after 1 second.
}
function userCorrect() {
    result.style.display = "block";
    result.textContent = "Yes! You are correct.";
    questionsAttempted++;
    numCorrect++;
    if (questionsAttempted === 12) {
        clearInterval(timerId);
        timerId = null;
        endQuiz();
    } else {
        setTimeout(presentNext, 1000);
    }
}
// function to tell user they are not correct. If all 12 questions have been answered the quizEnd fxn is called, if not the next question will appear after 8 seconds, during which time the correct answer is displayed.
function userWrong() {
    result.style.display = "block";
    result.textContent = `Sorry, that is not correct. The actual answer is: ${questionBank[questionsAttempted].ansArr[correctAnsIndx]}`;
    questionsAttempted++;
    if (questionsAttempted === 12) {
        clearInterval(timerId);
        timerId = null;
        endQuiz();
    } else {
        setTimeout(presentNext, 8000);
    }
}
// The end quiz function calculates the percent correct fixed to one decimal place and displays that in a message to the user while also making the quiz-page section disappear. A form is also added along with a submit button in the html so that the user can store their socre. 
function endQuiz() {
    let percent = numCorrect * 100 / 12;
    score = percent.toFixed(1);
    startPage.style.display = "none";
    quizPage.style.display = "none";
    gameOver.style.display = "block";
    if (timeLeft > 0) {
        finalResults.textContent = `Congratulations! You were able to answer all 12 questions in the time alloted. You answered ${numCorrect} questions correctly giving you a score of ${score}%. Submit your initials to save your score.`
    } else {
        finalResults.textContent = `In the 90 seconds alloted you gave an answer to ${questionsAttempted} of the 12 possible questions. You answered ${numCorrect} questions correctly. That gives you a score of ${score}%. Submit your initials to save your score.`
    }
}

   // function to retrieve the high scores in local storage and to display them in the topScores section by dynamically adding them to the DOM. This can be called by the view high scores button or as part of the submitInitials function

   function displayHighScores() {
    //check to see if any high scores have been added- if not tell user & invite user to play, if there are scores in local storage then display them. 
    if(!localStorage.highScores) {
        scoreSection.innerHTML = "<p>There are not yet any scores to post. Take the quiz and be the first to post!</p></hr>";
    } else {
        //add head paragraph to topScores section 
        scoreSection.innerHTML = "<p>INITIALS: SCORE</p></hr>";
        //retrieve highScores as an array of objects using JSON.parse
        arrToPost = JSON.parse(localStorage.getItem('highScores'));
    
        //sort the highScore objects in descending order based on score
        arrToPost.sort((a,b) => b.score - a.score);
        // dynamically add top 11 scores into the scoreSection beneath the head paragraph
        for(let i = 0; (i < 11 && i < arrToPost.length); i++) {
            let pToAdd = document.createElement("p");
            pToAdd.textContent = `${arrToPost[i].name}: ${arrToPost[i].score}`;
            scoreSection.appendChild(pToAdd);
        }
    }
    //hide mainPage and display highSocrePage
    mainPage.style.display = "none";
    highScorePage.style.display = "block";
}

//event listeners
// To start Quiz from main page
startBtn.addEventListener("click", startQuiz);

// to view high scores that are stored in local storage
viewScores.addEventListener("click", displayHighScores);

// To listen for user response to question presented, an event listener is set for entire quiz page which includes question and all 4 answers. event.target is used to avoid action unless the user actually clicks on an answer button. If the user does click on a button that id is retrieved and compared with the correct answer and the appropriate function is called. 
quizPage.addEventListener("click", function(event) {
    event.preventDefault();
    if(!event.target.classList.contains("theBtn")) {
        return;
    } else {
        userAns = event.target.getAttribute('id');
        trueAns = `a${correctAnsIndx}`;
        if(userAns === trueAns) {
            userCorrect();
        } else {
            userWrong();
        }
    }
});

//event listener for submit initials btn. When clicked the initials in the text box will be stored in a variable and an  object (storageObj) will be created with those initials stored in name property and the socfre stored in score property. Then add this object to array of objects in local storage (existingHighScoreArray)
submitInitialsBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let initToStore = initials.value;
    const storageObj = {
        name: `${initToStore}`,
        score: `${score}`
    }
    //get existing highScoreArray stored with key 'highScores' from local Storage and parse it using JSON.parse (or if it doesn't yet exist get an empty array)
    const existingHighScoreArray = JSON.parse(localStorage.getItem('highScores')) || [];
    // insert new obj into array then store it using JSON.stringify back into the 'highScores' property
    const newHighScoreArray = [...existingHighScoreArray, storageObj,];
    localStorage.setItem('highScores', JSON.stringify(newHighScoreArray));
    displayHighScores();
});

//event listener for return to Quiz button
// reset initial conditions to restart quiz
returnToQuiz.addEventListener("click", function(event) {
    event.preventDefault();
    timeLeft = 90;
    questionsAttempted = 0;
    numCorrect = 0;
    timerId = null;
    correctAnsIndx = undefined;
    userAns = undefined;
    trueAns = undefined;
    sampleQuestionFxn();
    timer.textContent = `${timeLeft}`
    gameOver.style.display = "none";
    result.style.display = "none";
    gameOver.style.display = "none";
    scoreTracker.style.display = "none";
    startPage.style.display = "block";
    quizPage.style.display = "block";
    mainPage.style.display = "block";
    startBtn.style.display = "inline";
    highScorePage.style.display = "none";
});

// event listener to remove the highScores object from local storage

clearScores.addEventListener("click", () => {
    localStorage.removeItem('highScores');
    displayHighScores();
});