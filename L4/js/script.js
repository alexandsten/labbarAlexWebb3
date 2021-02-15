// Globala variabler


// Initiering av globala variabler och händelsehanterare
function init() {
	//----------//

	let imageViewerElem = new ImageViewer("imgViewer ");	// denna kanske alltid ska referas till med this?

	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				imageViewerElem.requestImages("xml/images" + this.selectedIndex + ".xml");
				this.selectedIndex = 0;
			}
		);
	document.querySelector("#prevBtn").addEventListener("click",function() { imageViewerElem.prevImage(); });
	document.querySelector("#nextBtn").addEventListener("click",function() { imageViewerElem.nextImage(); });
	
	
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


// ---- constructor imageViewer -- //

function ImageViewer (imgViewer) {
	
	// dessa ska vara egenskaper för imageViewer, så jag får skriva om dem
	// ska de vara i parametern eller hur hanterar jag dem? jag får kolla runt bland exemplen
	// typ = this.titleElem = nånting;??
	// dom alla andvänds i funktioner (metoder), som tex get images, så måste komma åt dessa därifrån

	var timer;			// Referens till timern för bildspelet

	//en array som innehåller objekt, där varje objekt har egenskaperna caption och url
	// alla ställen där bilder refereras ska detta ersätta / gälla istället
	this.list = [];
	
	this.list[0] = {
		imgUrls: "pics/blank.png", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};
	/*
	this.list[1] = {
		imgUrls: "pics/blank.png", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};
	this.list[2] = {
		imgUrls: "pics/blank.png", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};
	this.list[3] = {
		imgUrls: "pics/blank.png", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};
	*/


	this.imgIx = 0;
	timer = null;
	//-------------------------------------------------
	
	
	this.titleElem = document.querySelector("#" + imgViewer + "h3");	// vet ej än

	// ska vara i egenskap som heter "list"
	this.imgElem = document.querySelector("#" + imgViewer + "img");
	this.captionElem = document.querySelector("#" + imgViewer + "p");	

	//
	return this;
}

// ---- end constructor imageViewer -- //


// Gör ett Ajax-anrop för att läsa in begärd fil
ImageViewer.prototype.requestImages = function(file) { // Parametern nr används i url:en för den fil som ska läsas in
	self = this;
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	request.open("GET",file,true);
	request.send(null); // Skicka begäran till servern
	request.onreadystatechange = function () { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
			if (request.status == 200) self.getImages(request.responseXML); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka XML-koden och lägga in innehållet i variablerna för bilderna i bildspelet
ImageViewer.prototype.getImages = function(XMLcode) { // Parametern XMLcode är hela den inlästa XML-koden
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[0].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element
	imgUrls = [];		// Nya tomma arrayer för bilder
	imgCaptions = [];	// och bildtexter
	for (let i = 0; i < urlElems.length; i++) {
		this.list[this.imgIx].imgUrls.push(urlElems[i].firstChild.data);
		this.list[this.imgIx].imgCaptions.push(captionElems[i].firstChild.data);
	}
	this.imgIx = 0;
	showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
ImageViewer.prototype.showImage = function() {
	alert("" + this.imgIx + "");

	this.imgElem.src = this.list[this.imgIx].imgUrls[this.imgIx];		// hur refererar jag här?
	
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.imgCaptions[this.imgIx];
} // End showImage

// Visa föregående bild -- jag måste göra om denna funktion helt
ImageViewer.prototype.prevImage = function() {

	if (this.imgIx > 0) this.list[this.imgIx];
	else this.imgIx --; // Gå runt till sista bilden

	this.showImage();
	alert("prev");
} // End prevImage

// Visa nästa bild
ImageViewer.prototype.nextImage = function() {

	if (this.imgIx < this.list[this.imgIx].imgUrls.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden
	this.imgIx++; // jag som lagt dit detta för att testa
	
	alert("" + this.imgIx + "");
	this.showImage();
	alert("" + this.imgIx + "");
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
