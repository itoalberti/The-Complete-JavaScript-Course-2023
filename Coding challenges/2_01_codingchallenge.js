// Part 2 - #1 Coding Challenge

// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so one average score per team).
// A team only wins if it has at least double the average score of the other team. Otherwise, no team wins!

// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team as parameters
// ('avgDolhins' and 'avgKoalas'), and then logs the winner to the console, together with the victory points, according to the rule above.
// Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and Data 2
// 5. Ignore draws this time

// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores

// DATA 1:
// const d1=44, d2=23, d3=71;
// const k1=65, k2=54, k3=49;

// DATA 2:
const d1=85, d2=54, d3=41;
const k1=23, k2=34, k3=27;

const calcAverage = (x1, x2, x3) => (x1+x2+x3)/3;

const avgDolphins = calcAverage (d1, d2, d3);
console.log(`Dolphins' average score was ${avgDolphins}.`);
const avgKoalas = calcAverage (k1, k2, k3);
console.log(`Koalas' average score was ${avgKoalas}.`);

function checkWinner (dolphins, koalas){
    if (dolphins > 2*koalas) return console.log(`Dolphins win (${dolphins} vs. ${koalas}).`)
    else if (koalas > 2*dolphins) return console.log(`Koalas win (${koalas} vs. ${dolphins}).`);
}

checkWinner(avgDolphins, avgKoalas);
