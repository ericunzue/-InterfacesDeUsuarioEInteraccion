'use strict'
window.addEventListener("load", () => {

    let btnDraw = document.getElementById('draw');
    btnDraw.addEventListener('click', draw);

    let btnErase = document.getElementById('erase');
    btnErase.addEventListener('click', delet);

    let btnNeg = document.getElementById('btn_bw');
    btnNeg.addEventListener('click', blackAndWhite);

    let btnInvert = document.getElementById('btn_invert');
    btnInvert.addEventListener('click', function() {
        invert();
    });

    let btnSepia = document.getElementById('btn_sepia');
    btnSepia.addEventListener('click', function() {
        sepia();
    });
    sdsdñjs
    lksfmskd
    let btnContras = document.getElementById('btn_contraste');
    btnContras.addEventListener('click', function() {
        contrast();
    })

    canvas_picture.addEventListener('mousedown', function() {
        save();
    });

    let btnNew = document.getElementById('new');
    btnNew.addEventListener('click', clean);
});

//canvas de dibujo
var canvas = document.getElementById("canvas"); // Creates a canvas object
var ctx = canvas.getContext("2d"); // Creates a contect object
let rect = canvas.getBoundingClientRect();

//Segundo canvas donde se inserta la imagen para aplicar fitros
var canvas_picture = document.getElementById("canvas_picture"); // Creates a canvas object
var ctx_picture = canvas_picture.getContext("2d"); // Creates a contect object

//CARGA DE IMAGEN
var myImage = new Image(); //// Creates image object
let imgInput = document.getElementById('upload');
imgInput.addEventListener('change', function(e) {
    if (e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function(e) {
            myImage.src = e.target.result; // Assigns converted image to image object
            myImage.onload = function(ev) {
                canvas_picture.width = myImage.width; // Assigns image's width to canvas
                canvas_picture.height = myImage.height; // Assigns image's height to canvas
                ctx_picture.drawImage(myImage, 0, 0); // Draws the image on canvas
            }
        }
    }
});

//FILTROS
// fuente https://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/
//Negativo
function blackAndWhite() {

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

function invert() {

    var imageData = ctx_picture.getImageData(0, 0, canvas_picture.width, canvas_picture.height);
    var pixels = imageData.data;
    var numPixels = imageData.width * imageData.height;

    for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];

        pixels[i * 4] = 255 - r;
        pixels[i * 4 + 1] = 255 - g;
        pixels[i * 4 + 2] = 255 - b;
    }

    ctx_picture.putImageData(imageData, 0, 0);
}

function sepia() {

    var imageData = ctx_picture.getImageData(0, 0, canvas_picture.width, canvas_picture.height);
    var pixels = imageData.data;
    var numPixels = imageData.width * imageData.height;

    for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];

        pixels[i * 4] = 255 - r;
        pixels[i * 4 + 1] = 255 - g;
        pixels[i * 4 + 2] = 255 - b;

        pixels[i * 4] = (r * .393) + (g * .769) + (b * .189);
        pixels[i * 4 + 1] = (r * .349) + (g * .686) + (b * .168);
        pixels[i * 4 + 2] = (r * .272) + (g * .534) + (b * .131);
    }

    ctx_picture.putImageData(imageData, 0, 0);
}

function contrast(contrast_default) {

    var imageData = ctx_picture.getImageData(0, 0, canvas_picture.width, canvas_picture.height);
    var pixels = imageData.data;
    var numPixels = imageData.width * imageData.height;
    var factor;
    contrast_default = 100;

    contrast_default || (contrast_default = 100); // Default value

    factor = (259 * (contrast_default + 255)) / (255 * (259 - contrast_default));

    for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];

        pixels[i * 4] = factor * (r - 128) + 128;
        pixels[i * 4 + 1] = factor * (g - 128) + 128;
        pixels[i * 4 + 2] = factor * (b - 128) + 128;
    }

    ctx_picture.putImageData(imageData, 0, 0);
}


// Al hacer click sobre la imagen, genera un link para descargarla.
function save() {
    var link = window.document.createElement('a'),
        url = canvas_picture.toDataURL(),
        filename = 'screenshot.jpg';

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
}


//DIBUJAR
// fuente https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
// Posicion inicial del cursor
let x, y = 0;
//boolean para activar o desactivar el trazo y la goma
let paint = false;
let erasing = false;

// Actualiza las coordenadas del cursor cuando 
// un evento e se dispara a las coordenadas de dicho evento.
function getPosition(event) {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
}

// Las siguientes funciones activan el indicador para iniciar y detener el dibujado y el borrado
function startPainting(event) {
    getPosition(event);
    paint = true;
    erasing = false;
}

function startErase(event) {
    getPosition(event);
    erasing = true;
    paint = false;
}

function stopPainting() {
    paint = false;
}

function stopErase() {
    erasing = false;
}


//DIBUJAR
function sketch() {
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

function draw(event) {
    erasing = false;
    canvas.removeEventListener('mousedown', startErase);
    canvas.removeEventListener('mousemove', erase);
    canvas.removeEventListener('mouseup', stopErase);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mousemove', sketch);
    canvas.addEventListener('mouseup', stopPainting);
}


//BORRADO
function erase() {
    if (!erasing) return;

    ctx.beginPath();

    ctx.lineWidth = 30;

    // Color goma en white

    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.moveTo(x, y);
    getPosition(event);
    ctx.lineTo(x, y);
    ctx.stroke();

}

function delet(event) {
    paint = false;
    canvas.removeEventListener('mousedown', startPainting);
    canvas.removeEventListener('mousemove', sketch);
    canvas.removeEventListener('mouseuo', stopPainting);
    canvas.addEventListener('mousedown', startErase);
    canvas.addEventListener('mousemove', erase);
    canvas.addEventListener('mouseup', stopErase);

}

function toggle(params) {
    if (paint) {
        draw();

    } else {
        delet();
    }

}


function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}