const container = document.getElementById("countriesContainer");
const loading = document.getElementById("loader");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("regionFilter");

let allCountries = [];

async function getCountries() {
  loading.style.display = "block";

  try {
    const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,flags,region");
    const data = await res.json();

    allCountries = data;
    showCountries(allCountries);

  } catch (error) {
    container.innerHTML = "Error loading data";
  }

  loading.style.display = "none";
}

function showCountries(countries) {
  container.innerHTML = "";

  countries.map(country => {
    let currency = "N/A";

    if (country.currencies) {
      const key = Object.keys(country.currencies)[0];
      currency = country.currencies[key].name;
    }

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${country.flags.png}" />
      <h3>${country.name.common}</h3>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
      <p>Population: ${country.population}</p>
      <p>Currency: ${currency}</p>
      <button onclick="addFavorite('${country.name.common}')">❤️ Favorite</button>
    `;
    container.appendChild(div);
  });
}
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(value)
  );
  showCountries(filtered);
});


regionFilter.addEventListener("change", () => {
  const region = regionFilter.value;
  const filtered = region
    ? allCountries.filter(c => c.region === region): allCountries;
  showCountries(filtered);
});


function sortByPopulation() {
  const sorted = [...allCountries].sort((a, b) => b.population - a.population);
  showCountries(sorted);}

function addFavorite(name) {alert(name + " added to favorites");}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

getCountries();