/**
 * Utitlity function to wait
 *
 * @param {number} ms
 * @returns Promise
 */
function wait(ms = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Remove the popup with a 1 second delay to allow animation
 *
 * @param {Element} popup
 */
async function destroyPopup(popup) {
  popup.classList.remove('open');
  // Wait to allow animation
  await wait(1000);

  // The Old way
  // popup.parentElement.removeChild(popup);
  popup.remove();

  // popup continues to exist in memory even though it was removed from the DOM
  // so to prevent a memory leak, nullify it
  /* eslint-disable no-param-reassign */
  popup = null;
  /* eslint-enable no-param-reassign */
}

function ask(options) {
  // This promise will be fulfilled when the user submits or cancels the form in the prompt
  return new Promise(async (resolve) => {
    // Create a popup (form element) with all the fields in it
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `
        <fieldset>
            <label>${options.title}</label>
            <input type="text" name="input" />
            <button type="submit">Submit</button>
        </fieldset>
    `
    );

    // If this prompt can be cancelled
    if (options.cancel) {
      // Create a cancel button
      // Type need to be 'button' to override the default type of 'submit'
      // Otherwise clicking it would submit the form
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'Cancel';

      // Add the Cancel button to the end of the fieldset
      popup.firstElementChild.appendChild(skipButton);

      skipButton.addEventListener(
        'click',
        (e) => {
          // Resolve the promise with a null value, since the user cancelled
          resolve(null);
          destroyPopup(popup);
        },
        // Remove the listener after cancelling
        { once: true }
      );
    }

    // When a user submits (clicking submit or hitting enter)
    popup.addEventListener(
      'submit',
      (e) => {
        console.log('SUBMITTED');
        // Otherwise would reload the page (making a GET request)
        e.preventDefault();

        const promptAnswer = e.target.input.value;
        resolve(promptAnswer);
        destroyPopup(popup);
      },
      // We don't need the event listener after resolving
      // So only listen once and remove event listener
      {
        once: true,
      }
    );

    // Add the popup to the page (initially it is invisible, and clicks pass through)
    document.body.appendChild(popup);

    // Include a brief delay before adding the 'open' class so it can animate properly
    // Otherwise the event loop creates the element and adds classes 'popup' and 'open'
    // too quickly (almost same time) to allow for transition animations
    // Even a time of 0 ms might work because all we need is to put it at the end of the event loop
    // setTimeout(() => {
    //   popup.classList.add('open');
    // }, 50);

    await wait(50);

    // Open state: visible and on top
    popup.classList.add('open');
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;

  // Check to see if property exists
  const shouldCancel = 'cancel' in button.dataset;
  // Can also use this: button.hasAttribute('data-cancel')

  // Wait for the question to be answered before proceeding
  const answer = await ask({
    title: button.dataset.question,
    cancel: shouldCancel,
  });
  console.log('Answer:', answer);
}

// Apply listener to all the buttons
const buttons = document.querySelectorAll('[data-question]');
buttons.forEach((button) => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name?' },
  { title: 'What is your age?', cancel: true },
  { title: "What is your wife's name?" },
];

/**
 * Map the callback function's values to the given array elements, waiting for the callback to resolve each time.
 *
 * @param {Array} array
 * @callback callback
 * @returns {Array}
 */
async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    const result = await callback(item);
    results.push(result);
  }
  return results;
}

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
