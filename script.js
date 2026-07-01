const weddingDate = new Date("2026-12-13T17:00:00").getTime();
function updateCountdown(){const now=new Date().getTime();const distance=weddingDate-now;if(distance<=0){document.getElementById("days").textContent="0";document.getElementById("hours").textContent="0";document.getElementById("minutes").textContent="0";document.getElementById("seconds").textContent="0";return}document.getElementById("days").textContent=Math.floor(distance/(1000*60*60*24));document.getElementById("hours").textContent=Math.floor((distance/(1000*60*60))%24);document.getElementById("minutes").textContent=Math.floor((distance/(1000*60))%60);document.getElementById("seconds").textContent=Math.floor((distance/1000)%60)}
let musicPlaying=false;function toggleMusic(){const music=document.getElementById("weddingMusic");const icon=document.getElementById("musicIcon");const text=document.getElementById("musicText");if(!musicPlaying){music.play();musicPlaying=true;icon.classList.add("playing");text.textContent="En cours"}else{music.pause();musicPlaying=false;icon.classList.remove("playing");text.textContent="Écouter"}}
function changeCount(id,delta){const input=document.getElementById(id);const current=Number(input.value)||0;input.value=Math.max(0,current+delta)}
function handleRsvpSubmit(){const civil=Number(document.getElementById("nbCivil").value)||0;const religieux=Number(document.getElementById("nbReligieux").value)||0;const error=document.getElementById("rsvpError");const submit=document.getElementById("rsvpSubmit");error.textContent="";if(civil===0&&religieux===0){error.textContent="Merci d’indiquer au moins une présence.";return false}submit.textContent="Enregistrement...";submit.classList.add("is-loading");setTimeout(function(){const form=document.querySelector(".premium-rsvp");const thanks=document.getElementById("rsvpThanks");if(form&&thanks){form.style.display="none";thanks.style.display="block"}},900);return true}
function revealOnScroll(){const reveals=document.querySelectorAll(".reveal");const trigger=window.innerHeight*.88;reveals.forEach((el)=>{if(el.getBoundingClientRect().top<trigger){el.classList.add("visible")}})}
updateCountdown();setInterval(updateCountdown,1000);revealOnScroll();window.addEventListener("scroll",revealOnScroll);window.addEventListener("load", function () {
  const music = document.getElementById("weddingMusic");
  const icon = document.getElementById("musicIcon");
  const text = document.getElementById("musicText");

  music.play().then(() => {
    musicPlaying = true;
    icon.classList.add("playing");
    text.textContent = "En cours";
  }).catch(() => {
    text.textContent = "Cliquer pour écouter";
  });
});
