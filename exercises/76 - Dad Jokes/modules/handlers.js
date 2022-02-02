import fetchJoke from './api.js';
import { randomItemFromArray } from './util.js';
import { jokeHolder, jokeButtonSpan, enableLoader } from './elements.js';
import { buttonText } from './text.js';

export async function jokeButtonClickHandler() {
  enableLoader();
  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
  enableLoader(false);
}
