
function changeCount(id, delta){
  const input = document.getElementById(id);
  const current = Number(input.value) || 0;
  input.value = Math.max(0, current + delta);
}

function handleRsvpSubmit(){
  const civil = Number(document.getElementById("nbCivil").value) || 0;
  const religieux = Number(document.getElementById("nbReligieux").value) || 0;
  const error = document.getElementById("rsvpError");
  const submit = document.getElementById("rsvpSubmit");

  error.textContent = "";

  if(civil === 0 && religieux === 0){
    error.textContent = "Merci d’indiquer au moins une présence.";
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
