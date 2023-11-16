// // Coding Challenge #2
// // Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
// // Your tasks:
// // Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
// // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
// // If the dog is > 2 years old, humanAge = 16 + dogAge * 4
// // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
// // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
// // 4. Run the function for both test datasets
// // Test data:
// // § Data 1: [5, 2, 4, 1, 15, 8, 3]
// // § Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  // 1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
  // If the dog is > 2 years old, humanAge = 16 + dogAge * 4
  const dogAges = ages.map((age) => (age <= 2 ? 2 * age : age * 4 + 16));
  console.log(`The dogs' ages are ${dogAges.slice(0, dogAges.length - 1).join(', ')} and ${dogAges.slice(-1)}.`);

  // 2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
  const olderDogs = dogAges.filter((age) => {
    return age >= 18;
  });
  console.log(`The ages of  the dogs older than 18 are ${olderDogs.slice(0, olderDogs.length - 1).join(', ')} and ${olderDogs.slice(-1)}.`);

  // 3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
  const avgHumanAge = dogAges.reduce((acc, currentValue) => acc + currentValue, 0) / dogAges.length;
  console.log(`The average human age of the dogs is ${Math.round(avgHumanAge).toFixed(0)}.`);
};

let ages = [5, 2, 4, 1, 15, 8, 3];
console.log('FIRST DATASET:');
calcAverageHumanAge(ages);

ages = [16, 6, 10, 5, 6, 1, 4];
console.log('SECOND DATASET:');
calcAverageHumanAge(ages);
