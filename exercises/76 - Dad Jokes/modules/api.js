const apiUrl = 'https://icanhazdadjoke.com';

/**
 * Make a request to the API and return the parsed JSON response.
 */
async function fetchJoke() {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export default fetchJoke;
