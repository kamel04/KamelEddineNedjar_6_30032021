// ------Variables-----//
const skipeToContent = document.querySelector(".skipToContent");
const photographerGallery = document.getElementById("photographer-gallery");
const tagSelectList = document.getElementById("nav-taglist");
const tagSelectListChild = tagSelectList.children;

// ------Charger les données-----//
let URL =
  "https://kamel04.github.io/KamelEddineNedjar_6_30032021/public/data/FishEyeDataFR.json";
fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    // console.log(data.photographers[0].name);
    // console.log(data.photographers[0].city);
    // console.log(data.photographers[0].country);
    // console.log(data.photographers[0].tagline);
    // console.log(data.photographers[0].price);

    const photographers = data.photographers;
    for (let i = 0; i < photographers.length; i++) {
      photographers[i] = new Photographe(photographers[i]);
      photographerGallery.appendChild(photographers[i].generateCard());
    }
  });

// ------Crée Données du Photographe-----//
function Photographe(data) {
  this.id = data.id;
  this.portrait = data.portrait;
  this.name = data.name;
  this.city = data.city;
  this.country = data.country;
  this.tagline = data.tagline;
  this.price = data.price;
  this.tags = data.tags;

  this.generateCard = function () {
    const photographerCard = document.createElement("div");
    const photographerName = document.createElement("h2");
    const photographerDesc = document.createElement("p");
    const photographerTags = document.createElement("ul");

    photographerCard.classList.add("photographer-card");
    photographerName.classList.add("photographer-card-name");
    photographerDesc.classList.add("photographer-card-desc");

    photographerTags.classList.add("tagList");
    photographerTags.setAttribute("tabindex", "0");
    photographerTags.setAttribute("aria-label", "Tags");

    photographerName.innerHTML =
      '<a href="photographPage.html?id=' +
      this.id +
      '"> <img class="photograph-logo" src="public/img/photographID/' +
      this.portrait +
      '"> <br>' +
      this.name +
      "</a>";
    photographerDesc.innerHTML =
      "<strong>" +
      this.city +
      "," +
      this.country +
      "</strong> <br />" +
      this.tagline +
      "<br /> <em>" +
      this.price +
      "/jour</em>";

    for (let i = 0; i < this.tags.length; i++) {
      const tag = document.createElement("li");
      tag.innerHTML = "#" + this.tags[i];
      photographerTags.appendChild(tag);
    }
    photographerCard.appendChild(photographerName);
    photographerCard.appendChild(photographerDesc);
    photographerCard.appendChild(photographerTags);

    return photographerCard;
  };
}

//--------HTML carte Photographe-------//
/* <div class="photographer-card">
          <h2 class="photographer-card-name">
            <a href="photograph_page.html">
              <img
                class="photograph-logo"
                src="public/img/photographID/MimiKeel.jpg"
                alt="Mimi Keel"
              />
              <br />
              Mimi Keel
            </a>
          </h2>
          <p class="photographer-card-desc">
            <strong>London, UK</strong> <br />Voir le beau dans le quotidien<br />
            <em>400€/jour</em>
          </p>
          <ul class="tagList">
            <li><a>#Portrait</a></li>
            <li><a>#Events</a></li>
            <li><a>#Travel</a></li>
            <li><a>#Animals</a></li>
          </ul>
</div> */
