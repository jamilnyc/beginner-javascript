export const jokeButton = document.querySelector('.getJoke');
export const jokeButtonSpan = jokeButton.querySelector('.jokeText');
export const jokeHolder = document.querySelector('.joke');
export const loader = document.querySelector('.loader');

export function enableLoader(enable = true) {
  if (enable) {
    jokeButtonSpan.classList.add('hidden');
    loader.classList.remove('hidden');
  } else {
    jokeButtonSpan.classList.remove('hidden');
    loader.classList.add('hidden');
  }
}
