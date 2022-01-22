function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found');
  }

  // Select elements we need
  const images = Array.from(gallery.querySelectorAll('img'));

  // Shared by all galleries
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');

  let currentImage;

  function openModal() {
    console.info('Opening modal ...');
    if (modal.matches('.open')) {
      console.info('Modal is already open');
      return;
    }
    modal.classList.add('open');

    // Bind closing functions when modal is open
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    // target is what was actually clicked (like innerModal)
    // currentTarget is where we are listening (modal)
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') closeModal();

    if (event.key === 'ArrowRight') showNextImage();

    if (event.key === 'ArrowLeft') showPrevImage();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function showImage(el) {
    if (!el) {
      console.info('No Image to show');
      return;
    }

    // Update the modal with the element information
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('img').src = el.src;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  images.forEach((image) => {
    image.addEventListener('click', (e) => showImage(e.currentTarget));

    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
