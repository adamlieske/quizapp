const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "You Win";
    return;
  }

  if (data.loser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "You Lose, Try Again";
    return;
  }

  question.innerText = data.question;
  for (const i in data.answers) {
    const answerElement = document.querySelector(`#answer${Number(i) + 1}`);
    answerElement.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((r) => r.json()) // konwersja odpowiedzi na JSON
    .then((data) => {
      fillQuestionElements(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

showNextQuestion();

const goodAnswerSpan = document.querySelector("#good-answers");

function handleAnswerFeedback(data) {
  goodAnswerSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => {
      handleAnswerFeedback(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const buttons = document.querySelectorAll("button");
for (const button of buttons) {
  button.addEventListener("click", (e) => {
    const answerIndex = e.target.dataset.answer;
    sendAnswer(answerIndex);
  });
}
