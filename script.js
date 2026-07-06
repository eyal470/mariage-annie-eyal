const weddingDate = new Date("2026-12-13T17:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const d = weddingDate - now;

    if (d <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            document.getElementById(id).textContent = "0";
        });
        return;
    }

    document.getElementById("days").textContent = Math.floor(d / (1000 * 60 * 60 * 24));
    document.getElementById("hours").textContent = Math.floor((d / (1000 * 60 * 60)) % 24);
    document.getElementById("minutes").textContent = Math.floor((d / (1000 * 60)) % 60);
    document.getElementById("seconds").textContent = Math.floor((d / 1000) % 60);
}

let musicPlaying = false;
let musicStartedOnce = false;

function toggleMusic() {
    const music = document.getElementById("weddingMusic");
    const icon = document.getElementById("musicIcon");
    const text = document.getElementById("musicText");

    if (!musicPlaying) {
        music.play()
            .then(() => {
                musicPlaying = true;
                musicStartedOnce = true;
                icon.classList.add("playing");
                text.textContent = "En cours";
            })
            .catch(() => {
                text.textContent = "Cliquer pour écouter";
            });
    } else {
        music.pause();
        musicPlaying = false;
        icon.classList.remove("playing");
        text.textContent = "Écouter";
    }
}

function startMusicOnFirstInteraction() {
    if (musicStartedOnce) return;

    const music = document.getElementById("weddingMusic");
    const icon = document.getElementById("musicIcon");
    const text = document.getElementById("musicText");

    if (!music) return;

    music.volume = 0.65;

    music.play()
        .then(() => {
            musicPlaying = true;
            musicStartedOnce = true;
            icon.classList.add("playing");
            text.textContent = "En cours";
        })
        .catch(() => {
            text.textContent = "Cliquer pour écouter";
        });
}

function changeCount(id, delta) {
    const input = document.getElementById(id);
    input.value = Math.max(0, (Number(input.value) || 0) + delta);
}

function toggleEventCount(eventName, isYes) {
    const panel = document.getElementById(eventName + "Count");

    const input =
        eventName === "civil"
            ? document.getElementById("nbCivil")
            : document.getElementById("nbReligieux");

    if (isYes) {
        panel.classList.add("is-visible");

        if (Number(input.value) === 0) {
            input.value = 1;
        }
    } else {
        panel.classList.remove("is-visible");
        input.value = 0;
    }
}

function getRadioValue(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "";
}

function handleRsvpSubmit() {
    const civilResponse = getRadioValue("civilResponse");
    const religieuxResponse = getRadioValue("religieuxResponse");

    const civil = Number(document.getElementById("nbCivil").value) || 0;
    const religieux = Number(document.getElementById("nbReligieux").value) || 0;

    const error = document.getElementById("rsvpError");
    const submit = document.getElementById("rsvpSubmit");

    error.textContent = "";

    if (!civilResponse || !religieuxResponse) {
        error.textContent = "Merci de répondre pour les deux événements.";
        return false;
    }

    if (civilResponse === "Oui" && civil === 0) {
        error.textContent = "Merci d’indiquer le nombre de personnes pour le mariage civil.";
        return false;
    }

    if (religieuxResponse === "Oui" && religieux === 0) {
        error.textContent = "Merci d’indiquer le nombre de personnes pour la Houppa.";
        return false;
    }

    submit.textContent = "Enregistrement...";
    submit.classList.add("is-loading");

    setTimeout(() => {
    const form = document.querySelector(".premium-rsvp");
    const thanks = document.getElementById("rsvpThanks");

    if (form && thanks) {
        form.style.display = "none";
        thanks.style.display = "block";
        launchConfetti();
    }
}, 900);
    return true;
}

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("visible");
        }
    });
}

/* Parallax premium du Hero */
function updateHeroParallax() {
    const heroBg = document.querySelector(".hero-bg");

    if (!heroBg) return;

    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.18}px) scale(1.08)`;
}

/* Initialisation */
updateCountdown();
setInterval(updateCountdown, 1000);

revealOnScroll();
updateHeroParallax();

window.addEventListener("load", () => {
    revealOnScroll();
    updateHeroParallax();
});

window.addEventListener("scroll", () => {
    revealOnScroll();
    updateHeroParallax();
});

["click", "touchstart", "keydown", "scroll"].forEach(event => {
    window.addEventListener(event, startMusicOnFirstInteraction, {
        once: false,
        passive: true
    });
});

function launchConfetti() {
    const layer = document.getElementById("confettiLayer");
    if (!layer) return;

    layer.innerHTML = "";

    const colors = ["#d6b56d", "#f3dfaa", "#ffffff", "#c8a86b", "#172033"];

    for (let i = 0; i < 42; i++) {
        const confetti = document.createElement("span");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.45 + "s";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        layer.appendChild(confetti);
    }

    setTimeout(() => {
        layer.innerHTML = "";
    }, 3200);
}
