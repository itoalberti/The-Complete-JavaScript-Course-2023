// Coding Challenge #2

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw"). Hint: Note how the odds and the game objects have the same property names
// 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }

'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    ['Neuer', 'Pavard', 'Martinez', 'Alaba', 'Davies', 'Kimmich', 'Goretzka', 'Coman', 'Muller', 'Gnarby', 'Lewandowski'],
    ['Burki', 'Schulz', 'Hummels', 'Akanji', 'Hakimi', 'Weigl', 'Witsel', 'Hazard', 'Brandt', 'Sancho', 'Gotze'],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = players1;
// const fieldPlayers = players1.slice(1, players1.length);
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
const team1 = game.odds.team1;
const draw = game.odds.x;
const team2 = game.odds.team2;
const printGoals = (...playersNames) => {
  console.log(playersNames);
  console.log(`printGoals = ${playersNames.length} goals were scored`);
};

console.log('players1 =', players1);
console.log('players2 =', players2);
console.log('gk =', gk);
console.log('fieldPlayers =', fieldPlayers);
console.log('allPlayers =', allPlayers);
console.log('players1Final =', players1Final);
console.log('team1 =', team1);
console.log('draw =', draw);
console.log('team2 =', team2);
console.log('printGoals =');
printGoals(...game.scored);
game.odds.team1 < game.odds.team2 && console.log('Team 1 is more likely to win');
game.odds.team1 > game.odds.team2 && console.log('Team 2 is more likely to win');

// 1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
for (const [i, player] of game.scored.entries()) console.log(`Goal ${i + 1}: ${player}`);
// another possibility:
// for (let i = 0; i < Object.keys(game.scored).length; i++) {
//   console.log(`Goal ${Number(Object.keys(game.scored)[i]) + 1}: ${Object.values(game.scored)[i]}`);
// }

// 2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
let avg = 0;
for (const odd of Object.values(game.odds)) {
  avg += odd;
}
avg /= Object.values(game.odds).length;
console.log('Average odd =', avg.toFixed(2));
// another possibility:
// for (let i = 0; i < Object.keys(game.odds).length; i++) {
//   avg += Object.values(game.odds)[i];
// }
// avg = avg / Object.keys(game.odds).length;
// console.log('Average odd =', avg.toFixed(2));

// 3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// for (i = 0; i < Object.keys(game.odds).length; i++) {}
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${odd}`);
}

// 4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
// {
// Gnarby: 1,
// Hummels: 1,
// Lewandowski: 2
// }
const scorers = {};
for (const player of game.scored) {
  // condition ? exprIfTrue : exprIfFalse
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
