import services from "./services.js";

// ------------------------------------- VARIABLES -----------------------------------

// Variable para detectar el path del archivo
const currentPagePath = window.location.pathname;
const isIndexPage = currentPagePath === "/index.html" || currentPagePath === "/";

// variables de lazy loading
const images = document.querySelectorAll(".img-lazy");

// variables para generar lista de paises en select
const selectForm = document.querySelector(".section-select");

// variables para aplicar funcion focus input section-6
const input6 = document.querySelectorAll(".input-form");
const sectionDiv6 = document.querySelectorAll(".section-input");

// TABS INFO CURSO
const tabs = document.querySelectorAll(".tab-btn");
const contentTab = document.querySelectorAll(".content-tab");

// Efector fade
const sections = document.querySelectorAll(".fade-effect");

// Formulario Te llamamos teléfono
const callFormSelect = document.querySelector(".callFormSelect");

// Year Copyright
const copyYear = document.querySelector(".copy-year");

const Year = new Date().getFullYear();

// ------------------------------------- FUNCIONES -----------------------------------

// LAZY LOADING
let imageoptions = {};

let observer = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		const image = entry.target;
		const newSrc = image.getAttribute("data-src");

		// Escuchamos el evento 'load' para asegurarnos de que la imagen se haya cargado por completo
		image.onload = () => {
			// Eliminamos la clase "pulse" una vez que la imagen se haya cargado
			image.classList.remove("pulse");
			observer.unobserve(image);
		};

		image.src = newSrc;
	});
}, imageoptions);

images.forEach((image) => {
	observer.observe(image);
});

// ANIMATION OBSERVER
let animationObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("fade-show");
		}
	});
});

sections.forEach((el) => animationObserver.observe(el));

// SWIPER
const swiperHeader = new Swiper(".swiperHeader", {
	spaceBetween: 30,
	loop: true,
	effect: "fade",
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	keyboard: {
		enabled: true,
	},
});

function focusInput(inputElement, div) {
	inputElement.addEventListener("focus", () => {
		div.style.border = "2px solid rgb(var(--main-yellow)) ";
	});

	inputElement.addEventListener("blur", () => {
		div.style.border = "none";
	});
}

// GENERAR LISTA DE PAÍSES EN SELECT OPTION
const getPaises = async (select) => {
	const countries = services.countries;
	countries.forEach((country) => {
		const option = document.createElement("option");
		option.value = country.nombre;
		option.text = country.nombre;

		select.appendChild(option);
	});
};

getPaises(selectForm);
getPaises(callFormSelect);

// APLICAR FUNCION FOCUSINPUT A INPUTS DE SECTION 6
for (let i = 0; i < input6.length; i++) {
	focusInput(input6[i], sectionDiv6[i]);
}

// TABS INFO CURSO
tabs.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		// Remueve todas las clases active de los tabs
		tabs.forEach((tb) => tb.classList.remove("active"));
		// Añade el active al tab seleccionado
		tab.classList.add("active");
		//Remueve la clase active de todos los contents
		contentTab.forEach((contTab) => {
			contTab.classList.remove("active");
		});
		// Añade la clase active al content seleccionado
		contentTab[index].classList.add("active");
	});
});

// Copyright Year
copyYear.innerHTML = Year;

// Validación formulario te llamamos
(() => {
	"use strict";

	const forms = document.querySelectorAll(".needs-validation");

	// Loop over them and prevent submission
	Array.from(forms).forEach((form) => {
		form.addEventListener(
			"submit",
			(event) => {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}

				form.classList.add("was-validated");
			},
			false,
		);
	});
})();
