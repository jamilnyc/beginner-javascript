console.log('Prototype Slider');
/**
 * Create a Slider with the given element.
 *
 * @param {Element} slider Container that has slides
 * @param {boolean} enableKeys Allow the slider to be focusable and controlled with arrow keys
 */
function Slider(slider, enableKeys = true) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in');
  }

  this.slider = slider;
  this.enableKeys = enableKeys;

  this.slides = this.slider.querySelector('.slides');
  this.prevButton = this.slider.querySelector('.goToPrev');
  this.nextButton = this.slider.querySelector('.goToNext');
  this.validKeys = ['ArrowLeft', 'ArrowRight'];

  // Bind appropriate "this" to handlers
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.move = this.move.bind(this);

  // Like a constructor, run this when Slider is created
  this.startSlider();
  this.applyClasses();

  this.prevButton.addEventListener('click', () => this.move('back'));
  // No argument passed, so it will default to forward movement
  this.nextButton.addEventListener('click', this.move);

  if (this.enableKeys) {
    // Allow the slider to be focused
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keyup', this.handleKeyUp);
  }
}

Slider.prototype.startSlider = function () {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.prev =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
};

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.prev.classList.add('prev');
  this.next.classList.add('next');
};

/**
 * Move to the next/previous slide
 *
 * @param {string} direction Optional. Set to 'back' when moving to previous slide.
 */
Slider.prototype.move = function (direction) {
  // remove existing classes
  const classesToRemove = ['prev', 'current', 'next'];
  this.prev.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);

  if (direction === 'back') {
    // destructuring to avoid temp swap variables
    [this.prev, this.current, this.next] = [
      this.prev.previousElementSibling || this.slides.lastElementChild,
      this.prev,
      this.current,
    ];
  } else {
    [this.prev, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }

  this.applyClasses();
};

/**
 * Handle navigation with arrow keys on slider.
 *
 * @param {KeyboardEvent} event
 */
Slider.prototype.handleKeyUp = function (event) {
  if (!this.validKeys.includes(event.key)) {
    return;
  }

  const inFocus =
    this.slider === document.activeElement ||
    this.slider.contains(document.activeElement);

  if (!inFocus) {
    return;
  }

  // this.move(event.key === 'ArrowLeft' ? 'back' : null);
  if (event.key === 'ArrowLeft') {
    this.move('back');
  } else {
    this.move();
  }
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'), false);
console.log(mySlider);
