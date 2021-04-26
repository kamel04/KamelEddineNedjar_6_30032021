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
    console.log(photographerMediaList);
    let orderPopularity = generateOrderList(photographerMediaList, "popularity");
    const orderDate = generateOrderList(photographerMediaList, "date");
    const orderAlt = generateOrderList(photographerMediaList, "alt");
    const gallerySize = photographerMediaList.length;
    selectedOrder = orderPopularity;

    generateProfile(photographerIndex, photographerList, photographerMediaList);
    generateGallery(photographerMediaList);
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
      } else if (a.alt > b.alt) {
        return 1;
      } else {
        return 0;
      }
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
  photographerPrice.innerHTML = photographer.price + "$ / day";
}

//Génère la galerie du photographe

function generateGallery(mediaList, orderList) {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }

  for (let i = 0; i < mediaList.length; i++) {
    console.log(mediaList[orderList[i].index]);
    gallery.appendChild(generateMediaCard(mediaList[orderList[i].index]));
  }
}

//

//-----------------------Factory----------------------------//

// appel de la factory pour fabriquer les mediaCards
function generateMediaCard(media) {
  let card = new mediaCardParts("card", media);
  let desc = new mediaCardParts("desc", media);

  if (media.image == undefined) {
    let mediaObj = new mediaCardParts("video", media);
  } else {
    let mediaObj = new mediaCardParts("image", media);
  }
  card.mediaCard.appendChild(mediaObj.media);
  card.mediaCard.appendChild(desc.mediaDesc);

  return card.mediaCard;
}

class mediaCardParts {
  constructor(type, mediaData) {
    if (type === "card") {
      return new MediaFactory_card();
    }

    if (type === "desc") {
      return new MediaFactory_desc();
    }

    if (type === "video") {
      return new MediaFactory_video();
    }

    if (type === "image") {
      return new MediaFactory_img();
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
    this.media = document.createElement("div");
    this.media.classList.add("mesiaCard-img");
    this.media.classList.add("modalMedia-open");
    this.media.innerHTML =
      '<a href="#"> <img src="public/img/media"' +
      photographer.name +
      mediaData.image +
      ' alt ="vue rapprochée " ' +
      mediaData.alt +
      " </a>";
  }
}

//fabrique des médias vidéo
class MediaFactory_video {
  constructor(mediaData) {
    this.media = document.createElement("div");
    this.media.classList.add("mesiaCard-img");
    this.media.classList.add("modalMedia-open");
    this.media.innerHTML =
      '<a href="#"> <video src="public/img/media"' +
      photographer.name +
      mediaData.image +
      ' alt ="Vidéo de " ' +
      mediaData.alt +
      ' type="video/mp4" /video> </a>';
  }
}

class MediaFactory_desc {
  constructor(mediaData) {
    this.mediaDesc = document.createElement("div");
    this.mediaName = document.createElement("p");
    this.mediaPrice = document.createElement("p");
    this.mediaLike = document.createElement("p");

    this.mediaData.classList.add("mediaCard-desc");
    this.mediaName.classList.add("madiaCard-desc-name");
    this.mediaName.setAttribute("tabindex", "0");
    this.mediaPrice.classList.add("mediaCard-desc-number");
    this.mediaName.setAttribute("tabindex", "0");
    this.mediaLike.classList.add("mediaCard-desc-number");
    this.mediaLike.setAttribute("tabindex", "0");
    this.mediaLike.classList.add("add-like-btn");

    this.mediaName.innerHTML = mediaData.alt;
    this.mediaPrice.innerHTML = mediaData.price + " €";
    this.mediaLike.innerHTML =
      '<em class="invisible"> likes</em> <i class="fas fa-heart" aria-label="likes></i>';

    this.mediaDesc.appendChild(this.mediaName);
    this.mediaDesc.appendChild(this.mediaPrice);
    this.mediaDesc.appendChild(this.mediaLike);
  }
}
