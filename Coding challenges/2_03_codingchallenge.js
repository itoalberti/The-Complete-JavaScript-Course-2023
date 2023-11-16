// // Coding Challenge #3

// Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations!
// Remember: BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter)

// Your tasks:
// 1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
// 2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects).
//    Store the BMI value to a property, and also return it from the method
// 3. Log to the console who has the higher BMI, together with the full name and the respective BMI.
// Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.

const mark = {
    name: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.BMI = this.mass/this.height ** 2;
        return this.BMI.toFixed(2);
    },
};

const john = {
    name: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.BMI = this.mass/this.height ** 2;
        // toFixed(2) → limits the decimal places in the number to only 2
        return this.BMI.toFixed(2);
    },
};

console.log(`${john.name}'s mass is ${john.mass} kg and his height is ${john.height}m.
His BMI is ${john.calcBMI()}.`);

console.log(`${mark.name}'s mass is ${mark.mass} kg and his height is ${mark.height}m.
His BMI is ${mark.calcBMI()}.`);

console.log(mark.calcBMI>john.calcBMI ? `Mark's BMI (${mark.calcBMI()}) is higher than John's (${john.calcBMI()}))` : `John's BMI (${john.calcBMI()}) is higher than Mark's (${mark.calcBMI()}).`)