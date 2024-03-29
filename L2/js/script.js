// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas
var choice = "";	// används i if satser för att kolla om course eller subject används

// Initiering av globala variabler och händelsehanterare
function init() {
	subjectMenuElem = document.getElementById("subjectMenu");
	courseMenuElem = document.getElementById("courseMenu");
	subjectInfoElem = document.getElementById("subjectInfo");
	courseListElem = document.getElementById("courseList");
	subjectMenuElem.addEventListener("change",selectSubject);
	courseMenuElem.addEventListener("change",selectCourses);
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad

// ----- Meny 1 -----

// Avläs menyn för val av ämne
function selectSubject() {
	choice = "subject"; // variabel som används för att xml med ämnde ska behandlas
	let IdNr = this.selectedIndex;	// Det valda ämnet får ett nummer som används för att få rätt xml fil
	requestData(IdNr);	
} // End selectSubject

// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	choice = "course"; // variabel som används för att xml med kurser ska behandlas
	let IdNr = this.selectedIndex; // Det valda ämnet får ett nummer som används för att få rätt xml fil
	requestData(IdNr);
} // End selectCourses

// Gör ett Ajax-anrop för att läsa in begärd fil 
function requestData(IdNr) { // IdNr används för att få rätt XML kurs eller ämne
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	if (choice == "subject") {		// if sats för anrop för php xml ämnen
		request.open("GET","getSubInfo.php?file=http://medieteknik.lnu.se/1me323/subjects.xml&id=" + IdNr,true); 
	} 
	if (choice == "course") {		// if sats för anrop för xml-kurser
		request.open("GET","xml/courselist" + IdNr + ".xml",true); 
	} 
	// Skicka begäran till servern
	request.send(null); 
	request.onreadystatechange = function ()  { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
		if (request.status == 200) getData(request.responseXML); // status 200 (OK) --> filen fanns
	};
} // End requestDepartmentinfo

// Tolka subject XML-koden och skriv ut på önskad form
function getData(XMLcode) {
	let courseElems = XMLcode.getElementsByTagName("course"); // Lista (array) med alla kurs-element
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	if (choice == "subject") {	// loop som sker om valet var ett ämne
		// Referenser till elementen som ska användas inom ett subject-element
		let nameElem = XMLcode.getElementsByTagName("name")[0];
		let infoElem = XMLcode.getElementsByTagName("info")[0];
		HTMLcode += "<h3>" + nameElem.firstChild.data + "</h3>" + "<p>" + infoElem.firstChild.data + "</p>";
		subjectInfoElem.innerHTML = HTMLcode; // skriver ut resultaten 
	}
	if (choice == "course") { // titel och loop som sker om valet var en kurs
		let subjectName = XMLcode.getElementsByTagName("subject")[0];	
		courseListElem.innerHTML = "<h3>" + subjectName.firstChild.data + "</h3>"; // h3 titel med kursens ämne
		for (let i = 0; i < courseElems.length; i++) {
			// Referenser till elementen som ska användas inom ett course-element
			let codeElem = courseElems[i].getElementsByTagName("code")[0];
			let titleElem = courseElems[i].getElementsByTagName("title")[0];
			let creditElem = courseElems[i].getElementsByTagName("credits")[0];
			HTMLcode += "<p>" + codeElem.firstChild.data + ", " + titleElem.firstChild.data + ", " + creditElem.firstChild.data + "</p>";
		}
		courseListElem.innerHTML += HTMLcode;	// skriver ut resultaten 
	}
} // End getData