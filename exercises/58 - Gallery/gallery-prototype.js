console.log('Prototype Version');

/**
 * @param {Element} gallery
 */
function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found');
  }
  this.gallery = gallery;

  // Select elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));

  // Shared by all galleries
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // bind our methods to the instance when we need them
  // bind() allows you to specify what "this" means in this function
  // At this point, this is the Gallery object
  this.showNextImage = this.showNextImage.bind(this);
  this.showPrevImage = this.showPrevImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  this.images.forEach((image) => {
    image.addEventListener('click', (e) => this.showImage(e.currentTarget));

    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    });
  });

  this.modal.addEventListener('click', this.handleClickOutside);
}

Gallery.prototype.openModal = function () {
  console.info('Opening modal ...');
  if (this.modal.matches('.open')) {
    console.info('Modal is already open');
    return;
  }
  this.modal.classList.add('open');

  // Bind closing functions when modal is open
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function (e) {
  // target is what was actually clicked (like innerModal)
  // currentTarget is where we are listening (modal)
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (event) {
  if (event.key === 'Escape') this.closeModal();

  if (event.key === 'ArrowRight') this.showNextImage();

  if (event.key === 'ArrowLeft') this.showPrevImage();
};

Gallery.prototype.showNextImage = function () {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPrevImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

Gallery.prototype.showImage = function (el) {
  if (!el) {
    console.info('No Image to show');
    return;
  }

  // Update the modal with the element information
  console.log(el);
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
console.log(gallery1);
console.log(gallery2);
