'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: ['2019-11-18T21:31:17.178Z', '2019-12-23T07:42:02.383Z', '2023-01-28T09:15:04.904Z', '2023-04-01T10:17:24.185Z', '2020-05-08T14:11:59.604Z', '2020-05-27T17:01:17.194Z', '2023-07-07T23:36:17.929Z', '2023-07-11T10:51:36.790Z'],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: ['2019-11-01T13:15:33.035Z', '2019-11-30T09:48:16.867Z', '2019-12-25T06:04:23.907Z', '2020-01-25T14:18:46.235Z', '2020-02-05T16:33:06.386Z', '2020-07-23T14:43:26.374Z', '2020-07-25T18:49:59.371Z', '2020-07-26T12:01:20.894Z'],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / 86400000); //86400000 miliseconds in a day. This function calculates the amount of days passed

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log('daysPassed:', daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = `${date.getFullYear()}`.padStart(2, 0);
  //   return `${day}/${month}/${year}`;
  // }
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} €`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)} €`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// Fake always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// padStart(length, num) → pads the string with a predefined length and using 'num' as the padding character
// const day = String(now.getDate()).padStart(2, 0);

// Experimenting API
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

// picks the language of the browser
const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    // const locale = navigator.language;
    // console.log(locale);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});
// const day = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const year = now.getFullYear();
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Add loan date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
// LECTURES
/////////////////////////////////////////////////

// Conversion to number
console.log(Number('23'));
console.log(+'23'); // '+' sign converts string to number

// Parsing → gets the numerical part of a string when it starts with a number
console.log('parseInt:', Number.parseInt('30px'));
console.log('parseFloat:', Number.parseFloat('30.29px'));

// Checking if a value is a number (usually this is the best method)
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false
console.log(Number.isFinite(+'20abc')); //false
console.log(Number.isFinite(20 / 0)); //false

// Find the maximum number in an array
console.log(Math.max(5, 99, 1, 888, 35));
// Find the minimum number in an array
console.log(Math.min(5, 99, 1, 888, 35));

// Calculating the area of a circle of radius 10
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Creating a random integer between min and max
const randomInt = (min, max) => Math.trunc((max - min + 1) * Math.random()) + min;
console.log(randomInt(2, 7));

// Rounding to the nearest integer
console.log('Math.round()');
console.log(Math.round(23.3));
console.log(Math.round(23.8));

// Rounding to the next integer
console.log('Math.ceil()');
console.log(Math.ceil(87.2));
console.log(Math.ceil('87.8')); //works with strings too

// Rounding to the previous integer
console.log('Math.trunc()');
console.log(Math.trunc(44.9));
console.log(Math.trunc('44.1')); //works with strings too

// Rounding decimals
console.log((2.78969).toFixed(2));
console.log((2.78969).toFixed(4));

// Remainder of divisions
console.log(5 % 2); // → 1
console.log(7 % 5); // → 2
console.log(9 % 5); // → 4

const isEven = (n) => n % 2 === 0;
console.log(isEven(3));
console.log(isEven(8));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (isEven(i)) row.style.backgroundColor = '#F07878'; //color red
    if (i % 3 === 0) row.style.backgroundColor = '#78ECF0'; //color blue
  });
});

// Big integers
// The biggest number that JavaScript can represent is 2 ** 53 - 1
// To work with bigger numbers, it's necessary to use big integers (BigInt) by adding an 'n' to the end of the number.
console.log('Big Integers:');
console.log(29034582903841930485623409672389014920384109428523123);
console.log(29034582903841930485623409672389014920384109428523123n);
// Mathematical operations must be done always between equal types of numbers: int ←→ int / BigInt ←→ BigInt
console.log(34n + 1231232059032839475234759872163457892356n);

// Dates and times
// const now = new Date();
// console.log(now);
console.log(new Date('Sun Jan 30 2023'));

//    future = new Date(YY,  M-1, D, H,  MIN, S)
// Obs.: months in JS are counted starting from zero (January = 0)
const future = new Date(2048, 2, 15, 19, 45, 59);
console.log('future:', future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate()); //gets the day of the month
console.log(future.getDay()); //gets the day of the week
console.log(future.getTime());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.toISOString());
