// // Coding Challenge #2
// // Your tasks:
// // 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')

// // 4. Create a new car and experiment with the 'accelerate' and 'brake' methods, and with the getter and setter.

// // Test data:
// // Data car 1: 'Ford' going at 120 km/h
// // GOOD LUCK

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    return (this.speed -= 5);
  }
  accelerate() {
    return (this.speed += 10);
  }

  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6)
  get speedUS() {
    console.log(`${this.make}'s speed is ${this.speed / 1.6} mi/h`);
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h,
  // (but converts it to km/h before storing the value, by multiplying the input by 1.6)
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const car = new CarCl('Ferrari', 120);
console.log(`CAR 1: ${car.make}`);
console.log(car.accelerate());
console.log(car.accelerate());
car.speedUS = 100;
console.log(car.speed);
car.speedUS;
console.log(car.brake());
console.log(car.brake());
car.speedUS;
console.log(car.accelerate());
console.log(car.brake());
console.log(car.accelerate());
console.log(car.brake());
console.log(car.brake());
car.speedUS;
