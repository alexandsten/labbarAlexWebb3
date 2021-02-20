// Initiering av globala variabler och händelsehanterare
function init() {
	//----------//

	let imageViewerElem = new ImageViewer("imgViewer ");	// allt i programmet ska ligga i detta objekt
	document.querySelector("#categoryMenu").addEventListener("change",
			function() {
				imageViewerElem.requestImages("json/images" + this.selectedIndex + ".json");
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
			if (request.status == 200) self.getImages(request.responseText); // status 200 (OK) --> filen fanns
			else document.getElementById("result").innerHTML = "Den begärda resursen fanns inte.";
	};
} // End requestImages

// Funktion för att tolka json-koden och lägga in innehållet i variablerna för bilderna i bildspelet
ImageViewer.prototype.getImages = function(jsonCode) { // Parametern jasoncode är hela den inlästa json-koden
	this.imgIx = 0;  // så att första bilden i listan kommer att visas
	this.titleElem.innerHTML = JSON.parse(jsonCode).category;	// json kategori
	let jsonImage = JSON.parse(jsonCode).image; // json image, en array

	this.list.splice(0);	// töm nuvarande list

	// loop som lägger json urls och captions i objekten i list
	for (let i = 0; i < jsonImage.length; i++) {
		let list = {	// nytt list objekt som ska läggas i this.list
			imgUrls: "", 
			imgCaptions: "" 	
		};
		list.imgUrls = jsonImage[i].url;		// lägg json urls i list
		list.imgCaptions = jsonImage[i].caption;	// lägg json caption i list
		this.list.push(list);	// pusha listan i this.list
	}
	this.showImage(); // Visa första bilden i listan
} // End getImages

// Visa bilden med index imgIx
ImageViewer.prototype.showImage = function() {
	if (this.list.length == 1){		// om inget ämne är valt går det ej att visa bilder
		return;
	}
	this.imgElem.src = this.list[this.imgIx].imgUrls;	// visa listans bild
	this.captionElem.innerHTML = (this.imgIx+1) + ". " + this.list[this.imgIx].imgCaptions;	// visa listans caption
} // End showImage

// Visa föregående bild 
ImageViewer.prototype.prevImage = function() {
	if (this.imgIx > 0) this.imgIx--;	// om this.imgIx är större än noll, -1 på imgIx
	else this.imgIx = this.list.length - 1; // annars samma som this.list längd -1,  Gå runt till sista bilden
	this.showImage();
} // End prevImage

// Visa nästa bild
ImageViewer.prototype.nextImage = function() {
	if (this.imgIx < this.list.length - 1) this.imgIx++;	// om this.imgIx är lägre än this.list längd - +1 på imgIx
	else this.imgIx = 0; // annars är this.imgIx 0, Gå runt till första bilden
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
