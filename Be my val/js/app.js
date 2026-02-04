function goTo(id){
  document.querySelectorAll(".screen")
    .forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo(0,0);
}

document.addEventListener("DOMContentLoaded",()=>{

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const retryBtn = document.getElementById("retryBtn");
const captchaBtn = document.getElementById("captchaBtn");
const heartCheck = document.getElementById("heartCheck");
const cuteContinueBtn = document.getElementById("cuteContinueBtn");
const loveBar = document.getElementById("loveBar");
const noMessage = document.getElementById("noMessage");
const yesMsg = document.getElementById("yesMsg");
const giftsBtn = document.getElementById("giftsBtn");
const music = document.getElementById("gameMusic");

giftsBtn.onclick = () => {
  goTo("gamesHub");
  music.currentTime = 0;
  music.play().catch(()=>{});
};

document.querySelectorAll(".game-card").forEach(card=>{
  card.onclick = () => {
    openGame(card.dataset.game);
  };
});

function updateUI(){
  yesBtn.style.transform=`scale(${AppState.yesScale})`;
  noBtn.style.transform=`scale(${AppState.noScale})`;
  loveBar.style.width = AppState.loveProgress+"%";
}

/* YES PATH → CUTE → SUCCESS */

yesBtn.onclick = ()=>{
  goTo("cuteScreen");
};

cuteContinueBtn.onclick = ()=>{
  yesMsg.textContent = getRandomYesMessage();
  goTo("yesScreen");
};

/* NO PATH */

noBtn.onclick = ()=>{
  registerNoClick();
  updateUI();

  const esc = getEscalationMessage(AppState.noClicks);
  noMessage.textContent = esc || getRandomNoMessage();

  goTo("noScreen");

  if(AppState.captchaUnlocked){
    setTimeout(()=>goTo("captcha"),900);
  }
};

retryBtn.onclick = ()=>{
  goTo("home");
};

/* CAPTCHA → ALWAYS RETURNS TO HOME */

captchaBtn.onclick = ()=>{
  if(!heartCheck.checked){
    document.querySelector("#captcha .card").classList.add("shake");
    setTimeout(()=> {
      document.querySelector("#captcha .card").classList.remove("shake");
    },400);
    return;
  }

  heartCheck.checked = false;
  goTo("home");
};

updateUI();

});

/* ========= GAME CARD CLICK ROUTER ========= */

document.querySelectorAll(".game-card").forEach(card => {
  card.addEventListener("click", () => {

    const game = card.dataset.game;

    if(game === "puzzle"){
      startPuzzle();   // your existing function
    }

    if(game === "hangman"){
      startHangman();  // hangman function we added
    }

    if(game === "crossword"){
      alert("Crossword coming next 😄");
    }

    if(game === "crossword"){
  startCrossword();
     }

  });
});
