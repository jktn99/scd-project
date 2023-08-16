const btnRoller = document.getElementById("roller");
let dicePicEl = document.querySelector("#dice-pic");
let p1CurrentScoreEl = document.getElementById("current");
let btnHold = document.getElementById("hold");
let p1TotalScore = document.getElementById("totalScore--0");
let newGamebtn = document.getElementById("newGame");
let p2TotalScore = document.getElementById("totalScore--1");

let currentScoreP0 = document.getElementById(`current--0`);
let currentScoreP1 = document.getElementById(`current--1`);
let throwEl0 = document.querySelector("#throw0");
let throwEl1 = document.querySelector("#throw1");

let playing = true;
let score = [0, 0];
let activeplayer = 0;
let lapscore = 0;

function start() {
  activeplayer = 0;
  playing = true;
  score = [0, 0];
  lapscore = 0;
  p1TotalScore.textContent = 0;
  p2TotalScore.textContent = 0;

  currentScoreP0.textContent = 0;
  currentScoreP1.textContent = 0;
  
  throwEl1.classList.remove("active");
  p1TotalScore.style.color = "#bf2e34";
  p2TotalScore.style.color = "#bf2e34";
  newGamebtn.style.color = "black";
  newGamebtn.style.backgroundColor = "white";
  throwEl0.classList.add("active");
}

function switchPlayer() {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  lapscore = 0;
  activeplayer = activeplayer == 0 ? 1 : 0;

  throwEl0.classList.toggle("active");
  throwEl1.classList.toggle("active");
}

btnRoller.addEventListener("click", function () {
  if (playing) {
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    dicePicEl.src = `ludo_${randomDice}.png`;
    if (randomDice != 1) {
      lapscore += randomDice;
      document.getElementById(`current--${activeplayer}`).textContent =
        lapscore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[`${activeplayer}`] += lapscore;
    document.getElementById(`totalScore--${activeplayer}`).textContent =
      score[`${activeplayer}`];

    if (score[`${activeplayer}`] >= 100) {
      finish(activeplayer);

      document.getElementById(`current--${activeplayer}`).textContent = 0;
      dicePicEl.src = "ani.gif";

      playing = false;
    } else {
      switchPlayer();
    }
  }
});
function finish(activeplayer) {
  newGamebtn.style.backgroundColor = "green";
  newGamebtn.style.color = "white";
  throwEl0.classList.remove("active");
  throwEl1.classList.remove("active");
  if (activeplayer == 0) {
    document.getElementById(`totalScore--0`).style.color = "green";
    document.getElementById(`totalScore--1`).style.color = "white";
  } else {
    document.getElementById(`totalScore--0`).style.color = "white";
    document.getElementById(`totalScore--1`).style.color = "green";
  }
}
newGamebtn.addEventListener("click", start);
