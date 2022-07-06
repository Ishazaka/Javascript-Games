
const reset = document.querySelector(".reset-btn"),
  inputs = document.querySelector(".inputs"),
  hint = document.querySelector(".hint span");
const typing = document.querySelector(".typing-input"),
  wrong = document.querySelector(".wrong span"),
  guess = document.querySelector(".guess span");

let word,
  Totalguess,
  incorrect = [],
  correct = [];

function randomWord() {
  let randObj = wordList[Math.floor(Math.random() * wordList.length)];
  word = randObj.word;
  Totalguess = 8;
  correct = [];

  console.log(word);
  incorrect = [];
  wrong.innerText = "";
  hint.innerText = randObj.hint;
  guess.innerText = Totalguess;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled >`;
  }
  inputs.innerHTML = html;
}

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrect.includes(` ${key}`) &&
    !correct.includes(key)
  ) {
    if (word.includes(key)) {
      for (let i = 0; i < word.length; i++) {
        if (word[i] == key) {
          correct.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      incorrect.push(` ${key}`);
      Totalguess--;
      console.log(incorrect);
      guess.innerText = Totalguess;
    }
    wrong.innerText = incorrect;
  }
  typing.value = "";

  setTimeout(() => {
    if (correct.length === word.length) {
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].style.backgroundColor = "#1bb295";
        inputs.querySelectorAll("input")[i].style.color = "white";
      }
      setTimeout(() => {
        alert(`You have found the word ${word.toUpperCase()}`);
        randomWord();
      }, 400);
    } else if (Totalguess < 1) {
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
      alert("Game is Over.You have 0 remaining guesses!");
    }
  });
}

reset.addEventListener("click", randomWord);
document.addEventListener("keydown", () => typing.focus());
inputs.addEventListener('click' , () => typing.focus() )
typing.addEventListener("input", initGame);
randomWord();
