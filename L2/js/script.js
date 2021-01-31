// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas
var choice = "";	// används i if satser för att kolla om course eller subject används
var courseName;		// Referens till det aktuella kursämnets namn

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
	subject = this.value; // variabel för det valda ämnet
	// Det valda ämnet får ett nummer som används för att få rätt xml fil
	if (subject == "Medieteknik") {
		IdNr = 1;
	}
	if (subject == "Musikvetenskap") {
		IdNr = 2;
	}
	if (subject == "Svenska språket") {
		IdNr = 3;
	}
	choice = "subject"; // variabel som används för att xml med ämnde ska behandlas
	requestData(IdNr);
} // End selectSubject


// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	course = this.value; // variabel för den valda kursen
	courseName = course; // sparar kursens namn i en variabel
	// DeN valda kursen får ett nummer som används för att få rätt xml fil
	if (course == "Medieteknik") {
		IdNr = 1;
	}
	if (course == "Musikvetenskap") {
		IdNr = 2;
	}
	if (course == "Svenska språket") {
		IdNr = 3;
	}
	choice = "course"; // variabel som används för att xml med kurser ska behandlas
	requestData(IdNr);
} // End selectCourses

// Gör ett Ajax-anrop för att läsa in begärd fil 
function requestData(IdNr) { // IdNr används för att få rätt XML kurs eller ämne
	let request = new XMLHttpRequest(); // Object för Ajax-anropet
	if (choice == "subject") {		// if sats för anrop för php xml ämnen
		request.open("GET","getSubInfo.php?file=http://medieteknik.lnu.se/1me323/subjects.xml&id=" + IdNr,true); 
		request.send(null); 
	} 
	if (choice == "course") {		// if sats för anrop för xml-kurser
		request.open("GET","xml/courselist" + IdNr + ".xml",true); 
		request.send(null); 
	} 
	// Skicka begäran till servern
	request.onreadystatechange = function ()  { // Funktion för att avläsa status i kommunikationen
		if (request.readyState == 4) // readyState 4 --> kommunikationen är klar
		if (request.status == 200) getData(request.responseXML); // status 200 (OK) --> filen fanns
		else subjectInfoElem.innerHTML = "Den begärda resursen finns inte.";
	};
} // End requestDepartmentinfo

// Tolka subject XML-koden och skriv ut på önskad form
function getData(XMLcode) {
	let subjectElems = XMLcode.getElementsByTagName("subject"); // Lista (array) med alla ämne-element
	let courseElems = XMLcode.getElementsByTagName("course"); // Lista (array) med alla kurs-element
	let HTMLcode = ""; // Textsträng med ny HTML-kod som skapas
	if (choice == "subject") {
		for (let i = 0; i < subjectElems.length; i++) {
			// Referenser till elementen name och capital inom ett country-element
			let nameElem = subjectElems[i].getElementsByTagName("name")[0];
			let infoElem = subjectElems[i].getElementsByTagName("info")[0];
			HTMLcode += "<h3>" + nameElem.firstChild.data + "</h3>" + "<p>" + infoElem.firstChild.data + "</p>";
		}
		subjectInfoElem.innerHTML = HTMLcode; 
	}
	if (choice == "course") {
		courseListElem.innerHTML = "<h3>" + courseName + "</h3>";
		for (let i = 0; i < courseElems.length; i++) {
			// Referenser till elementen name och capital inom ett country-element
			let codeElem = courseElems[i].getElementsByTagName("code")[0];
			let titleElem = courseElems[i].getElementsByTagName("title")[0];
			let creditElem = courseElems[i].getElementsByTagName("credits")[0];
			HTMLcode += "<p>" + codeElem.firstChild.data + ", " + titleElem.firstChild.data + ", " + creditElem.firstChild.data + "</p>";
		}
		courseListElem.innerHTML += HTMLcode;
	}
} // End getData