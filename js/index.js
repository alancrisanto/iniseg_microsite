import services from "./services.js";

// ------------------------------------- VARIABLES -----------------------------------

// Variable para detectar el path del archivo
const currentPagePath = window.location.pathname;
const isIndexPage = currentPagePath === "/index.html" || currentPagePath === "/";

// variables de lazy loading
const images = document.querySelectorAll(".img-lazy");

// vaiables para mostrar resto de parrafo movil
const btnMas = document.querySelector(".btnMore");
const btnLess = document.querySelector(".btnLess");
const showText = document.querySelector(".desplegar");

// variables para generar lista de paises en select
const select = document.querySelector(".section-select");

// variables para aplicar funcion focus input section-6
const input6 = document.querySelectorAll(".input-form");
const sectionDiv6 = document.querySelectorAll(".section-input");

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

// ALTERNAR COLORES EN CARDS
function coloresCards() {
	// const bgBlues = document.querySelectorAll(".section-1-text");
	const bgSlides = document.querySelectorAll(".section-4-desc");

	const bgGroup = [...bgSlides];

	bgGroup.forEach((blue, index) => {
		if (index % 3 === 0) {
			// blue.style.backgroundColor = "rgba(34,44,63,0.7)"; // Color blue
			blue.style.setProperty("--pseudo-element-color-main", "var(--blue)"); // Asignar color a pseudo elemento before
		} else if (index % 3 === 1) {
			// blue.style.backgroundColor = "rgba(251,192,9,0.5)"; // Color Yellow
			blue.style.setProperty("--pseudo-element-color-main", "var(--main-yellow)"); // Asignar color a pseudo elemento before
		} else {
			// blue.style.backgroundColor = "rgba(222,29,39,0.7)"; // Color Red
			blue.style.setProperty("--pseudo-element-color-main", "var(--red)"); // Asignar color a pseudo elemento before
		}
	});
}

// coloresCards();

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
const getPaises = async () => {
	const countries = services.countries;
	countries.forEach((country) => {
		const option = document.createElement("option");
		option.value = country.nombre;
		option.text = country.nombre;

		select.appendChild(option);
	});
};

getPaises();

// APLICAR FUNCION FOCUSINPUT A INPUTS DE SECTION 6
for (let i = 0; i < input6.length; i++) {
	focusInput(input6[i], sectionDiv6[i]);
}
