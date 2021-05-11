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

//fabrique du descriptif
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
