'use strict'
window.addEventListener("load", () => {

    let btnDraw = document.getElementById('draw');
    btnDraw.addEventListener('click', draw);

    let btnErase = document.getElementById('erase');
    btnErase.addEventListener('click', erase);


    //Botones de filtros
    let btnBW = document.getElementById('btn_bw');
    btnBW.addEventListener('click', blackAndWhite);

    let btnInvert = document.getElementById('btn_invert');
    btnInvert.addEventListener('click', negative);

    let btnSepia = document.getElementById('btn_sepia');
    btnSepia.addEventListener('click', sepia);

    let btnContras = document.getElementById('btn_contrast');
    btnContras.addEventListener('click', contrast);

    let btnBrightness = document.getElementById('btn_brightness');
    btnBrightness.addEventListener('click', brightness);

    let btnBlur = document.getElementById('btn_blur');
    btnBlur.addEventListener('click', blur);

    let btnDownload = document.getElementById('btn_download');
    btnDownload.addEventListener('click', save);


    let btnNew = document.getElementById('new');
    btnNew.addEventListener('click', clean);



    let btnReset = document.getElementById('btn_reset');
    btnReset.addEventListener('click', resetPicture);

});

//canvas de dibujo
var canvas = document.getElementById("canvas"); // Creates a canvas object
var ctx = canvas.getContext("2d"); // Creates a contect object
let rect = canvas.getBoundingClientRect();
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

//Segundo canvas donde se inserta la imagen para aplicar fitros
var canvas_picture = document.getElementById("canvas_picture"); // Creates a canvas object
var ctx_picture = canvas_picture.getContext("2d"); // Creates a contect object
let canvasPictureWidth = canvas_picture.width;
let canvasPictureHeight = canvas_picture.height;

//CARGA DE IMAGEN
var myImage = new Image(); //// Creates image object
let imgInput = document.getElementById('upload');
let editedImage;
imgInput.addEventListener('change', function(e) {
    if (e.target.files) {
        let imageFile = e.target.files[0]; //here we get the image file
        var reader = new FileReader();
        reader.readAsDataURL(imageFile);
        reader.onloadend = function(e) {
            myImage.src = e.target.result; // Assigns converted image to image object
            myImage.onload = function(ev) {
                ctx.drawImage(myImage, 0, 0, canvasPictureWidth, canvasPictureHeight); // Draws the image on canvas
            }
        }
    }
});



//FILTROS
// fuente https://www.etnassoft.com/2016/11/03/manipulacion-de-imagenes-con-javascript-parte-1/
//Negativo
function blackAndWhite() {

    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = editedImage.data;
    var numPixels = editedImage.width * editedImage.height;

    for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];
        var grey = (r + g + b) / 3;

        pixels[i * 4] = grey;
        pixels[i * 4 + 1] = grey;
        pixels[i * 4 + 2] = grey;
    }

    ctx_picture.putImageData(editedImage, 0, 0);
}


//Negativo
function negative() {

    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = editedImage.data;
    var numPixels = editedImage.width * editedImage.height;

    for (var i = 0; i < numPixels; i++) {
        var r = pixels[i * 4];
        var g = pixels[i * 4 + 1];
        var b = pixels[i * 4 + 2];

        pixels[i * 4] = 255 - r;
        pixels[i * 4 + 1] = 255 - g;
        pixels[i * 4 + 2] = 255 - b;
    }

    ctx_picture.putImageData(editedImage, 0, 0);
}


function sepia() {

    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = editedImage.data;
    var numPixels = editedImage.width * editedImage.height;

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

    ctx_picture.putImageData(editedImage, 0, 0);
}


function contrast(contrast_default) {
    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pixels = editedImage.data;
    var numPixels = editedImage.width * editedImage.height;
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
    ctx_picture.putImageData(editedImage, 0, 0);
}


function brightness() {
    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let intensidad = 255 * (5 * 0.1); // El numero que se multiplica por 0.1 puede venir como parametro.
    for (let x = 0; x < canvas_picture.width; x++) {
        for (let y = 0; y < canvas_picture.height; y++) {
            let pixelRGBA = getPixel(editedImage, x, y);
            let promPixelR = verificarMaxyMin((pixelRGBA[0] + intensidad));
            let promPixelG = verificarMaxyMin((pixelRGBA[1] + intensidad));
            let promPixelB = verificarMaxyMin((pixelRGBA[2] + intensidad));
            let promPixelA = 255;
            setPixel(editedImage, x, y, promPixelR, promPixelG, promPixelB, promPixelA);
        }
    }
    ctx_picture.putImageData(editedImage, 0, 0, );
}


function setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.height) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}


function getPixel(imageData, x, y) {
    let index = (x + y * imageData.height) * 4;
    let r = imageData.data[index + 0];
    let g = imageData.data[index + 1];
    let b = imageData.data[index + 2];
    let a = imageData.data[index + 3];
    return [r, g, b, a];
}


function verificarMaxyMin(promPixel) {
    if (promPixel > 255) {
        promPixel = 255;
    }
    if (promPixel < 0) {
        promPixel = 0;
    }
    return promPixel;
}

//Blur https://stackoverflow.com/questions/39939001/how-is-possible-this-gaussian-blur-javascript-algorithm-work
function blur() {
    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var px = editedImage.data;
    var tmpPx = new Uint8ClampedArray(px.length); //contiene la representación de píxeles subyacente de la imagen. 
    //Si no se proporciona dicha matriz, se creará una imagen con un rectángulo negro transparente de la anchura 
    // y la altura especificadas.
    tmpPx.set(px);

    for (var i = 0, len = px.length; i < len; i++) {
        if (i % 4 === 3) { continue; }

        px[i] = (tmpPx[i] +
            (tmpPx[i - 4] || tmpPx[i]) +
            (tmpPx[i + 4] || tmpPx[i]) +
            (tmpPx[i - 4 * editedImage.width] || tmpPx[i]) +
            (tmpPx[i + 4 * editedImage.width] || tmpPx[i]) +
            (tmpPx[i - 4 * editedImage.width - 4] || tmpPx[i]) +
            (tmpPx[i + 4 * editedImage.width + 4] || tmpPx[i]) +
            (tmpPx[i + 4 * editedImage.width - 4] || tmpPx[i]) +
            (tmpPx[i - 4 * editedImage.width + 4] || tmpPx[i])
        ) / 9;
    };
    ctx_picture.putImageData(editedImage, 0, 0);

}


function resetPicture() {
    editedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx_picture.putImageData(editedImage, 0, 0);
}

// DESCARGAR IMAGEN
function save() {
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas_picture.toDataURL()
    link.click();
    link.delete;
}


//DIBUJAR
// fuente https://www.geeksforgeeks.org/how-to-draw-with-mouse-in-html-5-canvas/
// Posicion inicial del cursor

let coord = { x: 0, y: 0 };

//boolean para activar o desactivar el trazo y la goma
let paint = false;
let erasing = false;

// Actualiza las coordenadas del cursor cuando 
// un evento "e" se dispara a las coordenadas de dicho evento.
function getPosition(event) {
    coord.x = Math.round(event.clientX - rect.left);
    coord.y = Math.round(event.clientY - rect.top)
}

// Las siguientes funciones activan el indicador para iniciar y detener el dibujado y el borrado
function startPainting(event) {
    paint = true;
    erasing = false;
    getPosition(event);
}

function startErase(event) {
    erasing = true;
    paint = false;
    getPosition(event);
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
    ctx.moveTo(coord.x, coord.y);

    // La posición del cursor se actualiza a medida que movemos el ratón.
    getPosition(event);

    // Se traza una línea desde la coordenada inicial hasta esta coordenada
    ctx.lineTo(coord.x, coord.y);

    // Dibuja la linea.
    ctx.stroke();

}

function draw(event) {
    erasing = false;
    canvas_picture.removeEventListener('mousedown', startErase);
    canvas_picture.removeEventListener('mousemove', erase);
    canvas_picture.removeEventListener('mouseup', stopErase);
    canvas_picture.addEventListener('mousedown', startPainting);
    canvas_picture.addEventListener('mousemove', sketch);
    canvas_picture.addEventListener('mouseup', stopPainting);
}


//BORRADO
function scratch() {
    if (!erasing) return;

    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'white';
    ctx.moveTo(coord.x, coord.y);
    getPosition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();

}

function erase(event) {
    paint = false;
    canvas_picture.removeEventListener('mousedown', startPainting);
    canvas_picture.removeEventListener('mousemove', sketch);
    canvas_picture.removeEventListener('mouseup', stopPainting);
    canvas_picture.addEventListener('mousedown', startErase);
    canvas_picture.addEventListener('mousemove', scratch);
    canvas_picture.addEventListener('mouseup', stopErase);

}


function clean() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}