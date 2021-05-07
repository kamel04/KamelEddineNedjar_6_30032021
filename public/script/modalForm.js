// variables
const modalForm = document.getElementById("modalForm");
const modalForm_Open = document.getElementById("modalForm-open");
const modalForm_Close = document.getElementById("modalForm-close");
const modalForm_Submit = document.getElementById("modalForm-submit");
const modalForm_title = document.getElementById("modalForm-title");

const formFirst = document.getElementById("first");
const formLast = document.getElementById("last");
const formEmail = document.getElementById("email");
const formMessage = document.getElementById("message");

const first_errMessage = document.getElementById("first-errorMessage");
const last_errMessage = document.getElementById("last-errorMessage");
const email_errMessage = document.getElementById("email-errorMessage");
const message_errMessage = document.getElementById("message-errorMessage");
const submitSucess_message = document.getElementById("message-submitSucess");

// lancer la modale
modalForm_Open.addEventListener("click", ($e) => {
  $e.preventDefault();
  launchModalForm();
});

function launchModalForm() {
  modalForm.style.display = "block";
  modalForm_Open.style.display = "none";
  modalForm.focus();
}

// fermer la modale
modalForm_Close.addEventListener("click", ($e) => {
  $e.preventDefault();
  closeModalForm();
});

function closeModalForm() {
  modalForm.style.display = "none";
  modalForm_Open.style.display = "block";

  // effacer les messages
  first_errMessage.style.display = "none";
  last_errMessage.style.display = "none";
  email_errMessage.style.display = "none";
  message_errMessage.style.display = "none";
  submitSucess_message.style.display = "none";

  modalForm_Open.focus();
}

// confirmer le format de l'email
function confirmEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// valider les entrées et message d'erreur
function validateFirst() {
  if (formFirst.value.length < 2) {
    first_errMessage.textContent = "Veuillez saisir plus de 2 caractères dans le champ du Prénom";
    first_errMessage.style.display = "block";
    return false;
  } else {
    first_errMessage.style.display = "none";
    return true;
  }
}

function validateLast() {
  if (formLast.value.length < 2) {
    last_errMessage.textContent = "Veuillez saisir plus de 2 caractères dans le champ du Nom";
    last_errMessage.style.display = "block";
    return false;
  } else {
    last_errMessage.style.display = "none";
    return true;
  }
}

function validateEmail() {
  if (!confirmEmail(formEmail.value)) {
    email_errMessage.textContent = "Vous devez entrer un e-mail valide";
    email_errMessage.style.display = "block";
    return false;
  } else {
    email_errMessage.style.display = "none";
    return true;
  }
}

function validateMessage() {
  if (formMessage.value.length < 10 || formMessage.value.length > 250) {
    message_errMessage.textContent = "Veuillez saisir un message de 10 à 250 caractères";
    message_errMessage.style.display = "block";
    return false;
  } else {
    message_errMessage.style.display = "none";
    return true;
  }
}

// Submit button
// Prevent the normal messages of the input to appear / and to reload
// Valide every input one by one (could aslo be all together)
// If OK, print a success message and open the success screen after 2s
modalForm_Submit.addEventListener("click", ($e) => {
  $e.preventDefault();
  submitForm();
});

function submitForm() {
  if (validateFirst() && validateLast() && validateEmail() && validateMessage()) {
    publishForm();
    submitSucess_message.style.display = "block";
    setTimeout(closeModalForm, 4000);
    setTimeout(cleanForm, 4000);
  }
}

// réinitialiser les champs
function cleanForm() {
  formFirst.value = "";
  formLast.value = "";
  formEmail.value = "";
  formMessage.value = "";
}

function publishForm() {
  console.log(formFirst.value);
  console.log(formLast.value);
  console.log(formEmail.value);
  console.log(formMessage.value);
}

// contrôler l'envoie et la fermeture au clavier
modalForm.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    closeModalForm();
  }
  if (e.key === "Enter") {
    submitForm();
  }
});
