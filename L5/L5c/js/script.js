// globala

var movieElem;
var movieButton;


function init() {
    movieElem = document.getElementById("movieList");
    movieElem.innerHTML = "";
    movieButton = document.getElementById("knapp").addEventListener("click",requestData);
}

window.addEventListener("load",init); // init aktiveras då sidan är inladdad


function requestData(file) {

}

function showMovies() {
    movieElem.innerHTML = "<h3>" + "annars då" + "</h3>";

}