const weddingDate = new Date("2026-12-13T17:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  document.getElementById("days").textContent =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("hours").textContent =
    Math.floor((distance / (1000 * 60 * 60)) % 24);

  document.getElementById("minutes").textContent =
    Math.floor((distance / (1000 * 60)) % 60);

  document.getElementById("seconds").textContent =
    Math.floor((distance / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

let musicPlaying = false;

function toggleMusic() {
  const music = document.getElementById("weddingMusic");
  const icon = document.getElementById("musicIcon");
  const text = document.getElementById("musicText");

  if (!musicPlaying) {
    music.play().then(() => {
      musicPlaying = true;
      icon.classList.add("playing");
      text.textContent = "En cours";
    }).catch(() => {
      text.textContent = "Cliquer pour écouter";
    });
  } else {
    music.pause();
    musicPlaying = false;
    icon.classList.remove("playing");
    text.textContent = "Écouter";
  }
}

window.addEventListener("load", () => {
  const music = document.getElementById("weddingMusic");
  const icon = document.getElementById("musicIcon");
  const text = document.getElementById("musicText");

  music.volume = 0.65;

  music.play().then(() => {
    musicPlaying = true;
    icon.classList.add("playing");
    text.textContent = "En cours";
  }).catch(() => {
    text.textContent = "Cliquer pour écouter";
  });

  revealOnScroll();
});

function changeCount(id, delta) {
  const input = document.getElementById(id);
  let value = parseInt(input.value) || 0;

  value += delta;

  if (value < 0) value = 0;

  input.value = value;
}

function handleRsvpSubmit() {

  const civil = Number(document.getElementById("nbCivil").value);
  const religieux = Number(document.getElementById("nbReligieux").value);

  const error = document.getElementById("rsvpError");

  if (civil === 0 && religieux === 0) {
    error.textContent = "Merci d'indiquer au moins une présence.";
    return false;
  }

  error.textContent = "";

  const button = document.getElementById("rsvpSubmit");
  button.innerHTML = "⏳ Enregistrement...";
  button.disabled = true;

  setTimeout(() => {

    document.querySelector(".premium-rsvp").style.display = "none";
    document.getElementById("rsvpThanks").style.display = "block";

  }, 900);

  return true;
}

function revealOnScroll() {

  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {

    const top = element.getBoundingClientRect().top;

    if (top < window.innerHeight * 0.88) {

      element.classList.add("visible");

    }

  });

}

window.addEventListener("scroll", revealOnScroll);
