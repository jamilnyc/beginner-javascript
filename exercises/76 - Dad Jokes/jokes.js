const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

const apiUrl = 'https://icanhazdadjoke.com';
const jokeButton = document.querySelector('.getJoke');
const jokeHolder = document.querySelector('.joke');

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

/**
 * Return a random element from the given array, with the option to prevent duplicates.
 *
 * @param {Array} arr The array to randomly select from
 * @param {Object} not An element to NOT select, to prevent duplicate picks consecutively
 */
function randomItemFromArray(arr, not) {
  const index = Math.floor(Math.random() * arr.length);
  const item = arr[index];
  if (item === not) {
    // Call function again if we got a duplicate
    console.log('Text already used, calling again.');
    return randomItemFromArray(arr, not);
  }
  return item;
}

async function handleClick() {
  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButton.textContent = randomItemFromArray(
    buttonText,
    jokeButton.textContent
  );
}

jokeButton.addEventListener('click', handleClick);
