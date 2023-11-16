// // Coding Challenge #1

// Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures.
// Example: [17, 21, 23] will print "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."

// Your tasks:
// 1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. Try it with both test datasets.
// 2. Use the problem-solving framework: Understand the problem and break it up into sub-problems!

// Test data:
// § Data 1: [17, 21, 23]
// § Data 2: [12, 5, -5, 0, 4]

// Problems:
// 1) transform array in string                                    [17,21,23] ► T='17,21,23'
// 2) concatenate string items in string to print all numbers:
// 'T[0]' + '°C in i days' + '...' + 'T[1]' + '°C in i+1 days' + '...' + 'T[last]' + '°C in i_last days'

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let temp = arr.toString();
  let t = '';
  for (let i = 0; i < arr.length; i++) {
    t = t + arr[i].toString() + ` °C in ${i + 1} days ... `;
    // console.log(t);
  }
  return t;
};

console.log(printForecast(temp1));
console.log(printForecast(temp2));
