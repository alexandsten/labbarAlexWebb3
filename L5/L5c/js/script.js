// globala

var movieElem;


function init() {
    movieElem = document.getElementById("movieList");
    movieElem.innerHTML = "";
    document.getElementById("knapp").addEventListener("click",requestData)
}

window.addEventListener("load",init); // init aktiveras då sidan är inladdad




function requestData() {
    let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET","json/movies.json",true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) showMovies(request.responseText); // status 200 (OK) --> filen fanns
			else document.getElementById("movieList").innerHTML = "Den begärda resursen fanns inte.";
	};
}

function showMovies(jsonCode) {
  /*  titleElem.innerHTML = JSON.parse(jsonCode);	// json kategori    */
	let jsonMovieList = JSON.parse(jsonCode).movieList; 
    let description = JSON.parse(jsonCode).genredescription;
    let HTMLcode = "";

    let movies = JSON.parse(jsonCode).movielist;

	for (let i = 0; i < movies.length; i++) {
		// Referenser till olika egenskaper i aktuellt accomodation-objekt
		
		HTMLcode +=  


        "<p><b>Filmtitel:</b> " + movies[i].film[i].title.name + "</p>" +
        "<p><b>Länk:</b> " + movies[i].film[i].title.url + "</p>" +
        "<p><b>Regissör:</b> " + movies[i].film[i].regi.name +  "</p>" +   
        "<p><b>Länk:</b> " + movies[i].film[i].regi.url +  "</p>" +     
		"<p><b>Längd:</b> " + movies[i].film[i].runtime + "</p>" +
		"<p><b>Åldersgräns:</b> " + movies[i].film[i].age + "</p>" +
		"<p><b>Starttid:</b> " + movies[i].film[i].starttime +  "</p>" +
		"<hr>" +

        "<p><b>Filmtitel:</b> " + movies[i].film[1].title.name + "</p>" +
        "<p><b>Länk:</b> " + movies[i].film[1].title.url + "</p>" +
        "<p><b>Regissör:</b> " + movies[i].film[1].regi.name +  "</p>" +   
        "<p><b>Länk:</b> " + movies[i].film[1].regi.url +  "</p>" +     
        "<p><b>Längd:</b> " + movies[i].film[1].runtime + "</p>" +
        "<p><b>Åldersgräns:</b> " + movies[i].film[1].age + "</p>" +
        "<p><b>Starttid:</b> " + movies[i].film[1].starttime +  "</p>" +
                "<hr>" +

                "<p><b>Filmtitel:</b> " + movies[i].film[2].title.name + "</p>" +
                "<p><b>Länk:</b> " + movies[i].film[2].title.url + "</p>" +
                "<p><b>Regissör:</b> " + movies[i].film[2].regi.name +  "</p>" +   
                "<p><b>Länk:</b> " + movies[i].film[2].regi.url +  "</p>" +     
                "<p><b>Längd:</b> " + movies[i].film[2].runtime + "</p>" +
                "<p><b>Åldersgräns:</b> " + movies[i].film[2].age + "</p>" +
                "<p><b>Starttid:</b> " + movies[i].film[2].starttime +  "</p>" +
                    "<hr>" +
                    "<p><b>Kontakt:</b> " + movies[i].contact.url +  "</p>" +
                    "<h3>" + movies[0].genredescription + "</h3>" 
                    ;
	}


    movieElem.innerHTML = HTMLcode;

}