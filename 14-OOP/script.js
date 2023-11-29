'use strict';

// convention: constructor functions always start with capital letters
const PersonFn = function (firstName, birthYear) {
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

// Prototypes
PersonFn.prototype.calcAge = function () {
  //   console.log(2023 - this.birthYear);
  return 2023 - this.birthYear;
};

const tenorio = new PersonFn('Tenório', 1976);
console.log('tenorio:', tenorio);
console.log(tenorio.calcAge());
console.log(tenorio.__proto__);

PersonFn.prototype.species = 'Homo Sapiens';
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

// ________________________CLASSES________________________
// 1. Classes are not hoisted (they HAVE to be declared before being used)
// 2. Classes are first-class citizens: we can pass them into functions into functions and return them from functions
// 3. Classes are always executed in strict mode

// _________________________CLASS EXAMPLE_________________________BEGINNING
// class Person {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   get fullName() {
//     return `${this.firstName} + ${this.lastName}`;
//   }

//   set fullName(name) {
//     const names = name.split(' ');
//     this.firstName = names[0];
//     this.lastName = names[1];
//   }
// }

// const person = new Person('Benicio', 'Gonzalez');
// console.log(person);
// person.fullName = 'Miguel Velazquez';
// console.log(person);
// _________________________CLASS EXAMPLE_________________________END

class PersonCl {
  // First step in creating a class is to create a constructor
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2023 - this.birthYear);
  }
  greet() {
    console.log(`Hello ${this.firstName}!`);
  }
  // GETTERS AND SETTERS
  // They can be very useful for data validation
  // get: ACCESS properties from the inside
  get age() {
    return 2023 - this.birthYear;
  }
  // set: CHANGE properties from the outside
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
    // the variable _fullName will be recorded in the get method below
  }
  get fullName() {
    return this._fullName;
  }

  // Static methods are not accessible by the instances of the class
  // They can be accessed only by the class itself
  static hey() {
    console.log('Hello there!');
  }
}

const benicio = new PersonCl('Benicio Gonzalez', 1976);
console.log(benicio);
benicio.calcAge();
console.log(benicio.age);
console.log(benicio.fullName);
PersonCl.hey();

const PersonProto = {
  calcAge() {
    console.log(2023 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const jerusa = Object.create(PersonProto);
console.log(jerusa);
// jerusa.name = 'Jerusa';
jerusa.birthYear = 1965;
console.log(jerusa);
jerusa.calcAge;

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Best practice is to use 'call', so if 'Person' changes in the future, the changes will be carried down to 'Student'
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes, so Student will inherit Person's methods
Student.prototype = Object.create(Person.prototype);
// now, a new Student will be an instance of Person too

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and my major is ${this.course}`);
};

const leonard = new Student('Leonard', 1989, 'Physics');
leonard.introduce();
leonard.calcAge();
