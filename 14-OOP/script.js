'use strict';

// convention: constructor functions always start with capital letters
const Person = function (firstName, birthYear) {
  // Instance properties:
  this.firstName = firstName;
  this.birthYear = birthYear;

  // NEVER create a method inside a constructor function:
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
  // It does work, but for every instance a function 'calcAge' would be created, hindering the code performance
  // Instead, it is best to use prototypes
};

// When the new object of class Person is called:
// 1. new {} object is created
// 2. function is called, 'this' keyword is the new {} object
// 3. {} is linked to the prototype
// 4. function automatically returns {} object (which may no longer be empty)
const tenorio = new Person('Tenório', 1976);
console.log('tenorio:', tenorio);

// Prototypes
Person.prototype.calcAge = function () {
  //   console.log(2023 - this.birthYear);
  return 2023 - this.birthYear;
};

console.log(tenorio.calcAge());
console.log(tenorio.__proto__);

Person.prototype.species = 'Homo Sapiens';
console.log(tenorio.species);
console.log(tenorio.hasOwnProperty('firstName'));
console.log(tenorio.hasOwnProperty('species'));

const arr = [3, 4, 6, 4, 32, 43, 43, 5, 0, 123];
console.log(arr);
console.log(arr.__proto__);

// By adding '.prototype.nameOfPrototype' to a class of objects, all instances of that class will inherit the prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
