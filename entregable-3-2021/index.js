'use strict'
document.addEventListener('DOMContentLoaded', () => {



    var scrollPos = 0;

    document.addEventListener('scroll', () => {
        if ((document.body.getBoundingClientRect()).top < scrollPos) {
            document.getElementById("navbar").style.display = "relative"
        }
        // ARRIBA
        else {
            // ABAJO
            scrollPos = (document.body.getBoundingClientRect()).top;
            document.getElementById("navbar").style.display = "relative"

            console.log("abajo");
        }

    })
    setTimeout(showPage, 3000);

});


function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.display = "block";
}