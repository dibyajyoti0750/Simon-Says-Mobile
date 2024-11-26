let started = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];
let h2 = document.querySelector("h2");
let gameSeq = [];
let userSeq = [];

function getReady() {
  setTimeout(() => {
    h2.innerText = "3";
    setTimeout(() => {
      h2.innerText = "2";
      setTimeout(() => {
        h2.innerText = "1";
        setTimeout(() => {
          h2.innerText = "Start!";
        }, 800);
      }, 1000);
    }, 1000);
  }, 100);
}

document.addEventListener("keypress", () => {
  if (!started) {
    console.log("Game Started");
    started = true;
    getReady();
    setTimeout(levelUp, 3500);
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let btnIdx = Math.floor(Math.random() * 4);
  let btnColor = btns[btnIdx];
  let btn = document.querySelector(`.${btnColor}`);
  gameFlash(btn);

  gameSeq.push(btnColor);
  console.log(gameSeq);
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 250);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  console.log(userSeq);

  matchSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function matchSeq(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was ${level} <br /> Press any key to Restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

let highestScore = 0;

function reset() {
  let h3 = document.querySelector("h3");
  if (level > highestScore) {
    highestScore = level;
  }

  h3.innerText = `Highest Score : ${highestScore}`;

  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
