'use strict';

// -----------------CONSTANTS-----------------
// -------------------------------------------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const message = document.createElement('div');
const logo = document.querySelector('.nav__logo');
const h1 = document.querySelector('h1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const allButtons = document.getElementsByTagName('button');
const link = document.querySelector('.nav__link--btn');
const navHeight = nav.getBoundingClientRect().height;
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const maxSlide = slides.length;

// -----------------FUNCTIONS-----------------
// -------------------------------------------
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const alertH1 = (e) => {
  alert('addEventListener: Great! You are reading the heading!');
  // h1.removeEventListener('mouseenter', alertH1);
};
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//-----------------MENU FADE ANIMATION-----------------
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log('entry', entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
// -----------------LAZY LOADING IMAGES-----------------
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log('entry:', entry);
  if (!entry.isIntersecting) return;
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
// -----------------SLIDER-----------------
// 0%, 100%, 200%, 300%
const goToslide = function (slide) {
  slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
};
// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToslide(curSlide);
  activateDot(curSlide);
};
// Previous slide
const prevslide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToslide(curSlide);
  activateDot(curSlide);
};
// Dot container
const dotContainer = document.querySelector('.dots');
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${index}"></button>`);
  });
};
// Activate the dot
const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
const init = function () {
  goToslide(0);
  createDots();
  activateDot(0);
};

// -----------------INITIALIZE WEBSITE-----------------
init();

// -----------------MODAL WINDOW-----------------
//equivalent to: for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

console.log(document.documentElement); //documentElement = the whole HTML element in the index.html file
console.log(document.head);
console.log(document.body);
console.log('allSections = ', allSections);
console.log('allButtons = ', allButtons);
console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML = 'We use cookies for improved functionality and analytics. <buton class="btn btn--close--cookie">Got it!</button>';

// prepend: adds the element message as the first child of the header element
header.prepend(message);
// append: adds the element message as the last child of the header element
header.append(message);

// Inserts message before and after header
// header.before(message);
// header.after(message);

// Delete elements - delete the cookie message when clicking in "Got it!"
document.querySelector('.btn--close--cookie').addEventListener('click', function () {
  // message.remove();
  message.parentElement.removeChild(message);
});

// -----------------STYLES-----------------
message.style.backgroundColor = '#37383d';
message.style.width = '100%';

// console.log('height:', message.style.height); //doesn't work, because the console.log prints only properties defined with style
console.log('backgroundColor:', message.style.backgroundColor);
// getComputedStyle: solves the issue and prints the properties that were defined in the CSS file:
console.log('color', getComputedStyle(message).color);
console.log('height', getComputedStyle(message).height);

// parseFloat:  converts its 1st argument to string, parses that string as a decimal number literal, then returns a number or NaN
// e.g.: '43.67lkjsdf' → 43.67
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// setProperty: changes the style of the property (property name, to)
document.documentElement.style.setProperty('--color-primary', 'rgb(156,218,147)');

// -----------------ATTRIBUTES (elements that go into the tags <>)-----------------
console.log('logo.src:', logo.src);
console.log('logo.className:', logo.className);

// -----------------NON-STANDARD ATTRIBUTES-----------------
console.log(logo.designer); //results in nothing, therefore the 'getAttribute' string must be used
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(link.href); //shows the link as it is
console.log(link.getAttribute('href')); //shows the link as it was written in the 'href' element in the HTML file

// -----------------DATA ATTRIBUTES-----------------
console.log(logo.dataset.versionNumber); //data-version-number from index.html (it has to be 'translated' as camelCase)

// -----------------CLASSES-----------------
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// -----------------BUTTON SCROLLING-----------------
// getBoundingClientRect → proportional to the size of the viewport
btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log('s1coords', s1coords);
  // console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);
  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
  // Scrolling
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  // It's possible to substitute this whole code...
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollX,
  //   behavior: 'smooth', //scrolls smoothly to the defined point (left, top)
  // });
  // ...by:
  section1.scrollIntoView({ behavior: 'smooth' });
});

// -----------------PAGE NAVIGATION-----------------
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log('id:', id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log('id:', id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log('childNodes:', h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

// Going upwards: parents
console.log('parentNode', h1.parentNode);
console.log('parentElement', h1.parentElement);
// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling); //in this case, a sibling of h1, which does not exist
console.log('nextElementSibling', h1.nextElementSibling); //the next element sibling is h4, as it can be seen in the HTML file

console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// tabs.forEach((t) => t.addEventListener('click', () => console.log('TAB')));
tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));
  tabsContent.forEach((c) => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  console.log('clicked.dataset.tab:', clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// mouseenter: when the mouse moves over the specified element
// possible to use 'addEventListener' and 'onmouseenter', but 'addEventListener' is better
// h1.addEventListener('mouseenter', (e) => {
//   alert('addEventListener: Great! You are reading the heading!');
// });

// h1.onmouseenter = (e) => {
//   alert('onmouseenter: Great! You are reading the heading!');
// };

h1.addEventListener('mouseenter', alertH1);

// to remove the event listener that shows the alert:
// setTimeout(() => {
//   h1.removeEventListener('mouseenter', alertH1), 3000;
// });

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  // console.log('LINK', e.target, e.currentTarget);

  // Stop event propagation down the stream
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation (sticks the upper menu to the top of the page and keeps it there even when scrolling down)
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {
//     console.log('entry:', entry);
//   });
// };
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

console.log('nav', nav);
console.log('navHeight', navHeight);
headerObserver.observe(header);

// Reveal sections
// const allSections = document.querySelectorAll('.section');

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

imgTargets.forEach((img) => imgObserver.observe(img));

let curSlide = 0;
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevslide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevslide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    goToslide(slide);
    activateDot(slide);
  }
});
