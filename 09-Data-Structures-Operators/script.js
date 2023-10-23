// SOURCES OF DATA IN JS:
// 1) from the program itself: data written directly in the script
// 2) From  the UI: data input from user or data written in DOM (ex. taks in todo app)
// 3) From external sources: data fetched from web API
// Data must be stored somewhere → data structure, which can be mainly:
// - Arrays or sets   - for simple lists
// - Objects of maps  - for key/value pairs (allow us to describe values)

// Other built-in data structures:
// WeakMap, WeakSet
// And not built-in data structures:
// Stacks, Queues, Linked lists, Trees, Hash tables

// BUILT-IN DATA STRUCTURES
// ARRAYS_____________________________________________| SETS__________________________________________
// • use when we need an ordered list of values       |• use when we need to work with unique values
// • might contain duplicates                         |• use to remove duplicates from arrays
// • use when we need to manipulate data              |• use when high-performance is really important

// OBJECTS____________________________________________| MAPS__________________________________________
// • more 'traditional' key/value store               |• better performance
// • easier to write and access values with . and []  |• keys can have any data type, easier to iterate and to compute size
// • use when we need to inlcude functions (methods)  |• use when we just need to map keys to values
// • use when working with JSON (can convert to map)  |• use when we need keys that are not strings

'use strict';
const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const restaurant = {
  name: 'Pizzaria do Giusepe',
  location: 'Avenida Boa Vista 365, Presidente Venceslau, Brasil',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Rabo de Galo', 'Amendoim', 'Bruschetta', 'Salaminho com limão'],
  mainMenu: ['Pizza', 'Feijoada', 'Risoto'],
  openingHours: {
    // thu: {
    [week[4]]: {
      open: 12,
      close: 22,
    },
    // [week[5]]:{
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 9,
      close: 24,
    },
  },
  // order: function(starterIndex, mainIndex) {
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery({ starterIndex, mainIndex, time, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};
// checks if 'mon' exists in restaurant. If so, log open to console. If not, return undefined
console.log('Opening hours on monday:');
console.log(restaurant.openingHours.mon?.open);
// checks if 'fri' exists in restaurant. If so, log open to console. If not, return undefined
console.log('Opening hours on friday:');
console.log(restaurant.openingHours.fri?.open);

for (const day of week) {
  // checks if [day] exists in openinghours. If yes, logs open. If no, logs closed
  const opening = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day} we open at ${opening}`);
}

restaurant.orderDelivery({
  time: '22:30',
  address: 'Rua Siqueira Campos 800',
  mainIndex: 2,
  starterIndex: 2,
});

console.log('Restaurant order:', restaurant.order(1, 1));
const [starterCourse, mainCourse] = restaurant.order(2, 2);
console.log('Starter course:', starterCourse, mainCourse);

const arr1 = [2, 3, 4];
//  ... = spreader operator takes all elements of arr1 and puts them individually in arr2
const arr2 = [0, 1, ...arr1];
console.log('arr2 = ', arr2);

const newMenu = [...restaurant.mainMenu, 'Gnocchi'];
console.log('newMenu =', newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
console.log('Starter Menu:' + restaurant.starterMenu);
console.log('Main Menu:' + mainMenuCopy);
const menu = [...restaurant.starterMenu, ...mainMenuCopy];
console.log('Full Menu:' + menu);
for (const item of menu) console.log(item);
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}

const [x, y, z] = arr1;
console.log('x, y, z=', x, y, z);
console.log('arr1 =', arr1);

// main='Italian' | secondary='Vegetarian'
let [main, , secondary] = restaurant.categories;
console.log('main, secondary = ', main, secondary);

const temp = main;
main = secondary;
secondary = temp;

const nest = [2, 3, [5, 6]];
const [i, , [j, k]] = nest;
console.log('i, j, k =', i, j, k);

const { name, openingHours, categories } = restaurant;
console.log('name, openingHours, categories =', name, openingHours, categories);

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.log('restaurantName, hours, tags =', restaurantName, hours, tags);

// Iterables: arrays, strings, maps, sets. Objects are NOT iterables
const str = 'Mauricio';

// -------- DESTRUCTURING --------

// SPREAD, BECAUSE IT IS ON THE RIGHT SIDE OF =
// letters = [M, a, u, r, i, c, i, o]
const letters = [...str];
console.log('letters =', letters);

// REST, BECAUSE IT IS ON THE LEFT SIDE OF =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log('a, b, others =', a, b, others);
// a=1 | b=2 | others=[3, 4, 5]

const { sat, ...weekdays } = restaurant.openingHours;
console.log('weekdays =', weekdays);
// {thu : {...}, fri: {...}}

// -------- FUNCTIONS --------
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
};
add(2, 3);
add(9, 6, 42);
add(5, 76, 12, 16);

const X = [23, 6, 34];
add(...X);

const rest1 = {
  name: "Gilberto's Dog",
  numGuests: 77,
};

const rest2 = {
  name: 'Xis-burg do Faraó',
  owner: 'Paulinho Gontijo',
};

// Both lines below have the same meaning
// || 'OR' → checks first condition. If false or null, rest1.numGuests = 10
rest1.numGuests = rest1.numGuests || 10;
// rest1.numGuests = 77 → rest1.numGuests = 77
rest1.numGuests ||= 10;
console.log('--1-- rest1 = ', rest1);

// rest2.numGuests = false → rest.numGuests = 14
rest2.numGuests ||= 14;
console.log('--2-- rest2 = ', rest2);

// rest1.numGuests ??= 99 → rest1.numGuests =  99
// ??== = nullish assignment operator. If rest1.numGuests != null or undefined, assigns new value)
rest1.numGuests = 0;
rest1.numGuests ??= 99;
console.log('--3-- rest1 = ', rest1);

// && 'AND' → if expression != false, assigns new value (the last in the line)
let v1 = true;
v1 = true && 4;
console.log('v1 =', v1);
let v2 = 6 && 3;
console.log('v2 =', v2);
let v3 = true && false;
console.log('v3 =', v3);
let v4 = true && false;
console.log('v4 =', v4);
let v5 = false && true;
console.log('v5 =', v5);
let v6 = false && true;
console.log('v6 =', v6);

console.log(Object.keys(openingHours));
console.log(Object.values(openingHours));

// [key, value]
for (const [key, { open, close }] of Object.entries(openingHours)) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

// __________SETS__________
// Sets do not have order like lists. So it's not possible to use 'for' functions to loop through the set
const ordersSet = new Set(['Ovo colorido', 'Coxinha', 'Kibe', 'Bolovo', 'Espetinho']);
console.log(ordersSet);
console.log(ordersSet.has('Coxinha')); //true
console.log(ordersSet.has('Minduim')); //false
console.log(new Set(['Mauro', 'Paulo', 'Ana', 'Fabricio', 'Otacílio']));
ordersSet.delete('Coxinha');
console.log(ordersSet);
const staff = ['Waiter', 'Chef', 'Cook', 'Waiter', 'Manager', 'Cook'];
// to convert from a Set to an array:
const staffUnique = [...new Set(staff)];
console.log(staffUnique);

// __________MAPS__________
const loja = new Map();
loja.set('name', 'Jurema Modas').set('open', '9:00').set('close', '18:30');
console.log(loja);
console.log(loja.size);
console.log(loja.get('open'));

console.log(Object.entries(openingHours));

// convert object to map: Map(Object.entries(objetcToBeConverted))
const horas = new Map(Object.entries(openingHours));
console.log(horas);

// Quiz app
const question = new Map([
  ['question', 'What is the biggest country in the world?'],
  [1, 'China'],
  [2, 'Singapore'],
  [3, 'Russia'],
  [4, 'USA'],
  ['correct', 3],
  [true, 'Correct!'],
  [false, 'Try again!'],
]);

// it is not possible to print a map variable (in this case, 'question'). In order to do so, it is necessary to iterate through its items:
for (const [key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
console.log(question);
// const answer = Number(prompt('Your answer:'));
// console.log(answer);

console.log(question.get('correct'));
console.log(question.get(3));
console.log(question.get(true));
console.log(question.get(question.get('correct')));

// convert map to array
console.log([...question]);

const airline = 'Azul Linhas Aéreas';
const plane = 'E195';
// console.log(airline.indexOf(z)); // = 1
console.log(airline.slice(5)); //logs the string starting from position [5]
console.log(airline.slice(5, 11)); //logs the string starting from position [5] up to [10] - L i n h a s
console.log(airline.slice(5, airline.lastIndexOf('s'))); //logs the string starting from position [5] up to (not including) the last occurrence of 's'
console.log(airline.slice(-6)); //logs the string starting from the end, 6 positions down
console.log(airline.slice(1, -7)); //logs the string starting from [1]] up to 7 positions from the end

const checkMiddleSeat = function (seat) {
  // Seats  A___B___C     D___E___F
  //        1   2   3     4   5   6
  //        7   8   9     10  11  12
  //        13  14  15    16  17  18
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log(`${seat} is a middle seat`);
  else console.log(`${seat} is not a middle seat`);
};
checkMiddleSeat('1A');
checkMiddleSeat('8B');
checkMiddleSeat('15C');
checkMiddleSeat('10D');
checkMiddleSeat('17E');
checkMiddleSeat('6F');

let pessoa = 'fRaNcIsCo';
const pessoaLower = pessoa.toLowerCase(); // francisco
const pessoaCorrect = pessoaLower[0].toUpperCase() + pessoaLower.slice(1); // Francisco
console.log(pessoaCorrect);

const email = '   GildoCamarao@gmail.com   \n';
const normalizedEmail = email.toLowerCase().trim(); // trim = removes empty spaces and  the enter '\n'
console.log(normalizedEmail);

// replacing
const priceFr = '258,97 €';
const priceUS = priceFr.replace('€', '$').replace(',', '.'); //258.97 $
console.log(priceUS);

const announcement =
  'Attention passengers of flight AA123, boarding will start soon! Boarding for flight AA123 starts at 6:30 PM';
const newAnnouncement = announcement.replace(/flight AA123/g, 'train TR999'); // /words/g → replacement is global (all instances)
console.log(newAnnouncement);

// booleans
console.log(announcement.includes('airplane')); //false
console.log(announcement.includes('flight')); //true
console.log(announcement.startsWith('Att')); //true

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('gun') || baggage.includes('knife')) console.log('You are not allowed on board!');
  else console.log('Welcome aboard!');
};

checkBaggage('I have a submachinegun, snacks and a book.');
checkBaggage('Today I brought only a magazine, an orange and my knife so I can peel it.');
checkBaggage('In my bag I have a book and a bottle of water');

// split and join
pessoa = 'Martín González';
let pessoaSplit = pessoa.split(' ');
console.log(pessoaSplit); //['Martín1, 'González']
console.log('Señor ' + pessoaSplit.join(' '));

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    if (n != 'de' && n != 'da' && n != 'do' && n != 'e') namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
    else namesUpper.push(n);
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('josé bonifácio de andrada e silva');
capitalizeName('barack hussein obama');

console.log('Right-aligned text.'.padStart(30, '_'));
console.log('Aligned text.'.padStart(30, '-'));
console.log('Another aligned text.'.padStart(30, '*'));
console.log('Right-aligned text.'.padEnd(30, '_'));
console.log('Aligned text.'.padEnd(30, '-'));
console.log('Another aligned text.'.padEnd(30, '*'));
console.log('Right-aligned text.'.padStart(40, '_').padEnd(50, '*'));

// INPUT:
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel77439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
// OUTPUT:
// 🔴 Delayed Departure from FAO to TXL (11h25)
//               Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//             Departure from FAO to LIS (12h30)

for (const flight of flights.split('+')) {
  const [status, from, to, time] = flight.split(';');
  const output = `${status.startsWith('_Delayed') ? '🔴' : ''}${status.replaceAll('_', ' ')} ${from
    .slice(0, 3)
    .toUpperCase()} to ${to.slice(0, 3).toUpperCase()} (${time.replace(':', 'h')})`;
  console.log(output.padStart(40));
}
