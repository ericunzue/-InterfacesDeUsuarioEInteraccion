'use strict'
window.addEventListener("load", () => {

   let btnNeg = document.getElementById('btn_negativo');
   btnNeg.addEventListener('click', function () {
      negativo();
   });

   let btnDraw = document.getElementById('draw');
   btnDraw.addEventListener('click', () => {
      canvas.addEventListener('mousedown', stopErase);
      canvas.addEventListener('mousedown', startPainting);
      canvas.addEventListener('mouseup', stopPainting);
      canvas.addEventListener('mousemove', sketch);
   });

   let btnErase = document.getElementById('erase');
   btnErase.addEventListener('click', () => {
      canvas.addEventListener('mousedown', stopPainting);
      canvas.addEventListener('mousedown', startErase);
      canvas.addEventListener('mouseup', stopErase);
      canvas.addEventListener('mousemove', erase);
   });
});

var canvas = document.getElementById("canvas"); // Creates a canvas object
var ctx = canvas.getContext("2d"); // Creates a contect object
let rect = canvas.getBoundingClientRect();

var canvas_picture = document.getElementById("canvas_picture"); // Creates a canvas object
var ctx_picture = canvas_picture.getContext("2d"); // Creates a contect object


var myImage = new Image();//// Creates image object
//CARGA DE IMAGEN
let imgInput = document.getElementById('upload');
imgInput.addEventListener('change', function (e) {
   if (e.target.files) {
      let imageFile = e.target.files[0]; //here we get the image file
      var reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = function (e) {
         myImage.src = e.target.result; // Assigns converted image to image object
         myImage.onload = function (ev) {
            canvas_picture.width = myImage.width; // Assigns image's width to canvas
            canvas_picture.height = myImage.height; // Assigns image's height to canvas
            ctx_picture.drawImage(myImage, 0, 0); // Draws the image on canvas
         }
      }
   }
});

//FILTROS
//Negativo
function negativo() {

   var imageData = ctx_picture.getImageData(0, 0, canvas_picture.width, canvas_picture.height);
   var pixels = imageData.data;
   var numPixels = imageData.width * imageData.height;

   for (var i = 0; i < numPixels; i++) {
      var r = pixels[i * 4];
      var g = pixels[i * 4 + 1];
      var b = pixels[i * 4 + 2];
      var grey = (r + g + b) / 3;

      pixels[i * 4] = grey;
      pixels[i * 4 + 1] = grey;
      pixels[i * 4 + 2] = grey;
   }
   ctx_picture.putImageData(imageData, 0, 0);
}


//DIBUJAR
// fuente https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
// Posicion inicial del cursor
let x, y = 0;
//boolean para activar o desactivar el trazo
let paint = false;
let erased = false;

// Actualiza las coordenadas del cursor cuando 
// un evento e se dispara a las coordenadas de dicho evento.
function getPosition(event) {
   x = event.clientX - rect.left;
   y = event.clientY - rect.top;
}

// Las siguientes funciones activan el indicador para iniciar y detener el dibujo y el borrado
function startPainting(event) {
   paint = true;
   getPosition(event);
}

function startErase(event) {
   erased = true;
   getPosition(event);
}

function stopPainting() {
   paint = false;
}

function stopErase() {
   erased = false;
}



function sketch(event) {
   if (!paint) return;

   ctx.beginPath();

   ctx.lineWidth = 5;

   // Tipo y color del trazo
   ctx.lineCap = 'round';
   ctx.strokeStyle = 'green';

   // El cursor para empezar a dibujar se mueve a esta coordenada
   ctx.moveTo(x, y);

   // La posición del cursor se actualiza a medida que movemos el ratón.
   getPosition(event);

   // Se traza una línea desde la coordenada inicial hasta esta coordenada
   ctx.lineTo(x, y);

   // Dibuja la linea.
   ctx.stroke();
}

//BORRADO
function erase(pos) {
   if (!erased) return;

   ctx.beginPath();

   ctx.lineWidth = 30;

   // Tipo y color del trazo
   ctx.lineCap = 'round';
   ctx.strokeStyle = 'white';

   // El cursor para empezar a borrar se mueve a esta coordenada
   ctx.moveTo(x, y);

   // La posición del cursor se actualiza a medida que movemos el ratón.
   getPosition(event);

   // Se traza una línea desde la coordenada inicial hasta esta coordenada
   ctx.lineTo(x, y);

   // Borra la linea.
   ctx.stroke();

}
