const container = document.getElementById('countriesContainer');
const loader = document.getElementById('loader');
async function mera_hai() {
      showLoading(true);
    try {
          const  response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,currencies,population,flags,region');
        const  countries = await response.json();
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        renderCards(countries);
    } catch (err) {
              container.innerHTML = `<p class="error">Failed to load countries. Please refresh.</p>`;
            console.error(err);
        } finally {
          showLoading(false);
    }
}
  function renderCards(countries) {
     container.innerHTML = countries.map(country => {
        const capital = country.capital?.[0] || 'N/A';
            const population = country.population.toLocaleString();
         const currencyObj = country.currencies ? Object.values(country.currencies)[0] : null;
         const currency = currencyObj ? currencyObj.name : 'N/A';
        return `
            <div class="country-card">
                <img src="${country.flags.svg}"   alt="${country.name.common}  flag">
                <div class="card-body">

                    <h3>${country.name.common}</h3>
                    <p><strong>Region:</strong> ${country.region}</p>

                    <p><strong>Capital:</strong>  ${capital}   </p>

                    <p><strong>Population:</strong> ${population}   </p>
                    <p><strong>Currency:</strong> ${currency}</p>
                </div>
            </div>
        `;
        }).join('');

      }
function showLoading(isLoading) {
    loader.style.display = isLoading ? 'flex' : 'none';
    container.style.display = isLoading ? 'none' : 'grid';
      }
mera_hai();