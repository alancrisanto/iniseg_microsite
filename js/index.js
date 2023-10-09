import services from "./services.js";

// ------------------------------------- VARIABLES -----------------------------------

// Variable para detectar el path del archivo
const currentPagePath = window.location.pathname;
const isIndexPage =
  currentPagePath === "/nuevaspaginasinternacionales23/" || currentPagePath === "/";

// variables de lazy loading
const images = document.querySelectorAll(".img-lazy");

//  variables para activar border al div con input activo
const sectionDiv = document.querySelector(".section-1-input");
const input = document.querySelector("#buscador");

// vaiables para mostrar resto de parrafo movil
const btnMas = document.querySelector(".btnMore");
const btnLess = document.querySelector(".btnLess");
const showText = document.querySelector(".desplegar");

// variables para generar lista de paises en select
const select = document.querySelector(".section-6-select");

// variables para aplicar funcion focus input section-6
const input6 = document.querySelectorAll(".input-6");
const sectionDiv6 = document.querySelectorAll(".section-6-input");

// Maptile API KEY
let mapTileKey = "FEsz9zSBz1HmiQbtTTxe";

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

// ACTIVAR BORDER AL DIV CUANDO EL INPUT TIENE EL CURSOR ACTIVO
function focusInput(inputElement, div) {
  inputElement.addEventListener("focus", () => {
    div.style.border = "2px solid rgb(var(--main-yellow)) ";
  });

  inputElement.addEventListener("blur", () => {
    div.style.border = "none";
  });
}

focusInput(input, sectionDiv);

// ALTERNAR COLORES EN CARDS
function coloresCards() {
  const bgBlues = document.querySelectorAll(".section-1-text");
  const bgSlides = document.querySelectorAll(".section-4-desc");

  const bgGroup = [...bgBlues, ...bgSlides];

  bgGroup.forEach((blue, index) => {
    if (index % 3 === 0) {
      // blue.style.backgroundColor = "rgba(34,44,63,0.7)"; // Color blue
      blue.style.setProperty("--pseudo-element-color-main", "var(--blue)"); // Asignar color a pseudo elemento before
    } else if (index % 3 === 1) {
      // blue.style.backgroundColor = "rgba(251,192,9,0.5)"; // Color Yellow
      blue.style.setProperty(
        "--pseudo-element-color-main",
        "var(--main-yellow)"
      ); // Asignar color a pseudo elemento before
    } else {
      // blue.style.backgroundColor = "rgba(222,29,39,0.7)"; // Color Red
      blue.style.setProperty("--pseudo-element-color-main", "var(--red)"); // Asignar color a pseudo elemento before
    }
  });
}

coloresCards();

// MOSTRAR RESTO DE PARRAFO MOVIL
function displayText() {
  if (showText.style.display === "none" || showText.style.display === "") {
    showText.style.display = "inline-block";
    btnMas.style.display = "none";
    btnLess.style.display = "inline-block";
  } else {
    showText.style.display = "none";
    btnMas.style.display = "inline-block";
    btnLess.style.display = "none"; // Hide the "Less" button
  }
}

if (isIndexPage) {
  btnMas.addEventListener("click", displayText);
  btnLess.addEventListener("click", displayText);
}

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

// Cards cursos section-1
const swiperCards = new Swiper(".swiperCards", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

// Cards cursos section-4
const swiper = new Swiper(".mySwiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

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

// LEAFLET
// Crear mapa con posicion inicial en Madrid
const map = L.map("map").setView([40.41536119762772, -3.6946609746996826], 2);

// Leaflet Default TileLayer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
});

// MapTiler Layer
const mtLayer = L.maptilerLayer({
  apiKey: mapTileKey,
  style: "6fc0cc43-e99b-42d8-9c84-83150805b6ca", //optional
}).addTo(map);

// Función para validar si uno de los números de telefono no existe en el geojson no mostrarlo
function mostrarTelf(phoneNumber) {
  if (phoneNumber !== "") {
    return `
      <div class="map-body-contact">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
          <path d="M15.5437 15.0445L12.0436 13.096C11.8941 13.0132 11.728 12.9958 11.5701 13.0463C11.4123 13.0968 11.2714 13.2126 11.1686 13.3761L9.61861 15.8361C7.18598 14.3462 5.22828 11.8032 4.08132 8.64323L5.9751 6.62976C6.10126 6.49648 6.19054 6.31344 6.22945 6.10834C6.26836 5.90325 6.25477 5.68728 6.19073 5.49312L4.69071 0.946564C4.62043 0.737264 4.49613 0.566377 4.33925 0.463371C4.18236 0.360364 4.00273 0.331694 3.83132 0.382305L0.58126 1.35657C0.415998 1.40614 0.26855 1.52701 0.162983 1.69946C0.0574151 1.87191 -3.80697e-05 2.08574 1.8926e-08 2.30606C1.8926e-08 12.7185 6.49699 21.1418 14.5003 21.1418C14.6699 21.1419 14.8346 21.0673 14.9674 20.9302C15.1002 20.7931 15.1933 20.6015 15.2315 20.3867L15.9815 16.1649C16.0202 15.9412 15.9977 15.7069 15.9178 15.5024C15.8379 15.2979 15.7056 15.136 15.5437 15.0445Z" fill="#195974"/>
        </svg>
        <p>${phoneNumber}</p>
      </div>`;
  }
  return "";
}

L.geoJSON(services.geoOffice, {
  onEachFeature: function (feature, layer) {
    let phone1HTML = mostrarTelf(feature.properties.phone1);
    let phone2HTML = mostrarTelf(feature.properties.phone2);

    if (layer instanceof L.Marker) {
      let customIcon = L.icon({
        iconUrl: feature.properties.icon, // Path de imagenes
        iconSize: [52, 52], // ajustar tamaño de íconos
      });

      layer.setIcon(customIcon);

      layer.bindTooltip("Ver Info");
    }

    layer.bindPopup(`<div class="card-map">
											<div class="card-map-head">
												<img class="card-map-img" src=${feature.properties.img} alt="foto director ${feature.properties.name}">
                        <div class="head-info">
                          <p>Director de INISEG</p>
                          <p>${feature.properties.country}</p>
                          <p>${feature.properties.name}</p>
                        </div>
											</div>
											<div class="card-map-body">
                        ${phone1HTML}
                        ${phone2HTML}
												<div class="map-body-contact">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
														<path d="M15.6969 5.42193C15.8187 5.30658 16 5.41449 16 5.59682V13.2064C16 14.1925 15.3281 14.9925 14.5 14.9925H1.5C0.671875 14.9925 0 14.1925 0 13.2064V5.60055C0 5.41449 0.178125 5.3103 0.303125 5.42565C1.00312 6.07312 1.93125 6.89548 5.11875 9.65279C5.77813 10.2258 6.89062 11.4315 8 11.424C9.11563 11.4352 10.25 10.2035 10.8844 9.65279C14.0719 6.89548 14.9969 6.0694 15.6969 5.42193ZM8 10.2296C8.725 10.2444 9.76875 9.14301 10.2937 8.68904C14.4406 5.10564 14.7562 4.79307 15.7125 3.90001C15.8937 3.73257 16 3.47209 16 3.19673V2.48973C16 1.50364 15.3281 0.703613 14.5 0.703613H1.5C0.671875 0.703613 0 1.50364 0 2.48973V3.19673C0 3.47209 0.10625 3.72885 0.2875 3.90001C1.24375 4.78935 1.55938 5.10564 5.70625 8.68904C6.23125 9.14301 7.275 10.2444 8 10.2296Z" fill="#FCC008"/>
													</svg>
													<p>${feature.properties.email}</p>
												</div>
												<div class="map-body-contact">
													<svg xmlns="http://www.w3.org/2000/svg" width="12" height="19" viewBox="0 0 12 19" fill="none">
														<path d="M10.2628 3.1391C9.13577 1.70881 7.64964 0.92041 6.07591 0.92041C2.72701 0.92041 0 4.27635 0 8.39977C0 11.0196 1.68759 13.9744 2.4146 15.1221C3.48321 16.8106 5.08321 18.7816 6.07591 18.7816C7.29051 18.7816 9.37226 15.4954 9.60584 15.1186C10.3241 13.9639 12 10.9917 12 8.39977C12 6.42876 11.3839 4.55892 10.2628 3.1391Z" fill="#FBC009"/>
													</svg>
													<p>${feature.properties.address}</p>
												</div>
											</div>
											<div class="card-map-footer">
												<a href="${feature.properties.link} target="_blank" rel="noopener noreferer">Visitar Web</a>
											</div>
										</div>`);

    // función para abrir popUp al dar click en la lista de países
    let countryElement = document.querySelector(
      `.country[data-name="${feature.properties.country.toLowerCase()}"]`
    );

    let lantLong = JSON.parse(countryElement.getAttribute("data-latlng"));

    if (countryElement) {
      countryElement.addEventListener("click", function () {
        layer._map.flyTo(lantLong, 8);
        // layer.togglePopup();
        // layer._map.setView(lantLong, 8);
      });
    }
  },
}).addTo(map);
