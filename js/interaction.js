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

// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector(".scroller").addEventListener("mousedown", function () {
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector(".scroller").classList.add("scrolling");
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener("mouseup", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});
document.body.addEventListener("mouseleave", function () {
  active = false;
  document.querySelector(".scroller").classList.remove("scrolling");
});

// Let's figure out where their mouse is at
document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector(".wrapper").getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x) {
  let transform = Math.max(
    0,
    Math.min(x, document.querySelector(".wrapper").offsetWidth)
  );
  document.querySelector(".after").style.width = transform + "px";
  document.querySelector(".scroller").style.left = transform - 25 + "px";
}

// Let's set our opening state based off the width,
// we want to show a bit of both images so the user can see what's going on
scrollIt(150);

// And finally let's repeat the process for touch events
// first our middle scroller...
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
