import services from "./services.js";

const select_box = document.querySelector(".options");
const search_box = document.querySelector(".search-box");
const input_box = document.querySelector('input[type="tel"]');
const selected_option = document.querySelector(".selected-option div");

let options = null;

// Generar elemento lista con países, bandera y códigos
const getPaises = async () => {
	const countries = services.countries;

	countries.forEach((country) => {
		const option = `
    <li class="option">
        <div>
            <span class="iconify" data-icon="flag:${country.iso2.toLowerCase()}-4x3"></span>
            <span class="country-name">${country.nombre}</span>
        </div>
        <strong>+${country.phone_code}</strong>
    </li> `;

		select_box.querySelector("ol").insertAdjacentHTML("beforeend", option);
		options = document.querySelectorAll(".option");
	});

	options.forEach((option) => option.addEventListener("click", selectOption));
	search_box.addEventListener("input", searchCountry);
};

getPaises();

function selectOption() {
	const icon = this.querySelector(".iconify").cloneNode(true);
	const phone_code = this.querySelector("strong").cloneNode(true);

	const existingIcon = selected_option.querySelector(".iconify");
	if (existingIcon) {
		selected_option.replaceChild(icon, existingIcon);
	} else {
		selected_option.append(icon);
	}

	input_box.value = phone_code.innerText + " ";

	select_box.classList.remove("active");
	selected_option.classList.remove("active");

	search_box.value = "";
	select_box.querySelectorAll(".hide").forEach((el) => el.classList.remove("hide"));
}

function searchCountry() {
	let search_query = search_box.value.toLowerCase();
	for (let option of options) {
		let is_matched = option.querySelector(".country-name").innerText.toLowerCase().includes(search_query);
		option.classList.toggle("hide", !is_matched);
	}
}

selected_option.addEventListener("click", () => {
	select_box.classList.toggle("active");
	selected_option.classList.toggle("active");
});

// Función para cerrar lista de países al dar click en cualquier parte del documento
document.addEventListener("click", (event) => {
	if (!select_box.contains(event.target) && !selected_option.contains(event.target)) {
		select_box.classList.remove("active");
		selected_option.classList.remove("active");
	}
});
