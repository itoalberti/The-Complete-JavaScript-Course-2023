// Coding Challenge #3

// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!

// Test data:
// § Data 1: [5, 2, 4, 1, 15, 8, 3]
// § Data 2: [16, 6, 10, 5, 6, 1, 4]

// GOOD LUCK 😉

const calcAverageHumanAge = (ages) =>
  ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age) => acc + age / ages.length, 0);

const data1 = [5, 2, 4, 1, 15, 8, 3];
console.log(calcAverageHumanAge(data1).toFixed(1));

const data2 = [16, 6, 10, 5, 6, 1, 4];
console.log(calcAverageHumanAge(data2).toFixed(1));
