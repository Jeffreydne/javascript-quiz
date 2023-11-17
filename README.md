# javascript-quiz

---

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) | 
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |
| JavaScript     | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |    

---

## Description

[Visit the Deployed Site](https://jeffreydne.github.io/Jeff-Nelson-javascript-quiz)

This is a timed quiz on javascrit, css and html. Once the user starts the quiz they have 90 seconds to complete 12 questions. When they answer incorrectly there is an 8 second pause until the following question is presented. During the pause the correct answer is presented. At the end, the user can record their score in local storage and compare how they did to others, or to their previous attempts.


---

## Code Example

The below JavaScript example shows the event listener that is used during th equiz to obtain their answer. Each question has 4 answers, each associated with a button (A, B, C, or D). The event listener fxn checks if the an actual button was pressed (with class="theBtn), and if not nothing happens. If the user did click on an answer btn the attribute id is obtained and compared witg the index of the correct answer. Because html ids cannot start with a letter, the ids given were a0 through a3 and an a is concatenated onto the index of the correct answer so that it can be compared with the id of the button. If the answer matches the correc answer the userCorrect fxn is called, otherwise the userWrong fxn is called.

```JS
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
 
```
The below function shows how my app uses local storage to display high scores from previous sessions. the comments explain each step of the 1st half of the code.

```JS
   function displayHighScores() {
    //check to see if any high scores have been added- if not tell user & invite user to play with text inserted into the DOM. If there are scores in local storage then they are displayed by parsing the result of the getItem method which results in an array of objects containing all the high scores- and this is inserted it into the DOM in the 2nd half of the function. 
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
```
## Usage

This webstie is designed to be a learning tool to help people in software development to test their knowledge about HTML, CSS and JavaScript. To do this they can take a timed quiz which will help the user clarify what concepts they already know, and what areas need more study. The quiz is timed and the score is tracked. At the end they can enter their score and compare it to the high scores of others, or to their previous attempts. 


![ alt text](./assets/images/code-quiz-screenshot.png)
---

## Learning Points

During the making of this quiz I devloped this website from scratch, based on a model suggested by the UC Berkeley Extension Full Stack Bootcamp. I implemented basic HTML and CSS such that my site looked similar to the screenshots provided. I used JavaScript to provide the logic for setting up a timed quiz that manipulated the DOM to provide questions, evaluate the user's answers, keep track of the score and provide them with results at the end, all while keeping in mind best practices. 

* Event listeners are used to provide interactivity. Buttons with event listeners checking for clicks allow the user to start the game, check for high scores, submit their initials and score at the end of each game, return to the quiz page and to clear all scores. 

* Local storage is used t stroe an object with all previous high scores. The localStorage.getItem and JSON.parse methods are used to retrieve the exisiting object, the current users initials and score are then added to the object which is then converted back into a string using JSON.stringify and the localStorage.setItem method is used to store the updated highScores object. A separate button allows the user to clear the high scores using the localStorage.removeItem fxn.

* The array.sort method is used to sort the high scores presenting the scores in descending order

*  A "for loop" is used to insert each set of initials and scores into the DOM. In the for loop a paragraph element is created, the information from the stored object is then added as text usi gthe textContent method and finally the initials and scores of the top players are added to the DOM using the appendChild method.

* The quiz is timed. A timerId is set equal to a setInterval function to derement the clock from 90 seconds to 0. An if statement checks to see if time has run out, and if so runs the endQuiz function.

* The total number of questions attempted and the number of correct answers are tracked and fed into the DOM after each question is answered using variables to store the values, the increment operator to add to the value, and document.querySelector().textContent = theVariable to insert these values into the DOM. 

---

## Author Info

```md
### Jeffrey Nelson


* [Portfolio]( https://jeffreydne.github.io/Jeff-Nelson-Portfolio/)
* [LinkedIn](https://www.linkedin.com/in/jeffrey-nelson13/)
* [Github](https://github.com/Jeffreydne)
```

---
## Credits
 The excellent staff at UC Berkeley Extension Full Stack Bootcamp provided the beginings of the table of technology used in this README.md. The basic design and layout of the quiz is also based on the samples provided by UC Berkeley Extension.
 To store scores using localStorage, I borrowed heavily from the web storage tutorial at freeCodeCamp.org, modifying as needed.
