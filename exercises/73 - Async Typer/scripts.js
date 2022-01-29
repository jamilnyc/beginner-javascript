function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

/**
 *
 * @param {Element} element
 */
// async function draw(element) {
//   console.log(element);
//   const text = element.textContent;
//   let soFar = '';
//   for (const letter of text) {
//     soFar += letter;
//     element.textContent = soFar;

//     const { typeMin, typeMax } = element.dataset;
//     const waitTime = getRandomBetween(typeMin, typeMax);
//     await wait(waitTime);
//   }
// }

/**
 *
 * @param {Element} el
 */
function draw(el) {
  // Start with the first letter of the element
  let index = 1;
  const text = el.textContent;
  const { typeMin, typeMax } = el.dataset;

  // Recursively add another letter
  async function drawLetter() {
    el.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      const waitTime = getRandomBetween(typeMin, typeMax);
      await wait(waitTime);
      drawLetter();
    }
  }

  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
