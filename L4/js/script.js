// Globala variabler
/* var imgViewer;	

var titleElem;		// Referens till element för bildspelets titel
var imgElem;		// Referens till img-element för bildspelet
var captionElem;	// Referens till element för bildtext
var imgUrls;		// Array med url:er för valda bilder
var imgCaptions;	// Array med bildtexter till valda bilder
var imgIx;			// Index för aktuell bild
var timer;			// Referens till timern för bildspelet
*/

// Initiering av globala variabler och händelsehanterare
function init() {
	/*
	titleElem = document.querySelector("#imgViewer h3");
	imgElem = document.querySelector("#imgViewer img");
	captionElem = document.querySelector("#imgViewer p");
	*/


	// dessa ska bort någonstans ---//	
	/*
	imgUrls = ["pics/blank.png"]; // Initiera med den tomma bilden
	imgCaptions = [""]; // Tom bildtext för den tomma bilden
	imgIx = 0;
	timer = null;	
	*/
	
	//----------//

	let imageViewerElem = new imageViewer(imgViewer);	// kanske ska skriva en tydlig referens i parametern

	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click",function() { imageViewer(); });
	document.querySelector("#nextBtn").addEventListener("click",function() { imageViewer(); });
	
	
	// ----- Extramerit -----
	/* document.querySelector("#autoBtn").addEventListener("click",
			function(e) {
				autoImage(e,3000);
			}
		);
	*/

	// ----- Guldstjärna -----
	//		Här ska du lägga kod, om du gör guldstjärneuppgiften
	
} // End init
window.addEventListener("load",init);

// ---------------------------------------------------------------
// ----- Funktioner för bildspelet -----


// ----- constructor image ------- //

function Image (titleElem, imgUrl, imgCaption) {
	this.caption = imgCaption;
	this.url = imgUrl;
	this.title = titleElem;

}

// -- end construcor image ---- //

// ---- constructor imageViewer -- //

function imageViewer (imgViewer) {
	
	// dessa ska vara egenskaper för imageViewer, så jag får skriva om dem
	// ska de vara i parametern eller hur hanterar jag dem? jag får kolla runt bland exemplen
	// typ = this.titleElem = nånting;??
	// dom alla andvänds i funktioner (metoder), som tex get images, så måste komma åt dessa därifrån

/*	var titleElem;	*/	// Referens till element för bildspelets titel
/*	var imgElem;	*/	// Referens till img-element för bildspelet
/*	var captionElem; */	// Referens till element för bildtext
	var imgUrls;		// Array med url:er för valda bilder
	var imgCaptions;	// Array med bildtexter till valda bilder
	var imgIx;			// Index för aktuell bild
	var timer;			// Referens till timern för bildspelet

	// dessa ska Kanske vara här ---------------------
	// eller de ska nog ersättas med en egenskap som heter list, 
	//en array som innehåller objekt, där varje objekt har egenskaperna caption och url
	// alla ställen där bilder refereras ska detta ersätta / gälla istället
	this.list = [];
	// vet ej om imageObject ska ligga här
	this.imageObject = {
		imgUrls = ["pics/blank.png"], // Initiera med den tomma bilden
		imgCaptions = [""] // Tom bildtext för den tomma bilden	
	};

	imgIx = 0;
	timer = null;
	//-------------------------------------------------
	
	
	this.titleElem = document.querySelector("#imgViewer h3");	// vet ej än

	// ska vara i egenskap som heter "list"
	this.imgElem = document.querySelector("#imgViewer img");
	this.captionElem = document.querySelector("#imgViewer p");
	//
	alert("Hello! I am an alert box!!");
}

// ---- end constructor imageViewer -- //


// Gör ett Ajax-anrop för att läsa in begärd fil
imageViewer.prototype.requestImages(file) = function() { // Parametern nr används i url:en för den fil som ska läsas in
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
imageViewer.prototype.getImages(XMLcode) = function() { // Parametern XMLcode är hela den inlästa XML-koden
	titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	imgUrls = [];		// Nya tomma arrayer för bilder
	imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		imgUrls.push(urlElems[i].firstChild.data);
		imgCaptions.push(captionElems[i].firstChild.data);
	}
	imgIx = 0;
	showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
imageViewer.prototype.showImage = function() {
	imgElem.src = imgUrls[imgIx];
	captionElem.innerHTML = (imgIx+1) + ". " + imgCaptions[imgIx];
} // End showImage

// Visa föregående bild
imageViewer.prototype.prevImage = function() {
	if (imgIx > 0) imgIx--;
	else imgIx = imgUrls.length - 1; // Gå runt till sista bilden
	showImage();
} // End prevImage

// Visa nästa bild
imageViewer.prototype.nextImage = function() {
	if (this.list.imgIx < this.list.imgUrls.length - 1) this.list.imgIx++;
	else imgIx = 0; // Gå runt till första bilden
	this.showImage();
} // End nextImage

// ----- Extramerit -----
/* Ta bort kommentaren kring koden, för att testa funktionaliteten för extrameriten
// Starta/stoppa automatisk bildvisning
function autoImage(e,interval) {
	if (timer == null) { // Start
		timer = setInterval(nextImage,interval);
		if (e) e.currentTarget.style.backgroundColor = "green";
	}
	else { // Stopp
		clearInterval(timer);
		timer = null;
		if (e) e.currentTarget.style.backgroundColor = "white";
	}
} // End autoImage
*/
