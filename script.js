const weddingDate = new Date("2026-12-13T17:00:00").getTime();

function updateCountdown(){
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if(distance <= 0){
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent = Math.floor((distance / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent = Math.floor((distance / 1000) % 60);
}

let musicPlaying = false;
let musicStartedOnce = false;

function toggleMusic(){
  const music = document.getElementById("weddingMusic");
  const icon = document.getElementById("musicIcon");
  const text = document.getElementById("musicText");

  if(!musicPlaying){
    music.play().then(function(){
      musicPlaying = true;
      musicStartedOnce = true;
      icon.classList.add("playing");
      text.textContent = "En cours";
    }).catch(function(){
      text.textContent = "Cliquer pour écouter";
    });
  } else {
    music.pause();
    musicPlaying = false;
    icon.classList.remove("playing");
    text.textContent = "Écouter";
  }
}

function startMusicOnFirstInteraction(){
  if(musicStartedOnce) return;

  const music = document.getElementById("weddingMusic");
  const icon = document.getElementById("musicIcon");
  const text = document.getElementById("musicText");

  if(!music) return;
  music.volume = 0.65;

  music.play().then(function(){
    musicPlaying = true;
    musicStartedOnce = true;
    icon.classList.add("playing");
    text.textContent = "En cours";
  }).catch(function(){
    text.textContent = "Cliquer pour écouter";
  });
}

function changeCount(id, delta){
  const input = document.getElementById(id);
  const current = Number(input.value) || 0;
  input.value = Math.max(0, current + delta);
}

function toggleEventCount(eventName, isYes){
  const panel = document.getElementById(eventName + "Count");
  const input = eventName === "civil" ? document.getElementById("nbCivil") : document.getElementById("nbReligieux");

  if(isYes){
    panel.classList.add("is-visible");
    if(Number(input.value) === 0){ input.value = 1; }
  } else {
    panel.classList.remove("is-visible");
    input.value = 0;
  }
}

function getRadioValue(name){
  const selected = document.querySelector('input[name="' + name + '"]:checked');
  return selected ? selected.value : "";
}

function handleRsvpSubmit(){
  const civilResponse = getRadioValue("civilResponse");
  const religieuxResponse = getRadioValue("religieuxResponse");
  const civil = Number(document.getElementById("nbCivil").value) || 0;
  const religieux = Number(document.getElementById("nbReligieux").value) || 0;
  const error = document.getElementById("rsvpError");
  const submit = document.getElementById("rsvpSubmit");

  error.textContent = "";

  if(!civilResponse || !religieuxResponse){
    error.textContent = "Merci de répondre pour les deux événements.";
    return false;
  }

  if(civilResponse === "Oui" && civil === 0){
    error.textContent = "Merci d’indiquer le nombre de personnes pour le mariage civil.";
    return false;
  }

  if(religieuxResponse === "Oui" && religieux === 0){
    error.textContent = "Merci d’indiquer le nombre de personnes pour la Houppa.";
    return false;
  }

  submit.textContent = "Enregistrement...";
  submit.classList.add("is-loading");

  setTimeout(function(){
    const form = document.querySelector(".premium-rsvp");
    const thanks = document.getElementById("rsvpThanks");

    if(form && thanks){
      form.style.display = "none";
      thanks.style.display = "block";
    }
  }, 900);

  return true;
}

function revealOnScroll(){
  const reveals = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.88;

  reveals.forEach(function(el){
    if(el.getBoundingClientRect().top < trigger){
      el.classList.add("visible");
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);
revealOnScroll();

window.addEventListener("load", revealOnScroll);
window.addEventListener("scroll", revealOnScroll);

["click", "touchstart", "keydown", "scroll"].forEach(function(eventName){
  window.addEventListener(eventName, startMusicOnFirstInteraction, { passive:true });
});
