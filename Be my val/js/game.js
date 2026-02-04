/* ========= GAME NAV ========= */

function openGame(name){

  if(name === "puzzle"){
    goTo("puzzleScreen");
    startPuzzle();
  }

  if(name === "crossword"){
    alert("Crossword coming next 😄");
  }

  if(name === "hangman"){
    alert("Hangman coming next 😄");
  }
}


/* ========= PUZZLE GAME ========= */

const PUZZLE_SIZE = 3;
let puzzleOrder = [];
let selectedTile = null;

function startPuzzle(){

  const grid = document.getElementById("puzzleGrid");
  const status = document.getElementById("puzzleStatus");

  status.textContent = "";
  grid.innerHTML = "";

  // correct order
  puzzleOrder = [...Array(9).keys()];

  // shuffle
  puzzleOrder.sort(()=>Math.random()-0.5);

  puzzleOrder.forEach((pos,index)=>{
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.index = index;
    tile.dataset.correct = pos;

    // background slice
    tile.style.backgroundImage =
      "url('assets/images/puzzle.jpeg')";

    const x = pos % PUZZLE_SIZE;
    const y = Math.floor(pos / PUZZLE_SIZE);

    tile.style.backgroundPosition =
      `${(x/(PUZZLE_SIZE-1))*100}% ${(y/(PUZZLE_SIZE-1))*100}%`;

    tile.onclick = () => selectTile(tile);

    grid.appendChild(tile);
  });
}


/* ========= TILE SWAP ========= */

function selectTile(tile){

  if(!selectedTile){
    selectedTile = tile;
    tile.classList.add("selected");
    return;
  }

  if(selectedTile === tile){
    tile.classList.remove("selected");
    selectedTile = null;
    return;
  }

  swapTiles(selectedTile, tile);

  selectedTile.classList.remove("selected");
  selectedTile = null;

  checkPuzzleSolved();
}


function swapTiles(a,b){
  const tempBg = a.style.backgroundPosition;
  const tempCorrect = a.dataset.correct;

  a.style.backgroundPosition = b.style.backgroundPosition;
  a.dataset.correct = b.dataset.correct;

  b.style.backgroundPosition = tempBg;
  b.dataset.correct = tempCorrect;
}


/* ========= SOLVE CHECK ========= */

function checkPuzzleSolved(){

  const tiles = document.querySelectorAll(".tile");

  for(let i=0;i<tiles.length;i++){
    if(Number(tiles[i].dataset.correct) !== i){
      return;
    }
  }

  document.getElementById("puzzleStatus")
    .textContent = "Puzzle solved 💖 Gift unlocked!";
}

/* =========================
   RIDDLE HANGMAN (10 SETS)
========================= */

const hmRiddles = [
  {q:"I melt when things get hot but I’m sweet to receive 💝", a:"CHOCOLATE"},
  {q:"I arrive once a year for lovers 💌", a:"VALENTINE"},
  {q:"You give me to show affection 🤗", a:"HUG"},
  {q:"Red symbol of love 🌹", a:"ROSE"},
  {q:"You wear this on a date night 👗", a:"DRESS"},
  {q:"I shoot arrows but never kill 🏹", a:"CUPID"},
  {q:"You send me in the morning ☀️", a:"TEXT"},
  {q:"What love makes your heart do 💓", a:"BEAT"},
  {q:"Opposite of hate ❤️", a:"LOVE"},
  {q:"You say this after a good date 😄", a:"SMILE"}
];

let hmIndex = 0;
let hmWord, hmGuess, hmWrong;
const hmMax = 6;

function startHangman(){
  goTo("hangmanScreen");
  hmIndex = 0;
  loadRiddleRound();
}

function loadRiddleRound(){
  const item = hmRiddles[hmIndex];
  hmWord = item.a.toUpperCase();
  hmGuess = [];
  hmWrong = 0;

  document.getElementById("hmRiddle").textContent =
    "Riddle "+(hmIndex+1)+"/10: " + item.q;

  buildHMKeys();
  updateHMWord();
  updateHMHearts();
  setHM("Solve the riddle 💭");
}

function buildHMKeys(){
  const box = document.getElementById("hmLetters");
  box.innerHTML = "";

  for(let i=65;i<=90;i++){
    const L = String.fromCharCode(i);
    const b = document.createElement("button");
    b.textContent = L;
    b.className = "hmBtn";
    b.onclick = ()=>guessHM(L,b);
    box.appendChild(b);
  }
}

function guessHM(L,btn){
  btn.disabled = true;

  if(hmWord.includes(L)) hmGuess.push(L);
  else hmWrong++;

  updateHMWord();
  updateHMHearts();
  checkHM();
}

function updateHMWord(){
  document.getElementById("hmWord").textContent =
    hmWord.split("").map(l=>hmGuess.includes(l)?l:"_").join(" ");
}

function updateHMHearts(){
  document.getElementById("hmHearts").textContent =
    "❤️".repeat(hmMax-hmWrong)+"🤍".repeat(hmWrong);
}

function checkHM(){
  const win = hmWord.split("").every(l=>hmGuess.includes(l));

  if(win){
    setHM("Correct ✅");
    disableHM();

    setTimeout(()=>{
      hmIndex++;
      if(hmIndex < hmRiddles.length){
        loadRiddleRound();
      } else {
        setHM("All riddles solved 💖 Gift unlocked!");
      }
    },1200);
  }

  if(hmWrong >= hmMax){
    setHM("No hearts left 😭 Answer: "+hmWord);
    disableHM();

    setTimeout(loadRiddleRound,1500);
  }
}

function disableHM(){
  document.querySelectorAll(".hmBtn")
    .forEach(b=>b.disabled=true);
}

function setHM(t){
  document.getElementById("hmStatus").textContent=t;
}

/* =====================
   LOVE CROSSWORD LITE
===================== */

const cwLayout = [
  ["L","O","V","E"],
  ["O","","",""],
  ["V","","",""],
  ["E","","",""]
];

const cwWords = [
  {word:"LOVE", clue:"Opposite of hate"},
  {word:"HUG", clue:"A warm squeeze"},
  {word:"ROSE", clue:"A red love flower"}
];

function startCrossword(){
  goTo("crosswordScreen");
  buildCWGrid();
  buildCWClues();
  document.getElementById("cwStatus").textContent = "";
}

function buildCWGrid(){
  const grid = document.getElementById("cwGrid");
  grid.innerHTML = "";

  cwLayout.forEach((row,r)=>{
    row.forEach((cell,c)=>{
      const input = document.createElement("input");
      input.maxLength = 1;
      input.className = "cwCell";

      if(cell === ""){
        input.classList.add("cwBlock");
        input.disabled = true;
      }

      grid.appendChild(input);
    });
  });
}

function buildCWClues(){
  const ul = document.getElementById("cwClues");
  ul.innerHTML = "";

  cwWords.forEach(w=>{
    const li = document.createElement("li");
    li.textContent = w.clue;
    ul.appendChild(li);
  });
}

document.getElementById("cwCheckBtn")
  ?.addEventListener("click", checkCrossword);

function checkCrossword(){
  const cells = [...document.querySelectorAll(".cwCell")];
  let i = 0;
  let ok = true;

  cwLayout.forEach(row=>{
    row.forEach(cell=>{
      if(cell !== ""){
        if(cells[i].value.toUpperCase() !== cell){
          ok = false;
        }
      }
      i++;
    });
  });

  document.getElementById("cwStatus").textContent =
    ok ? "Correct 💖 Genius detected" : "Some letters are off 🤔";
}