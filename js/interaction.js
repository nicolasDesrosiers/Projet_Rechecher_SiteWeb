// import { Application } from '@splinetool/runtime';

// const canvas = document.getElementById('canvas3d');
// const app = new Application(canvas);
// app.load('https://prod.spline.design/tiJHqFZeNXzCYCE3/scene.splinecode');

// enlever le spline

//window.onload = function () {
// Get all instances of spline-viewer
//var splineViewers = document.querySelectorAll('spline-viewer');

// Iterate over each instance
// splineViewers.forEach(function (splineViewer) {
// Access the shadow root of each instance
//var shadowRoot = splineViewer.shadowRoot;

// Check if the shadow root and #logo element exist before removing
//if (shadowRoot && shadowRoot.querySelector('#logo')) {
// Remove the #logo element
//shadowRoot.querySelector('#logo').remove();
//}
//});
//}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//___________________________________________ FONCTION ENLEVER LE LOGO SPLINE ___________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.onload = function () {
  var shadowRoot = document.querySelector("spline-viewer").shadowRoot;
  shadowRoot.querySelector("#logo").remove();
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_____________________________________FONCTION POUR LE CAROUSSEL IMAGE CREATION ________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Définit une fonction deplacer qui prend la direction (gauche ou droite) comme paramètre
function deplacer(direction) {
  // Sélectionne tous les éléments de classe "img__creation" dans le document
  let elements = document.querySelectorAll(".img__creation");
  // Stocke la première image dans firstImg
  let firstImg = elements[0];
  // Stocke la dernière image dans lastImg
  let lastImg = elements[elements.length - 1];

  // Si la direction est "droite"
  if (direction === "droite") {
    // Récupère le style de la première image
    let style = window.getComputedStyle(firstImg);
    // Récupère l'URL de l'image de fond de la première image
    let backgroundImage = style.getPropertyValue("background-image");

    // Parcourt les éléments, en commençant par le deuxième élément
    for (let i = 0; i < elements.length - 1; i++) {
      // Récupère le style de l'élément suivant dans la liste
      let nextStyle = window.getComputedStyle(elements[i + 1]);
      // Définit l'image de fond de l'élément actuel comme l'image de fond de l'élément suivant
      elements[i].style.backgroundImage =
        nextStyle.getPropertyValue("background-image");
    }
    // Met à jour l'image de fond de la dernière image avec l'image de fond de la première image
    lastImg.style.backgroundImage = backgroundImage;
  }
  // Si la direction est "gauche"
  else if (direction === "gauche") {
    // Récupère le style de la dernière image
    let style = window.getComputedStyle(lastImg);
    // Récupère l'URL de l'image de fond de la dernière image
    let backgroundImage = style.getPropertyValue("background-image");

    // Parcourt les éléments, en commençant par l'avant-dernier élément
    for (let i = elements.length - 1; i > 0; i--) {
      // Récupère le style de l'élément précédent dans la liste
      let prevStyle = window.getComputedStyle(elements[i - 1]);
      // Définit l'image de fond de l'élément actuel comme l'image de fond de l'élément précédent
      elements[i].style.backgroundImage =
        prevStyle.getPropertyValue("background-image");
    }
    // Met à jour l'image de fond de la première image avec l'image de fond de la dernière image
    firstImg.style.backgroundImage = backgroundImage;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_________________________________________ FONCTION POUR LE RENDU AVANT/APRES __________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Variable 'active' pour savoir quand nous l'utilisons
let active = false;

// Surveiller les clics sur notre barre de défilement
document.querySelector(".scroller").addEventListener("mousedown", function () {
  active = true;
  // Classe de défilement pour que la barre de défilement ait une opacité maximale lorsqu'elle est active
  document.querySelector(".scroller").classList.add("scrolling");
});

// Configuration des écouteurs d'événements
document.body.addEventListener("mouseup", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});
document.body.addEventListener("mouseleave", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});

// Déterminer où se trouve la souris
document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  // La souris est ici
  let x = e.pageX;
  // mais elle est relative au conteneur
  x -= document.querySelector(".wrapper").getBoundingClientRect().left;
  scrollIt(x);
});

// Fonction pour le scroll
function scrollIt(x) {
  let transform = Math.max(
    0,
    Math.min(x, document.querySelector(".wrapper").offsetWidth)
  );
  document.querySelector(".after").style.width = transform + "px";
  document.querySelector(".scroller").style.left = transform - 25 + "px";
}

// État initial en fonction de la largeur,
// Montrer un peu des deux images pour que l'utilisateur puisse voir ce qui se passe
scrollIt(150);

// Répétitions du processus pour les événements tactiles
document.querySelector(".scroller").addEventListener("touchstart", function () {
  active = true;
  document.querySelector(".scroller").classList.add("scrolling");
});
document.body.addEventListener("touchend", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});
document.body.addEventListener("touchcancel", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_________________________________________ FONCTION POUR LES BOITES MODALES ______________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sélectionne tous les éléments avec la classe gif__outil
const gifOutils = document.querySelectorAll(".gif__outil");

// Ajoute un gestionnaire d'événements à chaque élément .gif__outil
gifOutils.forEach((gifOutil) => {
  gifOutil.addEventListener("click", () => {
    // Récupère l'identifiant de la boîte modale à ouvrir
    const modalId = gifOutil.getAttribute("data-modal");
    // Affiche la boîte modale correspondante
    const modal = document.querySelector("#" + modalId); // Sélectionne par classe
    console.log(modal);
    modal.style.display = "block";
  });
});
// Sélectionne tous les éléments pour fermer la boîte modale
const closeButtons = document.querySelectorAll(".close");

// Ajoute un gestionnaire d'événements à chaque bouton de fermeture
closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    // Sélectionne la boîte modale parente du bouton de fermeture
    const modal = closeButton.closest(".modal");
    // Cache la boîte modale
    modal.style.display = "none";
  });
});

// Ferme la boîte modale si l'utilisateur clique en dehors de celle-ci
window.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});
