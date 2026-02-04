const NoMessages = [
 "Are you sure?",
 "Ouch😔💔",
 "Shattered",
 "As how na😭😭",
 "Love request denied — suspicious.",
 "Heart firewall detected.",
 "Romance server retrying…"
];

const EscalationMessages = {
 3: "High resistance detected.",
 5: "Deploying persuasion protocol…",
 7: "Love potion recommended."
};

const YesMessages = [
 "Correct choice.",
 "Very correct choice.",
 "Excellent decision.",
 "Certified good taste.",
 "Romance approved."
];

function getRandomNoMessage(){
  return NoMessages[Math.floor(Math.random()*NoMessages.length)];
}

function getEscalationMessage(n){
  return EscalationMessages[n] || null;
}

function getRandomYesMessage(){
  return YesMessages[Math.floor(Math.random()*YesMessages.length)];
}
