'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navBtns = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const tabbedComponentBtns = document.querySelectorAll('button[data-tab]');
const height = header.getBoundingClientRect().height;
const imgs = document.querySelectorAll('img[data-src]');
const btnsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// sticky navbar
const headerObserverFn = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(headerObserverFn, {
  root: null,
  threshold: 0.1,
  rootMargin: '90px',
});

headerObserver.observe(header);

// smooth scrolling
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
navBtns.forEach((btn, index) =>
  btn.addEventListener('click', function () {
    const curSection = document.querySelector(`#section--${index + 1}`);

    curSection.scrollIntoView({ behavior: 'smooth' });
  })
);

// Reveal Text on Scroll
const sectionObserverFn = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionObserverFn, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy-Loading Imgs
const imgObserverFn = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgObserverFn, {
  root: null,
  threshold: 0.4,
});

imgs.forEach(img => imgObserver.observe(img));

// Tabbed component
tabbedComponentBtns.forEach((btn, index) => {
  btn.addEventListener('click', function () {
    const currentContent = document.querySelector(
      `.operations__content--${index + 1}`
    );

    btn.classList.remove('operations__tab--active');
    btnsContent.forEach(btn =>
      btn.classList.remove('operations__content--active')
    );

    btn.classList.add('operations__tab--active');
    currentContent.classList.add('operations__content--active');
  });
});

// Slider Component
const slider = function () {
  const dotsContainer = document.querySelector('.dots');
  const slides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider__btn--left');
  const sliderBtnRight = document.querySelector('.slider__btn--right');

  let currentSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToNext = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const goToPrev = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  sliderBtnRight.addEventListener('click', goToNext);
  sliderBtnLeft.addEventListener('click', goToPrev);

  dotsContainer.addEventListener('click', function (e) {
    console.log(e);
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      goToNext();
    }
    if (e.key === 'ArrowLeft') {
      goToPrev();
    }
  });
};
slider();
