// Globala variabler
var myMap;				// Objekt för kartan
var myMarkers = [];		// Array med markeringar
var userMarker;			// Objekt för markering där användaren klickar
const markerData = [	// Data för markeringar som hör till knapparna
			{position:{lat:33.890247,lng:-118.227371},title:"Compton High School"},
			{position:{lat:33.875148,lng: -118.220395},title:"Compton Casino"},
			{position:{lat:33.877239,lng:-118.211523},title:"Compton Collage"},
			{position:{lat:33.889407,lng:-118.243880},title:"Compton Airport"},
			{position:{lat:33.841863,lng:-118.259711},title:"Compton IKEA"}
		];
var mapLocationElem;			// Element för utskrift av koordinater
var myApiKey = "e8e9fc8c2c5dbe8d7e0d839cc15ee0c9";	// Ersätt DIN-API-KEY med din egen Flickr API key
var flickrImgElem;				// Referens till element där bilderna ska visas

// Initiering av programmet
function init() {
	initMap();
	mapLocationElem = document.getElementById("mapLocation");
	flickrImgElem = document.getElementById("flickrImg");
} // End init
window.addEventListener("load",init);

// -----------------------------------------------------------------------------------------

// Skapa en karta och markeringar
function initMap() {
	myMap = new google.maps.Map(	
			document.getElementById('map'),
			{
				center: {lat:33.883988, lng: -118.231444},
				zoom: 12,
				styles: [
					{featureType:"poi", stylers:[{visibility:"off"}]},  // No points of interest.
					{featureType:"transit.station",stylers:[{visibility:"off"}]}  // No bus stations, etc.
				]
			}
		);
	let	buttons = document.getElementById("addrBtns").getElementsByTagName("button"); // knappar som ska få attributer och länkar
	
	for (let i = 0; i < markerData.length; i++) {
		let newMarker = new google.maps.Marker(markerData[i]); // Objekt för markering
		myMarkers.push(newMarker);	
	}
	let loop = ["0", "1", "2", "3", "4"];	// array som används för att ge attributnummer i loopen
	for (let i = 0; i <loop.length; i++) {	// loop som ger händelsehanterare och attributer till knappar
		buttons[loop[i]].innerHTML = markerData[loop[i]].title;
		buttons[loop[i]].addEventListener("click",showAddrMarker);
		buttons[loop[i]].setAttribute("data-ix",loop[i]);
	}
	userMarker = null;
	google.maps.event.addListener(myMap,"click",newUserMarker);
} // End initMap

// Sätt markerns position till var användaren klickade och lägg in markern på kartan.
function newUserMarker(e) {
	hideMarkers();
	userMarker = new google.maps.Marker();	// ny markör
	userMarker.setPosition({lat:e.latLng.lat(),lng:e.latLng.lng()});	// position för ny markör, använder parameter
	userMarker.setMap(myMap);		// sätter markör på kartan myMap
	let HTMLcode = "";	// text för latitud och longitud som ska läggas i mapLocationElem
	HTMLcode +=  
	"<p><b>Latitude:</b> " + e.latLng.lat() + "</p>" +	// tar ut latitud från positionen och lägger in i textsträngen
	"<p><b>Longitude:</b> " + e.latLng.lng() + "</p>";	// tar ut longitud från positionen och lägger in i textsträngen
	mapLocationElem.innerHTML = HTMLcode;
} // End newUserMarker

// Visa marker för den adressknapp som användaren klickat på
function showAddrMarker() {
	hideMarkers();
	let ix = this.getAttribute("data-ix");	// hämta attribut data-ix från knappen som trycktes på
	let newMarker = new google.maps.Marker(markerData[ix]); // Objekt för markering
	newMarker.setMap(myMap);	// sätt markör på kartan myMap
	myMarkers.push(newMarker);
} // End showAddrMarker

// Dölj alla markeringar
function hideMarkers() {
	for (let i = 0; i < myMarkers.length; i++) {
		myMarkers[i].setMap(null);
	}
	if (userMarker) userMarker.setMap(null);
} // End hideMarkers

// ----- Foton från Flickr ----- Extramerit

// Ajax-begäran av nya bilder
function requestImgsByLocation(lat,lon) {
	
} // End requestImgsByLocation

// Tolka svaret och visa upp bilderna.
function showMoreImgs(response) {
	
} // End showMoreImgs
