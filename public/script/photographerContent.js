const gallery = document.getElementById("mediaGallery");
const photographerName = document.getElementById("photographerName");
const photographerDesc = document.getElementById("photographerDesc");
const photographerTags = document.getElementById("photographerTags");
const photographerProfilePhoto = document.getElementById("photographerProfilePhoto");
const photographerLikes = document.getElementById("photographerLikes");
const photographerPrice = document.getElementById("photographerPrice");
const selectOrder_roll = document.getElementById("selectedOrder");

const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get("id");

let selectedOrder;
let modalMediaIndex = 0;

const URL = "https://kamel04.github.io/KamelEddineNedjar_6_30032021/public/data/FishEyeDataFR.json";

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    //console.log(data);
    const mediaList = data.media;
    const photographerList = data.photographers;
    const photographerIndex = getPhotographer(photographerID, photographerList);
    const photographerMediaList = getPhotographerMediaList(photographerID, mediaList);
    let orderPopularity = generateOrderList(photographerMediaList, "popularity");
    const orderDate = generateOrderList(photographerMediaList, "date");
    const orderAlt = generateOrderList(photographerMediaList, "alt");
    const gallerySize = photographerMediaList.length;
    selectedOrder = orderPopularity;

    console.log(photographerIndex);
    console.log(photographerList);
    console.log(photographerMediaList);
    console.log(selectedOrder);

    generateProfile(photographerIndex, photographerList, photographerMediaList);
    generateGallery(photographerMediaList, selectedOrder);
    generateModalMediaClick();

    // Appliquer le tri de selection
    selectOrder_roll.addEventListener("change", (e) => {
      if (e.target.value == "date") {
        selectedOrder = orderDate;
      } else if (e.target.value == "title") {
        selectedOrder = orderAlt;
      } else {
        selectedOrder = orderPopularity;
      }
      generateGallery(photographerMediaList, selectedOrder);
      generateModalMediaClick();
      console.log(selectedOrder);
    });

    // Récupérer les donnée de l'index
    function getModalMedia(modalIndex) {
      const index = selectedOrder[modalIndex].index;
      return photographerMediaList[index];
    }

    // Générer la modale des médias
    function generateFocusElement(modalIndex) {
      const media = getModalMedia(modalIndex);
      if (media.image == undefined) {
        imgShow.innerHTML =
          '<video tabIndex=0 controls> <source src="public/img/media/' +
          media.video +
          '" type="video/mp4">' +
          media.alt +
          "</video>";
      } else {
        imgShow.innerHTML =
          '<a href="#"><img src="public/img/media/' +
          media.image +
          '" alt ="vue rapprochée " ' +
          media.alt +
          "/></a>";
      }
      imgName.innerHTML = media.alt;
    }

    // évènement passer au média suivant
    nextImg.addEventListener("click", ($e) => {
      $e.preventDefault();
      goToNextImg();
    });

    function goToNextImg() {
      modalMediaIndex = makeItRoll(modalMediaIndex, gallerySize, "forward");
      generateFocusElement(modalMediaIndex);
      imgShow.firstChild.focus();
    }

    // évènement passer au média précédent
    prevImg.addEventListener("click", ($e) => {
      $e.preventDefault();
      goToPrevImg();
    });

    function goToPrevImg() {
      modalMediaIndex = makeItRoll(modalMediaIndex, gallerySize, "backward");
      generateFocusElement(modalMediaIndex);
      imgShow.firstChild.focus();
    }

    // navigation au clavier
    modalMedia.addEventListener("keyup", function (e) {
      if (e.key === "Escape") {
        closeModalMedia();
      }
      if (e.key == "ArrowLeft") {
        goToPrevImg();
      }
      if (e.key == "ArrowRight") {
        goToNextImg();
      }
    });

    // Clique sur un média ou sur un like
    function generateModalMediaClick() {
      let modalMediaOpener = document.getElementsByClassName("modalMedia-open");
      let likeButton = document.getElementsByClassName("add-like-btn");

      for (let i = 0; i < modalMediaOpener.length; i++) {
        modalMediaOpener[i].addEventListener("click", () => {
          launchModalMedia();
          modalMediaIndex = i;
          generateFocusElement(modalMediaIndex);
          modalMedia.focus();
        });

        likeButton[i].addEventListener("click", () => {
          likeButton[i].innerHTML =
            parseInt(likeButton[i].textContent, 10) + 1 + '<i class="fas fa-heart"></i>';
          photographerLikes.innerHTML =
            parseInt(photographerLikes.textContent, 10) + 1 + '<i class="fas fa-heart"></i>';

          for (let j = 0; j < photographerMediaList.length; j++) {
            if (orderPopularity[i].alt == photographerMediaList[j].alt) {
              photographerMediaList[j].likes = parseInt(photographerMediaList[j].likes) + 1;
            }
          }

          if (i > 0) {
            if (
              photographerMediaList[orderPopularity[i].index].likes >
              photographerMediaList[orderPopularity[i - 1].index].likes
            ) {
              let temp = orderPopularity[i];
              orderPopularity[i] = orderPopularity[i - 1];
              orderPopularity[i - 1] = temp;
              if (selectOrder_roll.value == "popularity") {
                selectedOrder = orderPopularity;
                generateGallery(photographerMediaList, selectedOrder);
                generateModalMediaClick();
              }
            }
          }
        });
      }
    }
  });

// sélectionner le photographe en fonction de son id
function getPhotographer(ID, photographerList) {
  let photographerIndex;
  for (let i = 0; i < photographerList.length; i++) {
    if (photographerList[i].id == ID) {
      photographerIndex = i;
      return i;
    }
  }
}

// liste des médias du photographe en fonction de son id
function getPhotographerMediaList(ID, baseMediaList) {
  let mediaList = [];
  for (let i = 0; i < baseMediaList.length; i++) {
    if (baseMediaList[i].photographerId == ID) {
      mediaList.push(baseMediaList[i]);
    }
  }
  return mediaList;
}

// générer une nouvelle liste d'index réorganisée en fonction du type
function generateOrderList(mediaList, type) {
  let orderList = [];
  for (let i = 0; i < mediaList.length; i++) {
    const mediaItem = {
      index: i,
      likes: mediaList[i].likes,
      date: mediaList[i].date,
      alt: mediaList[i].alt,
    };
    orderList.push(mediaItem);
  }

  if (type == "alt") {
    return orderList.sort(function (a, b) {
      if (a.alt < b.alt) {
        return -1;
      }
      if (a.alt > b.alt) {
        return 1;
      }
      return 0;
    });
  } else if (type == "date") {
    return orderList.sort(function (a, b) {
      // Transforme les chaînes en dates
      return new Date(b.date) - new Date(a.date);
    });
  } else {
    return orderList.sort((a, b) => b.likes - a.likes);
  }
}

// Génère le profil du photographe et le footer
function generateProfile(index, photographerList, photographerMediaList) {
  const photographer = photographerList[index];

  let sumOfLikes = 0;
  for (let i = 0; i < photographerMediaList.length; i++) {
    sumOfLikes += photographerMediaList[i].likes;
  }

  photographerName.innerText = photographer.name;
  photographerDesc.innerHTML =
    "<strong>" +
    photographer.city +
    ", " +
    photographer.country +
    "</strong> <br>" +
    photographer.tagline +
    "<br>";
  for (var i = 0; i < photographer.tags.length; i++) {
    const tag = document.createElement("li");
    tag.innerHTML = "#" + photographer.tags[i];
    photographerTags.appendChild(tag);
  }
  photographerProfilePhoto.innerHTML =
    '<img tabindex=0 class="photograph-logo" src="public/img/photographID/' +
    photographer.portrait +
    '" alt="' +
    photographer.name +
    '" >';
  photographerLikes.innerHTML =
    sumOfLikes + ' <em class="invisible"> likes</em> <i class="fas fa-heart"></i>';
  photographerPrice.innerHTML = photographer.price + "€ / jour";

  modalForm_title.innerHTML = "Contactez-moi <br>" + photographer.name;
}

//Génère la galerie du photographe

function generateGallery(mediaList, orderList) {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }

  for (let i = 0; i < mediaList.length; i++) {
    gallery.appendChild(generateMediaCard(mediaList[orderList[i].index]));
  }
}

//

//-----------------------Factory----------------------------//

// appel de la factory pour fabriquer les mediaCards
function generateMediaCard(media) {
  let cardObj = new mediaCardParts("card", media);
  let descObj = new mediaCardParts("desc", media);

  if (media.image == undefined) {
    var mediaObj = new mediaCardParts("video", media);
  } else {
    var mediaObj = new mediaCardParts("image", media);
  }
  cardObj.mediaCard.appendChild(mediaObj.mediaMedia);
  cardObj.mediaCard.appendChild(descObj.mediaDesc);

  return cardObj.mediaCard;
}

class mediaCardParts {
  constructor(type, mediaData) {
    if (type === "card") {
      return new MediaFactory_card();
    }

    if (type === "desc") {
      return new MediaFactory_desc(mediaData);
    }

    if (type === "video") {
      return new MediaFactory_video(mediaData);
    }

    if (type === "image") {
      return new MediaFactory_img(mediaData);
    }
  }
}

// fabrique des MediaCard
class MediaFactory_card {
  constructor() {
    this.mediaCard = document.createElement("div");
    this.mediaCard.classList.add("mediaCard");
  }
}

//fabrique des médias image
class MediaFactory_img {
  constructor(mediaData) {
    this.mediaMedia = document.createElement("div");
    this.mediaMedia.classList.add("mediaCard-img");
    this.mediaMedia.classList.add("modalMedia-open");

    // <a href="#"><img src="public/img/FishEyeLOGO.png" alt="FishEye Home page" class="header-logo"/></a>
    this.mediaMedia.innerHTML =
      '<a href="#"><img src="public/img/media/' +
      mediaData.image +
      '" alt ="vue rapprochée " ' +
      mediaData.alt +
      "/></a>";
  }
}

//fabrique des médias vidéo
class MediaFactory_video {
  constructor(mediaData) {
    this.mediaMedia = document.createElement("div");
    this.mediaMedia.classList.add("mediaCard-img");
    this.mediaMedia.classList.add("modalMedia-open");
    this.mediaMedia.innerHTML =
      '<a href="#"><video alt ="Vidéo de ' +
      mediaData.alt +
      '"> <source src="public/img/media/' +
      mediaData.video +
      '" type="video/mp4">' +
      mediaData.alt +
      "</video></a>";
  }
}

class MediaFactory_desc {
  constructor(mediaData) {
    this.mediaDesc = document.createElement("div");
    this.mediaName = document.createElement("p");
    this.mediaPrice = document.createElement("p");
    this.mediaLike = document.createElement("p");

    this.mediaDesc.classList.add("mediaCard-desc");
    this.mediaName.classList.add("mediaCard-desc-name");
    this.mediaName.setAttribute("tabindex", "0");
    this.mediaPrice.classList.add("mediaCard-desc-number");
    this.mediaName.setAttribute("tabindex", "0");
    this.mediaLike.classList.add("mediaCard-desc-number");
    this.mediaLike.setAttribute("tabindex", "0");
    this.mediaLike.classList.add("add-like-btn");

    this.mediaName.innerHTML = mediaData.alt;
    this.mediaPrice.innerHTML = mediaData.price + " €";
    this.mediaLike.innerHTML =
      mediaData.likes +
      ' <em class="invisible">likes</em><i class="fas fa-heart" aria-label="likes"></i>';

    this.mediaDesc.appendChild(this.mediaName);
    this.mediaDesc.appendChild(this.mediaPrice);
    this.mediaDesc.appendChild(this.mediaLike);
  }
}
