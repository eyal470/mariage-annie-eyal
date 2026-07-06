const weddingDate = new Date("2026-12-13T17:00:00").getTime();

let musicPlaying = false;
let musicStartedOnce = false;
let rsvpSubmitted = false;
let rsvpThanksShown = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        ["days", "hours", "minutes", "seconds"].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = "0";
        });
        return;
    }

    setText("days", Math.floor(distance / (1000 * 60 * 60 * 24)));
    setText("hours", Math.floor((distance / (1000 * 60 * 60)) % 24));
    setText("minutes", Math.floor((distance / (1000 * 60)) % 60));
    setText("seconds", Math.floor((distance / 1000) % 60));
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function toggleMusic() {
    const music = document.getElementById("weddingMusic");
    const icon = document.getElementById("musicIcon");
    const text = document.getElementById("musicText");

    if (!music) return;

    if (!musicPlaying) {
        music.play()
            .then(() => {
                musicPlaying = true;
                musicStartedOnce = true;
                if (icon) icon.classList.add("playing");
                if (text) text.textContent = "En cours";
            })
            .catch(() => {
                if (text) text.textContent = "Cliquer pour écouter";
            });
    } else {
        music.pause();
        musicPlaying = false;
        if (icon) icon.classList.remove("playing");
        if (text) text.textContent = "Écouter";
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
            if (icon) icon.classList.add("playing");
            if (text) text.textContent = "En cours";
        })
        .catch(() => {
            if (text) text.textContent = "Cliquer pour écouter";
        });
}

function changeCount(id, delta) {
    const input = document.getElementById(id);
    if (!input) return;

    input.value = Math.max(0, (Number(input.value) || 0) + delta);
}

function toggleEventCount(eventName, isYes) {
    const panel = document.getElementById(eventName + "Count");
    const input = eventName === "civil"
        ? document.getElementById("nbCivil")
        : document.getElementById("nbReligieux");

    if (!panel || !input) return;

    if (isYes) {
        panel.classList.add("is-visible");
        if (Number(input.value) === 0) input.value = 1;
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

    const civil = Number(document.getElementById("nbCivil")?.value) || 0;
    const religieux = Number(document.getElementById("nbReligieux")?.value) || 0;

    const error = document.getElementById("rsvpError");
    const submit = document.getElementById("rsvpSubmit");

    if (error) error.textContent = "";

    if (!civilResponse || !religieuxResponse) {
        if (error) error.textContent = "Merci de répondre pour les deux événements.";
        return false;
    }

    if (civilResponse === "Oui" && civil === 0) {
        if (error) error.textContent = "Merci d’indiquer le nombre de personnes pour le mariage civil.";
        return false;
    }

    if (religieuxResponse === "Oui" && religieux === 0) {
        if (error) error.textContent = "Merci d’indiquer le nombre de personnes pour la Houppa.";
        return false;
    }

    rsvpSubmitted = true;
    rsvpThanksShown = false;

    if (submit) {
        submit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i><span>Enregistrement...</span>';
        submit.classList.add("is-loading");
    }

    setTimeout(() => {
        showRsvpThanks();
    }, 350);

    return true;
}

function showRsvpThanks() {
    if (!rsvpSubmitted || rsvpThanksShown) return;

    rsvpThanksShown = true;

    const form = document.querySelector(".premium-rsvp");
    const thanks = document.getElementById("rsvpThanks");
    const submit = document.getElementById("rsvpSubmit");

    if (form && thanks) {
        form.style.display = "none";
        thanks.style.display = "block";
        launchConfetti();
        thanks.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (submit) {
        submit.classList.remove("is-loading");
        submit.innerHTML = '<i class="fa-solid fa-check"></i><span>Réponse enregistrée</span>';
    }
}

function launchConfetti() {
    const layer = document.getElementById("confettiLayer");
    if (!layer) return;

    layer.innerHTML = "";

    const colors = ["#d6b56d", "#f3dfaa", "#fffdf7", "#c8a86b", "#ffffff"];
    const total = window.innerWidth < 760 ? 70 : 110;

    for (let i = 0; i < total; i++) {
        const confetti = document.createElement("span");

        confetti.className = Math.random() > 0.72 ? "confetti round" : "confetti";
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 0.7}s`;
        confetti.style.setProperty("--x-drift", `${(Math.random() - 0.5) * 220}px`);
        confetti.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);

        layer.appendChild(confetti);
    }

    setTimeout(() => {
        layer.innerHTML = "";
    }, 4200);
}

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;

    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < trigger) {
            el.classList.add("visible");
        }
    });
}

function updateHeroParallax() {
    const heroBg = document.querySelector(".hero-bg");
    if (!heroBg) return;

    const y = window.scrollY;
    heroBg.style.transform = `translateY(${y * 0.18}px) scale(1.08)`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

revealOnScroll();
updateHeroParallax();

window.addEventListener("load", () => {
    revealOnScroll();
    updateHeroParallax();

    const iframe = document.getElementById("hidden_iframe");
    if (iframe) {
        iframe.addEventListener("load", showRsvpThanks);
    }
});

window.addEventListener("scroll", () => {
    revealOnScroll();
    updateHeroParallax();
}, { passive: true });

["click", "touchstart", "keydown", "scroll"].forEach(event => {
    window.addEventListener(event, startMusicOnFirstInteraction, {
        once: false,
        passive: true
    });
});
