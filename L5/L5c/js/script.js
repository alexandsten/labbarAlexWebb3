// globala variabler
var movieElem;     // variabel som kommer att visa information om filmer 
var choice;        // variabel som baserat på val kommer att hjälpa till att styra vilken json information som visas

// Initiering av globala variabler och händelsehanterare
function init() {
    movieElem = document.getElementById("movieList");   //länkar variabel till id
    movieElem.innerHTML = "";  
    // dessa representerar de olika film valen, och används till att visa json information om filmerna 
    document.getElementById("knapp1").addEventListener("click",requestData);
    document.getElementById("knapp2").addEventListener("click",requestData);
    document.getElementById("knapp3").addEventListener("click",requestData);
}

window.addEventListener("load",init); // init aktiveras då sidan är inladdad

function requestData() {
// if sats som används för att välja rätt film från json koden med hjälp av choice variabeln
    if (this.id == "knapp1") {
        choice = 0;
    }
    if (this.id == "knapp2") {
        choice = 1;
    }
    if (this.id == "knapp3") {
        choice = 2;
    }
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","json/movies.json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) showMovies(request.responseText); // status 200 (OK) --> filen fanns
			else document.getElementById("movieList").innerHTML = "Den begärda resursen fanns inte.";
	};
}

// visar json koden 
function showMovies(jsonCode) {
    let HTMLcode = "";
    let movies = JSON.parse(jsonCode).movielist;

	for (let i = 0; i < movies.length; i++) {
		HTMLcode +=  
        // fyller i p och a element med data från json dokumentet
        // if satsen med choice används för att välja rätt film
        "<p><b>Filmtitel:</b> " +
        "<a href = " + movies[i].film[choice].title.url + ">" +  movies[i].film[choice].title.name + "</a>" +  "</p>" +
        "<p><b>Regissör:</b> " + 
        "<a href = " + movies[i].film[choice].regi.url + ">" + movies[i].film[choice].regi.name   + "</a>" +  "</p>" + 
		"<p><b>Längd:</b> " + movies[i].film[choice].runtime + "</p>" +
		"<p><b>Åldersgräns:</b> " + movies[i].film[choice].age + "</p>" +
		"<p><b>Starttid:</b> " + movies[i].film[choice].starttime +  "</p>" +
		"<hr>" +

        "<a href = " + movies[i].contact.url + " target = blank>" + "Kontakt" + "</a>" +     
        "<h3>" + movies[i].genredescription + "</h3>" 
                    ;
	}
    movieElem.innerHTML = HTMLcode;
}