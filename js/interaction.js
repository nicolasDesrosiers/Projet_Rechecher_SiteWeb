///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_____________________________________FONCTION POUR LE MENU BURGER EN TELEPHONE ________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Attend que le DOM soit entièrement chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne tous les liens dans le menu
  var links = document.querySelectorAll(".menu a");

  // Pour chaque lien dans le menu
  links.forEach(function (link) {
    // Ajoute un écouteur d'événements pour le clic
    link.addEventListener("click", function () {
      // Désactive la case à cocher du menu burger après un clic sur un lien
      document.getElementById("menu__toggle").checked = false;
    });
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//_____________________________________FONCTION POUR LE CAROUSSEL IMAGE CREATION ________________________________________//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Définit une fonction pour déplacer les images dans le carrousel
function deplacer(direction) {
  // Sélectionne tous les éléments avec la classe "img__creation"
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

// Variable pour indiquer si la souris est activée
let active = false;

// Écouteur d'événement pour le clic de la souris sur la barre de défilement
document.querySelector(".scroller").addEventListener("mousedown", function () {
  active = true;
  // Ajoute une classe pour indiquer que la barre de défilement est activée
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

// Déterminer la position de la souris
document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= document.querySelector(".wrapper").getBoundingClientRect().left;
  scrollIt(x);
});

// Fonction pour faire défiler
function scrollIt(x) {
  let transform = Math.max(
    0,
    Math.min(x, document.querySelector(".wrapper").offsetWidth)
  );
  document.querySelector(".after").style.width = transform + "px";
  document.querySelector(".scroller").style.left = transform - 25 + "px";
}

// État initial en fonction de la largeur,
// Affiche un peu des deux images pour que l'utilisateur puisse voir ce qui se passe
scrollIt(350);

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
