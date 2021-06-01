'use strict'
document.addEventListener('DOMContentLoaded', () => {
    alert("Site under construction. For a complete experience we recommend using chrome as your browser. Thanks!!");


    let countDownDate = new Date("Aug 14, 2021 22:00:00").getTime();
    setTimeout(showPage, 3000);
    setTimeout(slideInDown, 3000);

    // FUENTE: https://www.w3schools.com/howto/howto_js_countdown.asp
    let x = setInterval(function() {
        let now = new Date().getTime();
        let remains = countDownDate - now;
        var days = Math.floor(remains / (1000 * 60 * 60 * 24));
        var hours = Math.floor((remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60));

        document.getElementById("count").innerHTML = "Release in: " + days + " days " + hours + "h " +
            minutes + "m ";

        if (remains < 0) {
            clearInterval();
            document.getElementById("count").innerHTML = "RELEASED"

        }



    }, 1000);

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