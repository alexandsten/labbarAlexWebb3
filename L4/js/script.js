// Initiering av globala variabler och händelsehanterare
function init() {
	//----------//

	let imageViewerElem = new ImageViewer("imgViewer ");	// allt i programmet ska ligga i detta objekt
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


// ---- constructor imageViewer -- parametern är id som används nedan //
function ImageViewer (imgViewer) {
	//en array som innehåller objekt, där varje objekt har egenskaperna imgUrls och imgCaptions //
	this.list = [];	
	this.list[0] = {
		imgUrls: "pics/blank.png", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};
	this.imgIx = 0;
	//parameter används för att välja ut h3, img och p element
	this.titleElem = document.querySelector("#" + imgViewer + "h3");	
	this.imgElem = document.querySelector("#" + imgViewer + "img");
	this.captionElem = document.querySelector("#" + imgViewer + "p");	
	/*	var timer;	*/		
	/*	timer = null;	*/
}

// ---- end constructor imageViewer -- //


// Gör ett Ajax-anrop för att läsa in begärd fil
ImageViewer.prototype.requestImages = function(file) { // Parametern nr används i url:en för den fil som ska läsas in
	self = this;	// spara this i self variabel
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
	this.imgIx = 0;
	this.titleElem.innerHTML = XMLcode.getElementsByTagName("category")[this.imgIx].firstChild.data;
	let urlElems = XMLcode.getElementsByTagName("url"); // Alla url-element
	let captionElems = XMLcode.getElementsByTagName("caption"); // Alla caption-element

	for (let i = 0; i < 6; i++) {
		this.list.splice(0);
	}
	// tror jag blandade ihop det här - urlElems behöver jag nog för att komma åt XML
	for (let i = 0; i < urlElems.length; i++) {
	 let list = {
		imgUrls: "", // Initiera med den tomma bilden
		imgCaptions: "" // Tom bildtext för den tomma bilden	
	};

		list.imgUrls = urlElems[i].firstChild.data;
		list.imgCaptions = captionElems[i].firstChild.data;

	this.list.push(list);
}
	this.imgIx = 0;
	this.showImage(); // Visa första bilden
} // End getImages

// Visa bilden med index imgIx
ImageViewer.prototype.showImage = function() {
	if (this.list.length == 1){
		return;
	}

	this.imgElem.src = this.list[this.imgIx].imgUrls;		// hur refererar jag här?
	
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list[this.imgIx].imgCaptions;
} // End showImage

// Visa föregående bild -- jag måste göra om denna funktion helt
ImageViewer.prototype.prevImage = function() {

	if (this.imgIx > 0) this.imgIx--;
	else this.imgIx = this.list.length - 1; // Gå runt till sista bilden
	/*
	if (this.imgIx > 0) this.list[this.imgIx];
	else this.imgIx --; // Gå runt till sista bilden
	*/
	this.showImage();
} // End prevImage

// Visa nästa bild
ImageViewer.prototype.nextImage = function() {
	if (this.imgIx < this.list.length - 1) this.imgIx++;
	else this.imgIx = 0; // Gå runt till första bilden

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
