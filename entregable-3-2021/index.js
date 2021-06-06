'use strict'
document.addEventListener('DOMContentLoaded', () => {
    let countDownDate = new Date("Aug 14, 2021 22:00:00").getTime();



    // document.getElementById("loader").style.display = "none";

    // let btnAcept = document.getElementById('acept');
    // btnAcept.addEventListener('click', () => {
    document.getElementById("notice").style.display = "none";
    document.getElementById("loader").style.display = "flex";

    setTimeout(showPage, 3000);
    setTimeout(slideInDown, 3000);


    // FUENTE: https://www.w3schools.com/howto/howto_js_countdown.asp
    let x = setInterval(function() {
        let now = new Date().getTime();
        let remains = countDownDate - now;
        let days = Math.floor(remains / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("count").innerHTML = "Release in: " + days + " days " + hours + "h " +
            minutes + "m ";

        if (remains < 0) {
            clearInterval();
            document.getElementById("count").innerHTML = "RELEASED"
        }
    }, 1000);
    // });


    showSlides(slideIndex);




});


function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById("navbar").style.display = "flex";
    document.getElementById("navbar-ul").style.display = "flex";
}

function slideInDown() {
    let navbarBtn = document.getElementsByClassName("nav-button");
    for (let index = 0; index < navbarBtn.length; index++) {
        navbarBtn[index].classList.add("slideInDown");

    }
}


let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("demo");
    // let captionText = document.getElementById("caption");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    // captionText.innerHTML = dots[slideIndex - 1].alt;
}