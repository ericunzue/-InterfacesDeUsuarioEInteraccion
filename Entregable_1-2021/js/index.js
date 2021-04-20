'use strict'
document.addEventListener("DOMContentLoaded", function () {



   let imgInput = document.getElementById('upload');
   imgInput.addEventListener('change', function (e) {
      if (e.target.files) {
         let imageFile = e.target.files[0]; //here we get the image file
         var reader = new FileReader();
         reader.readAsDataURL(imageFile);
         reader.onloadend = function (e) {
            var myImage = new Image(); // Creates image object
            myImage.src = e.target.result; // Assigns converted image to image object
            myImage.onload = function (ev) {
               var myCanvas = document.getElementById("canvas"); // Creates a canvas object
               var myContext = myCanvas.getContext("2d"); // Creates a contect object
               canvas.width = myImage.width; // Assigns image's width to canvas
               canvas.height = myImage.height; // Assigns image's height to canvas
               myContext.drawImage(myImage, 0, 0); // Draws the image on canvas
            }
         }
      }
   });

})