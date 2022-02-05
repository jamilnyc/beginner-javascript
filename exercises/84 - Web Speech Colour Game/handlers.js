import { isValidColor } from './colors';

function logWords(results) {
  const { transcript } = results[results.length - 1][0];
  console.log(transcript);
}

export function handleResult({ results }) {
  logWords(results);
  const words = results[results.length - 1][0].transcript;
  console.log(words);

  let color = words.toLowerCase();
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) {
    return;
  }

  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  console.log(`Valid Color: ${color}`);

  document.body.style.backgroundColor = color;
}
