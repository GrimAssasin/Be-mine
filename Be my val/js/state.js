const AppState = {
  noClicks: 0,
  yesScale: 1,
  noScale: 1,
  loveProgress: 10,
  captchaUnlocked: false
};

function registerNoClick(){
  AppState.noClicks++;
  AppState.yesScale += 0.15;
  AppState.noScale = Math.max(.45, AppState.noScale - .12);
  AppState.loveProgress = Math.min(100, AppState.loveProgress + 12);

  if(AppState.noClicks >= 4){
    AppState.captchaUnlocked = true;
  }
}

function resetState(){
  AppState.noClicks = 0;
  AppState.yesScale = 1;
  AppState.noScale = 1;
  AppState.loveProgress = 10;
  AppState.captchaUnlocked = false;
}
