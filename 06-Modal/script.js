'use strict';
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');
console.log(btnsOpenModal);

// function to remove the 'hidden' atribute in the modal and ovelaying message
const openModal = function () {
  console.log(`Button clicked`);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

// function to implement the 'close' function by adding the atribute 'hidden' to the class
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// close overlaying message when clicking the 'X'
btnCloseModal.addEventListener('click', closeModal);
// close overlaying message when clicking outside of it
overlay.addEventListener('click', closeModal);
// close overlaying message when pressing 'Esc'
// overlay.addEventListener('keydown', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    console.log(`The key '${event.key}' was pressed`);
    closeModal();
  }
});
