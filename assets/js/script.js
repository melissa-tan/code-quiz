const timer = 60;
const timerCount;


const questionNumber = document.querySelector("#question-title");
const question = document.querySelector(".question-content");
const optionA = document.querySelector("#a");
const optionB = document.querySelector("#b");
const optionC = document.querySelector("#c");
const optionD = document.querySelector("#d");
const timerEl = document.querySelector("#timer");
/* Start quiz */
document.querySelector("#start-quiz").addEventListener("click", startQuiz);

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // When the time = 0, stops the quiz and timer
      if (timerCount === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }

function startQuiz(){
    startTimer();
}
/* Questions */