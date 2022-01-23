function Slider(slider, enableKeys = true) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  let current;
  let prev;
  let next;

  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');
  const validKeys = ['ArrowLeft', 'ArrowRight'];

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    console.log(current);
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log(prev, next);
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move(direction) {
    // remove existing classes
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);

    if (direction === 'back') {
      // destructuring to avoid temp swap variables
      [prev, current, next] = [
        prev.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    } else {
      [prev, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  // Navigate with Arrow keys if the slider is in focus
  function handleKeyUp(event) {
    if (!validKeys.includes(event.key)) {
      return;
    }

    const inFocus =
      slider === document.activeElement ||
      slider.contains(document.activeElement);

    if (!inFocus) {
      return;
    }

    if (event.key === 'ArrowLeft') {
      move('back');
    } else {
      move();
    }
  }

  // Like a constructor, run this when Slider is created
  startSlider();
  applyClasses();

  prevButton.addEventListener('click', () => move('back'));
  // No argument passed, so it will default to forward movement
  nextButton.addEventListener('click', move);

  if (enableKeys) {
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keyup', handleKeyUp);
  }
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'), false);
