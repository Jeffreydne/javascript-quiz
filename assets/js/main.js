console.log("i am working");
//Initialize variables for DOM manipulation
const startPage = document.querySelector("#start-page");
const startBtn = document.querySelector("#start-btn");
const scoreTracker = document.querySelector("#score-tracker");
const quizQuestion = document.querySelector("#quiz-question");
const ansA = document.querySelector("#ansA");
const ansB = document.querySelector("#ansB");
const ansC = document.querySelector("#ansC");
const ansD = document.querySelector("#ansD");
const timer = document.querySelector("#timer");

//initialize variables for time and score
let timeLeft = 0;
let questionsAttempted = 0;
let numCorrect = 0;
let timerId = null;
//initialize variables to compare user's answer to correct answwer
let correctAnsIndx;
let userAns;
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
        question: `Given the following javasScript code:\nfor(i =0; i < 10.5; i++) {\nconsole.log(i);\n}`,
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
    scoreTracker.textContent = `Questions attempted: ${questionsAttempted}\nNumber of correct answers: ${numCorrect}`;
quizQuestion.textContent = `${questionBank[questionsAttempted].question}`;
ansA.textContent = `${questionBank[questionsAttempted].ansArr[0]}`;
ansB.textContent = `${questionBank[questionsAttempted].ansArr[1]}`;
ansC.textContent = `${questionBank[questionsAttempted].ansArr[2]}`;
ansD.textContent = `${questionBank[questionsAttempted].ansArr[3]}`;
correctAnsIndx = questionBank[questionsAttempted].correctAns;
// console.log(correctAnsIndx);
}

//event listeners
startBtn.addEventListener("click", startQuiz);

console.log(questionBank[11].ansArr[2]);
console.log(questionBank[5].correctAns);
console.log(questionBank[0].Question);