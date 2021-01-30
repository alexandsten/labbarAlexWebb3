// Globala variabler
var subjectMenuElem, courseMenuElem;	// Referenser till select-elementen för menyerna
var subjectInfoElem, courseListElem;	// Referenser till div-elementen där inläst data ska skrivas

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
	
} // End selectSubject


// ----- Meny 2 -----

// Avläs menyn för val av ämne för kurser
function selectCourses() {
	
} // End selectCourses
