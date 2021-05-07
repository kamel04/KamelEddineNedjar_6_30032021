// variables
const modalMedia = document.getElementById("modalMedia");
const modalMedia_Close = document.getElementById("modalMedia-close");
const imgShow = document.getElementById("imgShow");
const imgName = document.getElementById("imgName");
const prevImg = document.getElementById("navButton-left");
const nextImg = document.getElementById("navButton-right");

// lancer la modale des médias
function launchModalMedia() {
  modalMedia.style.display = "block";
}

// clique fermer le modale des médias
modalMedia_Close.addEventListener("click", ($e) => {
  $e.preventDefault();
  closeModalMedia();
});

// fermer la modale
function closeModalMedia() {
  modalMedia.style.display = "none";
  var focuseableMedia = document.getElementsByClassName("modalMedia-open");
  focuseableMedia[modalMediaIndex].firstChild.focus();
}

// navigation dans les médias
function makeItRoll(indexInitial, gallerySize, direction) {
  if (direction == "forward") {
    if (indexInitial >= gallerySize - 1) {
      return 0;
    } else {
      return indexInitial + 1;
    }
  } else {
    if (indexInitial <= 0) {
      return gallerySize - 1;
    } else {
      return indexInitial - 1;
    }
  }
}
