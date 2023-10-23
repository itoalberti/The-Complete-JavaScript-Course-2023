'use strict';
// // BANKIST APP

// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// // ELEMENTS

// // Label
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');
// // Container
// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');
// // Button
// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');
// // Input
// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

// SLICE - slices the array and picks the second half
console.log('SLICE');
console.log('1: ' + arr.slice(2)); //starts from position P in slice(P)
console.log('2: ' + arr.slice(2, 4)); //starts from position P up to (not including) Q in slice(P,Q)
console.log('3: ' + arr.slice(-3)); //picks the last 3 elements of the array
console.log('4: ' + arr.slice(1, -4)); //picks elements starting from position 1 up to (not including) position n-4
console.log('5: ' + arr.slice([...arr]));

// SPLICE - different from slice, it DOES change the array, eliminating some elements
console.log('SPLICE');
arr.splice(-3); // for splice, it slices out the last 3 elements
console.log('6: ' + arr);
console.log('7: ' + arr.splice(1, 3)); //starts at position 1 and goes up to (including) 3

arr = ['a', 'b', 'c', 'd', 'e'];
let rra = ['j', 'i', 'h', 'g', 'f'];

// REVERSE - reverses the array
console.log('8: ' + rra.reverse()); //reverse DOES change the array
console.log('9: ' + rra);

// CONCAT - concatenates 2 or more arrays arr1.concat(arr2, arr3,...)
const letters = arr.concat(rra);
console.log('10: ' + letters);
console.log('11: ', [...arr, ...rra]);

// JOIN - joins array elements with '*' between them
console.log('12: ' + letters.join('*'));

// AT - gets array element at position P in .at(P)
arr = [11, 22, 33, 44, 55, 66];
console.log('13: ' + arr.at(3)); //===arr[3]
// Very useful when one wants to get the last element of the array:
console.log(`14: ${arr.at(-1)}`);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log('15: Using a regular "for" function');
for (const movement of movements) {
  if (movement > 0) console.log('You deposited ' + movement + ' kwanzas.');
  else console.log('You withdrew ' + Math.abs(movement) + ' kwanzas.');
}

// FOREACH - substitutes the 'for' function
console.log('16: Using a "forEach()" function');
movements.forEach(function (movement) {
  if (movement > 0) console.log('You deposited ' + movement + ' dollars');
  else console.log('You withdrew ' + Math.abs(movement) + ' dollars');
});

console.log('17: Using a "forEach()" function again');
movements.forEach(function (mov, i) {
  if (mov > 0) console.log(`Movement ${i + 1}: you deposited $${mov}`);
  else console.log(`Movement ${i + 1}: you withdrew $${Math.abs(mov)}`);
});

console.log('18: Using a "forEach()" function another way');
for (const [i, mov] of movements.entries()) {
  if (mov > 0) console.log(`Movement ${i + 1}: deposit of $${mov}`);
  else console.log(`Movement ${i + 1}: withdrawal of $${Math.abs(mov)}`);
}

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (key, value) {
  console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (key, value) {
  console.log(`Key: ${key} | Value ${value}`);
});

// MAP - creates a new array populated with results of calling a function on every elemento of the array
const numbers = [2, 4, 6, 8, 10];
const numbers3x = numbers.map(function (item) {
  return 3 * item;
});
console.log(numbers3x);
