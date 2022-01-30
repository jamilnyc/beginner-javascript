const baseEndpoint = 'https://recipes.beginnerjavascript.com/api';

// Since there is no CORS policy on the Recipe site, we can use a simple
// proxy to get around CORS issues
// You must first visit https://cors-anywhere.herokuapp.com/corsdemo to enable temporary access to your browser
const proxyUrl = 'https://cors-anywhere.herokuapp.com';

const form = document.querySelector('form.search');
const recipesGrid = document.querySelector('.recipes');

/**
 * Make API request and return response data.
 *
 * @param {string} query Search term to pass to the API
 * @returns {Array} List of matching recipes
 */
async function fetchRecipes(query) {
  const url = `${proxyUrl}/${baseEndpoint}?q=${query}`;
  const res = await fetch(url);
  console.log('Fetching', url);
  const data = await res.json();
  return data;
}

/**
 * Return HTML formatting for the given array of recipes.
 *
 * @param {Array} recipes
 */
function displayRecipes(recipes) {
  if (!recipes.length) {
    recipesGrid.innerHTML = `<p class="no-recipes">Sorry, we couldn't find any recipes for that.</p>`;
    return;
  }

  const html = recipes.map(
    (recipe) => `<div class="recipe">
    <h2>${recipe.title}</h2>
    <p>${recipe.ingredients}</p>
    ${
      recipe.thumbnail
        ? `<img src="${recipe.thumbnail}" alt="${recipe.title}" />`
        : ``
    }
    <a href="${recipe.href}" target="_blank">View Recipe →</a>
    </div>`
  );

  recipesGrid.innerHTML = html.join('');
}

/**
 * Make API Request and update the UI with results
 *
 * @param {string} query Search term to pass to the UI
 */
async function fetchAndDisplay(query) {
  form.submit.disabled = true;
  const recipes = await fetchRecipes(query);
  console.log(recipes);
  form.submit.disabled = false;
  displayRecipes(recipes);
}

/**
 *
 * @param {Event} event
 */
async function handleSubmit(event) {
  event.preventDefault();
  const el = event.currentTarget;
  console.log(el.query.value);
  await fetchAndDisplay(el.query.value);
}

form.addEventListener('submit', handleSubmit);
fetchAndDisplay(form.query.value);
