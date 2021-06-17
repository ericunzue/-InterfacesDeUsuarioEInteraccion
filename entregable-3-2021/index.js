'use strict'
document.addEventListener('DOMContentLoaded', () => {
    let menu = document.getElementById("menu");
    menu.addEventListener('click', showMenu, false);


    document.getElementById("loader").style.display = "flex";

    setTimeout(showPage, 3000);
    setTimeout(slideInDown, 3000);
    showSlides(slideIndex);
    openAccordion();
    setTimeout(countDown, 2000);

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

function countDown() {
    // FUENTE: https://www.w3schools.com/howto/howto_js_countdown.asp
    let countDownDate = new Date("Aug 14, 2021 22:00:00").getTime();
    let now = new Date().getTime();

    let x = setInterval(function() {
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
}

function showMenu(event) {
    this.classList.toggle('is-active');
    document.querySelector(".menuppal").classList.toggle("is_active");
    event.preventDefault();

}

// Crea arreglo con los botones. Si tiene altura, la quita. Si no tiene, le agrega  y le quita al resto
function openAccordion(params) {
    let accordion = document.getElementsByClassName("accordion");
    let btn;
    let panel;

    for (let i = 0; i < accordion.length; i++) {
        console.log(btn);

        accordion[i].addEventListener("click", () => {
            btn = accordion[i];
            panel = btn.nextElementSibling;
            if (panel.style.maxHeight) {
                btn.classList.remove("active");
                btn.classList.remove("flipInX");

                panel.style.maxHeight = null;
            } else {
                for (let x = 0; x < accordion.length; x++) {
                    if (!(accordion[x].isEqualNode(btn))) {
                        accordion[x].classList.remove("active");
                        accordion[x].classList.remove("flipInX");
                        accordion[x].nextElementSibling.style.maxHeight = null;
                    }
                }
                btn.classList.add("active");
                btn.classList.add("flipInX");

                btn.nextElementSibling.style.maxHeight = 100 + "%";
            }

        });


    }



}