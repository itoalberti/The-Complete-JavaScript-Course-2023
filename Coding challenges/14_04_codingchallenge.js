// Coding Challenge #4

// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class,
//  and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!

// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 20;
    console.log(`The ${this.make} is going at ${this.speed}`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`The ${this.make} is going at ${this.speed}`);
    return this;
  }
}

class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  accelerate() {
    this.#charge--;
    this.speed += 20;
    console.log(`The ${this.make} is going at ${this.speed}, with ${this.#charge}% of battery charge`);
    return this;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  get speedUS() {
    console.log(`${this.make}'s speed is ${this.speed / 1.6} mi/h`);
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const rivian = new EVCl('Rivian', 180, 85);
console.log(rivian);
rivian.accelerate().accelerate().brake().chargeBattery(88).accelerate().accelerate().chargeBattery(98);
rivian.speedUS;
