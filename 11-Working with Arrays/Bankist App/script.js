'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements

// querySelector → selects the element of class 'logo' from the HTML document
const logoApp = document.querySelector('.logo');
// addEventListener → adds a function to the constant 'logoApp'
logoApp.addEventListener('click', function () {
  console.log('You clicked the Bankist logo');
});

const labelWelcome = document.querySelector('.welcome');
labelWelcome.addEventListener('click', function () {
  console.log('You clicked the welcome label');
});
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

// LECTURES
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov} €</div>
          </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account2.movements);

const calcDisplayBalance = function balance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} €`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (acc) {
  // incomes
  const incomes = acc.movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €`;

  // outcomes
  const out = acc.movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} €`;

  // interest
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
// calcDisplaySummary(account1.movements);

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// MAP - affects all array elements individually in the same way
const movementsTripled = movements.map((mov) => mov * 3);
//movements.map(function(mov){
// return mov*3
// })
console.log('movementsTripled:', movementsTripled);

const movementsUSD = [];
const eurToUSD = 1.35;

// PUSH - pushes an element into the array's last position
for (const mov of movements) movementsUSD.push(mov * eurToUSD);
console.log('movementsUSD:', movementsUSD);

const movementsDescription = movements.map(
  (mov, i) =>
    // if (mov > 0) return `Movement ${i + 1}: Deposit of ${mov} euros`;
    // else return `Movement ${i + 1}: Withdrawal of ${Math.abs(mov)} euros`;
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)} euros`
);
console.log('movementsDescription:', movementsDescription);

// usernames = first letters of given and family names
const user = 'Benedito Inácio Mascarenhas';
const username = user
  .toLowerCase() //converts username to lowercase
  .split(' ') //splits username into an array
  .map((name) => name[0]) //maps the first letter of each name
  .join(''); //joins the first letter into one word
console.log(username);

// creates a username for each of the accounts and inserts them into the account arrays
const createUsername = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};
createUsername(accounts);
console.log('accounts:', accounts);

const updateUI = function (acc) {
  // Display account movements
  displayMovements(acc.movements);
  // Display account balance
  calcDisplayBalance(acc);
  // Display account sumary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;
    // in each call, print remaining time to user interface
    // when timer expires, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started!';
      containerApp.style.opacity = 0;
    }
    // decrease 1s
    time--;
  };
  // set time to 5 minutes
  let time = 120;
  // call timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (event) {
  // preventDefault: prevents the form from submitting
  event.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  console.log('currentAccount:', currentAccount);
  // ? → pin will be read only if currentAccount  exists
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN SUCCESSFUL');
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
  console.log('amount, receiverAcc', amount, receiverAcc);
  if (receiverAcc && amount > 0 && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    console.log('TRANSFER SUCCESSFUL');
    // Reset timer
    clearInterval(timer);
    timer = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  // SOME → boolean method. If some of the elements satisty a condition, returns true
  if (amount > 0 && currentAccount.movements.some((mov) => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
      console.log('LOAN SUCCESSFUL');

      // Reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

console.log(
  'every',
  movements.every((mov) => mov > 0)
);

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    // findIndex → finds the index of an object that satisfies a certain condition within an array
    const index = accounts.findIndex((acc) => acc.username === currentAccount.username);
    // Delete account
    // splice mutates the array
    accounts.splice(index, 1);
    console.log(`${currentAccount.username}'s account deleted`);
    // Hide UI
    containerApp.style.opacity = 100;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// FILTER - filters array based on chosen parameters
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log('deposits:', deposits);

// the function FILTER above has the same effect as the for loop below:
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log('depositsFor:', depositsFor);

const withdrawal = movements.filter((mov) => mov < 0);
console.log('withdrawal:', withdrawal);

// REDUCE - iterates through a number to increment
console.log('movements: ', movements);
const balance = movements.reduce(function (acc, element, i) {
  console.log(`Iteration ${i + 1}: ${acc + element}`);
  console.log('acc: ', acc);
  console.log('element: ', element);
  return acc + element;
  // this number below is the starting value of the number to be iterated
}, 77);

// Finding the maximum value in array movements
const maxNumber = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log('maxNumber:', maxNumber);

const totalDepositUSD = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);
console.log('totalDepositUSD:', totalDepositUSD);

// FIND → finds the position in the array of the first element that satisfies a condition
const firstWithdrawal = movements.find((mov) => mov < 0);
console.log('firstWithdrawal: ', firstWithdrawal);
// FIND → finds an object within the array that satisfies a condition. FIND is usually set to find only one element
const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log('account: ', account);

const arr = [[1, 2, 3], ['a', 'b', 'c'], 7, 'h'];
// FLAT → joins all elements from an array into a single array, whether they are other arrays or not
// if inside the parenthesis is inserted a value, that means the 'depth' level to which the 'flat' method will reach within the arrays
console.log(arr.flat());
const arr2 = [[[5, 5, 6], ['khj', 'akjsh'], 23], 1, 54];
console.log(arr2.flat());
console.log(arr2.flat(2));

const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log('overallBalance:', overallBalance);

console.log('accounts', accounts);
// FLATMAP → combines  flat and map in one method to make things more efficient
const overallBalance2 = accounts.flatMap((acc) => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log('overallBalance2:', overallBalance2);

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// SORT → sorts an array (by string, not by number). It changes the original array to the new order
console.log('owners:', owners.sort());
console.log('movements unsorted:', movements);
// to sort numbers in an ascending order, loop through the array with the 'sort' method like this:
movements.sort((a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
});
console.log('movements sorted in ascending order:', movements);
// to sort numbers in an descending order, loop through the array with the 'sort' method like this:
movements.sort((a, b) => {
  if (a < b) return 1;
  if (a > b) return -1;
});
console.log('movements sorted in descending order:', movements);

console.log('New array:', new Array(1, 2, 3, 4, 5, 6, 7));
let x = new Array(7); //creates an empty array with size 7
console.log(x);
// FILL → fills an empty array with defined arguments
// .fill(value, initialIndex, finalIndex+1)
x.fill(55, 3, 6); //replaces 'empty' with '55' in positions x[3] to x[5]
console.log(`x filled with 'fill':`, x);

// FROM → fills an array with ({length: }, (condition, index) => function)
x = Array.from({ length: 7 }, (_, i) => i * 2);
console.log(`x filled with 'from'`, x);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el) => Number(el.textContent.replace('€', '')));
  console.log('movementsUI:', movementsUI);
  if (currentAccount.owner.slice(-1) === 's') console.log(`${currentAccount.owner}' last movements:\n${currentAccount.movements}`);
  else console.log(`${currentAccount.owner}'s last movements:\n${currentAccount.movements}`);
});

const movementsUI2 = [...document.querySelectorAll('.movements__value')];
console.log('movementsUI2:', movementsUI2);
