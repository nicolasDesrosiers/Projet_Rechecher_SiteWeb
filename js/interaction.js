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
 
//window.onload = function() {        var shadowRoot = document.querySelector('spline-viewer').shadowRoot;        shadowRoot.querySelector('#logo').remove();    }

window.onload = function() {   var splineElement = document.querySelectorAll('spline-viewer');      for (let pas = 0; pas < splineElement.length; pas++) {     var shadowRoot = splineElement[pas].shadowRoot;     shadowRoot.querySelector('#logo').remove();   } }