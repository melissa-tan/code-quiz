let highscore = 0;
let initials = document.getElementById("result-name").value;
let scoreArray = [];


let shuffleQuestion, currentQuestionIndex;
const instEl = document.querySelector(".instructions");
const questionEl = document.querySelector(".question");
const resultEl = document.querySelector(".result");
const highscoreEl = document.querySelector(".score");
const startQuizEl = document.getElementById("start-quiz");
const questionNumber = document.querySelector("#question-title");
const questionContentEl = document.querySelector(".question-content");
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
const scoreListEl = document.querySelector("#score-list");
const clearScoreEl = document.querySelector("#clear");
const tableEl = document.querySelector("#table");
const backEl = document.querySelector("#back");

startQuizEl.addEventListener("click", startQuiz);
optionAEl.addEventListener("click", selectAnswer);
optionBEl.addEventListener("click", selectAnswer);
optionCEl.addEventListener("click", selectAnswer);
optionDEl.addEventListener("click", selectAnswer);
scoreSubmitEl.addEventListener("click", submitScore);
viewHighscoreEl.addEventListener("click", viewHighscore);
clearScoreEl.addEventListener("click", clearHighscore);
backEl.addEventListener("click", homePage);


function homePage(){
  /* instEl.classList.remove("hide");
  questionEl.classList.add("hide");
  resultEl.classList.add("hide");
  highscoreEl.classList.add("hide"); */
  location.reload();
  highscore=0;
  
}
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
    highscore=0;
    initials="";
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
      answerResultEl.textContent = "Correct!";
      setTimeout(function(){
        answerResultEl.textContent = "";
      }, 1000);
    highscore++;
  } else{
    answerResultEl.textContent = "Wrong";
      setTimeout(function(){
        answerResultEl.textContent = "";
      }, 1000);
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
  let initials = document.getElementById("result-name").value;
  let object;
  var user =
    {
      name: initials,
      score: highscore
    };
  if(initials === ""){
    alert("Initials cannot be blank");
  } else if (user.name != "" || user.score != 0) {
    var storage = JSON.parse(localStorage.getItem("user"));
  
    if(storage != null){
      storage.push(user);
      object = storage
    } else {
      object = [user]
    }
    var jsonObject = JSON.stringify(object);
    localStorage.setItem("user", jsonObject);
  }
  resultEl.classList.add("hide");
  viewHighscore();

}

function viewHighscore(){
  highscoreEl.classList.remove("hide");
  instEl.classList.add("hide");
  questionEl.classList.add("hide");
  resultEl.classList.add("hide");
  scoreListEl.classList.add("hide");

  var storage = JSON.parse(localStorage.getItem("user"));
  if (storage != null){
    storage.sort(compareScore);
  

    let table = document.createElement("table");
    let tableHeader = document.createElement("tr");

    tableHeader.innerHTML = "<th>Name</th><th>Score</th>"
    table.append(tableHeader);
          
    let tableContent = document.createElement("tbody");
    table.append(tableContent);

    for (var i = 0; i < storage.length; i++) {
      let column1 = storage[i].name;
      let column2 = storage[i].score;
      let rowContent = document.createElement("tr");
      console.log(column1 + column2);

      rowContent.innerHTML = "<td>" + column1 + "</td><td>" + column2 + "</td>";
      tableContent.append(rowContent);

      scoreListEl.classList.remove("hide");
      scoreListEl.appendChild(table);
    }
  }
}

function compareScore(a, b) {
  if (a.score < b.score) return 1;
  if (b.score < a.score) return -1;
  return 0;
}



function clearHighscore(){
    localStorage.clear("user");
    localStorage.removeItem("user");
    viewHighscore();
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
      question:"Choose the correct HTML element for the largest heading",
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