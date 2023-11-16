// Coding Challenge #4

// Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

// Hints:
// • Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
// • Being within a range 10% above and below the recommended portion means:
// current > (recommended * 0.90) && current < (recommended * 1.10).
// Basically, the current portion should be between 90% and 110% of the recommended portion.

// Test data:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// Your tasks:

// 1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
// Do not create a new array, simply loop over the array.
// Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
dogs.forEach((dog) => (dog.recommendedFood = Number((dog.weight ** 0.75 * 28).toFixed(1))));

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
const sarahsDog = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(`Sarah's dog is eating too ${sarahsDog.curFood > sarahsDog.recommendedFood ? 'much' : 'little'}!`);
console.log('sarahsDog', sarahsDog);

// 3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
const ownersEatTooMuch = dogs.filter((dog) => dog.curFood > dog.recommendedFood).flatMap((dog) => dog.owners);
const ownersEatTooLittle = dogs.filter((dog) => dog.curFood < dog.recommendedFood).flatMap((dog) => dog.owners);
console.log('ownersEatTooMuch:', ownersEatTooMuch);
console.log('ownersTooLittle:', ownersEatTooLittle);

// 4. Log a string to the console for each array created in 3., like this:
// "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const strTooMuch = ownersEatTooMuch.slice(0, ownersEatTooMuch.length - 1).reduce((owner, i) => owner + ' and ' + i) + ` and ` + ownersEatTooMuch.slice(-1) + `'s dogs eat too much!`;
console.log('strTooMuch:', strTooMuch);
const strTooLittle = ownersEatTooLittle.slice(0, ownersEatTooLittle.length - 1).reduce((owner, i) => owner + ' and ' + i) + ` and ` + ownersEatTooLittle.slice(-1) + `'s dogs eat too little!`;
console.log('strTooLittle:', strTooLittle);

// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)
const exactAmount = dogs.some((dog) => dog.curFood === dog.recommendedFood);
console.log(exactAmount ? 'There is at least one dog eating the exactly recommended amount of food.' : 'No dogs are eating the exactly recommended amount of food.');

// 6. Log to the console whether there is any dog eating an okay amount of food (just true or false)
const checkFood = (dog) => dog.curFood >= 0.9 * dog.recommendedFood && dog.curFood <= 1.1 * dog.recommendedFood;
const correctAmount = dogs.some(checkFood);
console.log(correctAmount ? 'There is at least one dog eating the correct amount of food.' : 'No dogs are eating the correct amount of food.');

// 7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)
const dogsEatingOK = dogs.filter(checkFood);
console.log('dogsEatingOK:', dogsEatingOK);

// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order
// (keep in mind that the portions are inside the array's objects 😉)
const dogsSorted = dogs.sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood);
console.log('dogsSorted:', dogsSorted);
