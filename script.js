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

updateCountdown();
setInterval(updateCountdown, 1000);
