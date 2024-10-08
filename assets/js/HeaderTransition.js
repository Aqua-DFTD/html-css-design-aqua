window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementsByClassName("navbar").style.fontSize = "30px";
    } else {
        document.getElementsByClassName("navbar").style.fontSize = "90px";
    }
}