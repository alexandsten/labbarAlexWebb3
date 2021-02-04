// Globala variabler
var linkListElem;	// Referens till div-elementet för länkarna
var linkInText;		// Referens till kurslänkar inne i p textfältet
var courseListElem;	// Referens till div-element där valda kurser ska läggas.

// Initiering av globala variabler och händelsehanterare.
function init() {
	linkListElem = document.getElementById("linkList");
	document.getElementById("linkBtn").addEventListener("click",listLinks);

	linkInText = document.querySelectorAll("main section:nth-of-type(1) div a");
	// Array med referenser till alla li-element i den andra section
	let courseElems = document.querySelectorAll("main section:nth-of-type(2) div:first-of-type li");
	for (let i = 0; i < courseElems.length; i++) {
		courseElems[i].addEventListener("click",addCourse);
		courseElems[i].style.cursor = "pointer";
	}
	courseListElem = document.getElementById("courseList");
	
	document.getElementById("teacherBtn").addEventListener("click",addTeachers); // Används i extramerit
} // End init
window.addEventListener("load",init); // init aktiveras då sidan är inladdad
// ---------------------------------------------------------------
// Kopiera alla länkar ur huvudtexten och lägg upp dem i en lista.
function listLinks() {
	
	for (let i = 0; i < linkInText.length; i++) {
	let newElem = document.createElement("p");
	let clonedElem = linkInText[i].cloneNode(true); // Klonat element
	clonedElem.setAttribute("target", "_blank");
	newElem.appendChild(clonedElem);
	linkListElem.appendChild(newElem);
	document.getElementById("linkBtn").removeEventListener("click",listLinks);
	}
	

} // End listLinks
// ---------------------------------------------------------------
// Den kurs användaren klickat på, läggs in överst i kurslistan.
function addCourse(e) {
	let newElem = document.createElement("p");
	newElem.innerHTML = this.innerHTML;
	alert("" + newElem.innerHTML + "");
}

// Den kurs användaren klickat på i kurslistan, tas bort.
function removeCourse() {
	
} // End removeCourse
// ---------------------------------------------------------------
// ----- Extramerit -----
// Funktion som lägger till kursansvariglärare i kurslistan
function addTeachers() {
	const teachers = ["Romain Herault","Rune Körnefors","Jorge Zapico"];
	const teacherLinks = ["https://lnu.se/personal/romain.herault","http://lnu.se/personal/rune.kornefors","https://lnu.se/personal/jorgeluis.zapico/"];
	
} // End addTeachers
