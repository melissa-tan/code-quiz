let highscore = 0;

/* const timer = 60;
const timerCount;
const quizComplete = false; */

let shuffleQuestion, currentQuestionIndex;
const instEl = document.querySelector(".instructions");
const questionEl = document.querySelector(".question");
const resultEl = document.querySelector(".result");
const highscoreEl = document.querySelector(".score");
const startQuizEl = document.getElementById("start-quiz");
const questionNumber = document.querySelector("#question-title");
const questionContentEl = document.getElementById("questions");
const answerEl = document.querySelector(".answer");
const answerButtonEl = document.querySelector(".answer-button");
const optionAEl = document.querySelector("#a");
const optionBEl = document.querySelector("#b");
const optionCEl = document.querySelector("#c");
const optionDEl = document.querySelector("#d");
const answerResultEl = document.querySelector("#answer-result");
const resultScoreEl = document.querySelector("#result-score");
const timerEl = document.querySelector("#timer");
const scoreSubmitEl = document.querySelector("#submit");
const viewHighscoreEl = document.querySelector("#highscore");
let initials = document.getElementById("result-name").value;

startQuizEl.addEventListener("click", startQuiz);
optionAEl.addEventListener("click", selectAnswer);
optionBEl.addEventListener("click", selectAnswer);
optionCEl.addEventListener("click", selectAnswer);
optionDEl.addEventListener("click", selectAnswer);
scoreSubmitEl.addEventListener("click", submitScore);

/* Start quiz */
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      /* if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      } */
      // When the time = 0, stops the quiz and timer
      if (timerCount === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }

function startQuiz() {
    instEl.classList.add("hide");
    shuffleQuestion = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionEl.classList.remove("hide");
    setNextQuestion();
    
    //startTimer();
  }
  /* Questions */
  
  function setNextQuestion() {
  showQuestion(shuffleQuestion[currentQuestionIndex])
}

function showQuestion(question){
    questionNumber.textContent = "Question " + (currentQuestionIndex+1);

    // Adds the question content to the page
    questionContentEl.textContent = question.question;

    // Creates an array of the possible answers and updates each button with the text
    let answers = question.answers;
    optionAEl.textContent = "A: " + answers["a"];
    optionBEl.textContent = "B: " + answers["b"];
    optionCEl.textContent = "C: " + answers["c"];
    optionDEl.textContent = "D: " + answers["d"];

}

function selectAnswer(){
  const correct = questions[currentQuestionIndex].answer;
  if(this.id == correct){
    answerResultEl.textContent = "Correct!"
    highscore++;
  } else{
    answerResultEl.textContent = "Wrong"
  }
  
  currentQuestionIndex++;

  if(currentQuestionIndex<5){
    setNextQuestion();
  } else{
    questionEl.classList.add("hide");
    resultEl.classList.remove("hide");
    setScore();
  }

}

function setScore(){
  resultScoreEl.textContent = "You got " + highscore + " questions correct!";
}

function submitScore(){
  let scoreArray = [];
  let initials = document.getElementById("result-name").value;
  if(initials === ""){
    alert("Initials cannot be blank");
  } else{
    localStorage.setItem("scoreArray", [initials, highscore]);
    resultEl.classList.add("hide");
    viewHighscore();
  }

}

function viewHighscore(){
  highscoreEl.classList.remove("hide");
  var storage = localStorage.getItem("scoreArray");
  console.log(storage);
  console.log(highscore);
}

const questions = [
    {
      question:"What does HTML stands for?",
      answers:{
        a:"Hypertext Machine language.",
        b:"Hypertext and links markup language.",
        c:"Hypertext Markup Language.",
        d:"Hypertext Manual language."
      },
      answer:"c"
    },
    {
      question:"How is document type initialized in HTML5.?",
      answers:{
        a:"</DOCTYPE HTML>",
        b:"</DOCTYPE>",
        c:"<!DOCTYPE HTML>",
        d:"</DOCTYPE html>"
      },
      answer:"c"
    },
    {
      question:"What does CSS stand for?",
      answers:{
        a:"Computer Style Sheet",
        b:"Cascading Style Sheets",
        c:"Color Style Sheets",
        d:"Creative Style Sheets"
      },
      answer:"b"
    },
    {
      question:"Where in an HTML document is the correct place to refer to an external style sheet?",
      answers:{
        a:"At the end of the document",
        b:"In the <footer> section",
        c:"In the <body> section",
        d:"In the <head> section"
      },
      answer:"d"
    },
    {
      question:"Which CSS property controls the text size",
      answers:{
        a:"font-size",
        b:"size",
        c:"text-style",
        d:"font-style"
      },
      answer:"a"
    },
    {
      question:"Choose the correct HTML element for the leargest heading",
      answers:{
        a:"heading",
        b:"head",
        c:"h6",
        d:"h1"
      },
      answer:"d"
    },
    {
      question:"What is the correct HTML for creating a hyperlink",
      answers:{
        a:"<a>http://www.google.com</a>",
        b:"<a url = \"http://www.google.com\"> Google.com</a>",
        c:"<a name = \"http://www.google.com\"> Google.com</a>",
        d:"<a href = \"http://www.google.com\"> Google.com</a>"
      },
      answer:"d"
    },

  ]