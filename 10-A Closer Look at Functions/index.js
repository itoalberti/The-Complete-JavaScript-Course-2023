'use strict';

const bookings = [];
const createBooking = function (flightNo = 1, numPassenger = 1, price = 250) {
  const booking = {
    flightNo,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('AA223');
createBooking('XY357', 75, 349);
createBooking('LF445', undefined, 1200); //skip an element of the function with 'undefined'

console.log(createBooking('BC567'));

const flight = 'FY456';
const mauricio = {
  name: 'Mauricio Alberti',
  passport: 'FJY4582',
};

const checkIn = function (flightNo, passenger) {
  flightNo = 'FY456';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 'FJY4582') alert('Passenger ' + passenger.name + ' checked in to flight ' + flightNo + '!');
  else alert('Wrong passport!');
};

checkIn(flight, mauricio);
console.log(flight);
console.log(mauricio);

const newPassport = function (passenger) {
  passenger.passport = 'TTT5555';
};

// when mauricio.passport is manipulated by newPassport, it changes values
newPassport(mauricio);
checkIn(flight, mauricio);
console.log(typeof newPassport);

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
console.log(oneWord('Jose Bonifacio de Andrada'));

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
console.log(upperFirstWord('Mario Ferreira dos Santos'));

const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`String "${str}" transformed by ${fn.name}`);
};

transformer('Javascript is so cool!', upperFirstWord);
transformer('Javascript is not so much fun...', oneWord);

const ayPapi = function () {
  console.log('ayy papi');
};

// document.body.addEventListener('click', ayPapi);
['Otacilio', 'Vandeco', 'Jerusa'].forEach(ayPapi);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Heey!');
greeterHey('Tobias');
greeterHey('Lindomar');

// transform greeterHey and greet into an arrow function
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArr('Olá')('Maurílio');

const aircanada = {
  airline: 'Air Canada',
  iataCode: 'AC',
  bookings: [],

  book(flightNum, name) {
    console.log(`${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`);
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

aircanada.book(91, 'Valdemar Alberti Jr.');
const book = aircanada.book;

// does NOT work:
// book(101, 'Gildo Avelar');

// calls the object 'aircanada' into the 'this' keyword so the line above works
book.call(aircanada, 101, 'Gildo Avelar');
console.log(aircanada);

book.call(aircanada, 848, 'Julia França');
console.log(aircanada);

const deltaAirlines = {
  airline: 'Delta Airlines',
  iataCode: 'DL',
  bookings: [],
};

book.call(deltaAirlines, 339, 'Benedito Calixto');
book.call(deltaAirlines, 559, 'Taborda Piramba');
console.log(deltaAirlines);

// Bind method
const bookDL = book.bind(deltaAirlines);
bookDL(405, 'Juciley Velasco'); // does the same as: book.call(deltaAirlines, 45, 'Juciley Velasco')

const bookAC = book.bind(aircanada);
bookAC(91, 'Leozin do Funk');

const bookAC92 = book.bind(aircanada, 92);
bookAC92('Carlos Charles');

// With event listeners
aircanada.planes = 300;
aircanada.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
document.querySelector('.buy').addEventListener('click', aircanada.buyPlane.bind(aircanada));

const addTax = (rate, value) => value * (1 + rate);
console.log(addTax(0.1, 300));

const addVAT = addTax.bind(null, 0.25);
console.log(addVAT(100));
console.log(addVAT(200));

// Immediately Invoked Function Expressions ---- IIFE
// When between parenthesis, the function will be executed only once
(function () {
  console.log('This function will never be executed again');
})();

(() => {
  console.log('This arrow function will ALSO never be executed again');
})();
