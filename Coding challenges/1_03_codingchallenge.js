// Coding Challenge #3

// There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times.
// The winner with the highest average score wins a trophy!

// Your tasks:
// 1. Calculate the average score for each team, using the test data below
// 2. Compare the team's average scores to determine the winner of the competition, and print it to the console.
// Don't forget that there can be a draw, so test for that as well (draw means they have the same average score)

// 3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher
// score than the other team, and the same time a score of at least 100 points.
// Hint: Use a logical operator to test for minimum score, as well as multiple else-if blocks
// 4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score
// and both have a score greater or equal 100 points. Otherwise, no team wins the trophy

// Test data:
// § Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
// § Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
// § Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

// Data 1
var d1=96, d2=108, d3=89
var Dolphins_avg=(d1+d2+d3)/3
var k1=88, k2=91, k3=110
var Koalas_avg=(k1+k2+k3)/3
console.log('Data 1:')
console.log(`Dolphins' average score is ${Dolphins_avg}\nKoalas' average score is ${Koalas_avg}`)

if (Dolphins_avg>Koalas_avg){
    console.log('Dolphins are the winners!')
} else if (Dolphins_avg==Koalas_avg){
    console.log('It is a draw!')
} else console.log('Koalas are the winners')

console.log('Bonus 1:')
d1=97, d2=112, d3=101
k1=109, k2=95, k3=123
if(d1>k1 && d1>100) console.log(`Dolphins scored ${d1} points and won the first match`)
else if (d1==k1) console.log(`The first match was a draw`)
else if (d1<k1 && k1>=100) console.log(`Koalas scored ${k1} points and won the first match`)
else console.log(`Nobody scored at least 100 points or won the first match`)

if(d2>k2 && d2>100) console.log(`Dolphins scored ${d2} points and won the second match`)
else if (d2==k2) console.log(`The second match was a draw`)
else if (d2<k2 && k2>=100) console.log(`Koalas scored ${k2} points and won the second match`)
else console.log(`Nobody scored at least 100 points or won the second match`)

if(d3>k3 && d3>=100) console.log(`Dolphins scored ${d3} points and won the third match`)
else if (d3==k3) console.log(`The third match was a draw`)
else if(d3<k3 && k3>=100) console.log(`Koalas scored ${k3} points and won the third match`)
else console.log(`Nobody scored at least 100 points or won the third match`)

console.log('Bonus 2:')
d1=97, d2=112, d3=101
k1=109, k2=95, k3=106
if(d1>k1 && d1>100) console.log(`Dolphins scored ${d1} points and won the first match`)
else if (d1==k1) console.log(`The first match was a draw`)
else if (d1<k1 && k1>=100) console.log(`Koalas scored ${k1} points and won the first match`)
else console.log(`Nobody scored at least 100 points or won the first match`)

if(d2>k2 && d2>100) console.log(`Dolphins scored ${d2} points and won the second match`)
else if (d2==k2) console.log(`The second match was a draw`)
else if (d2<k2 && k2>=100) console.log(`Koalas scored ${k2} points and won the second match`)
else console.log(`Nobody scored at least 100 points or won the second match`)

if(d3>k3 && d3>=100) console.log(`Dolphins scored ${d3} points and won the third match`)
else if (d3==k3) console.log(`The third match was a draw`)
else if(d3<k3 && k3>=100) console.log(`Koalas scored ${k3} points and won the third match`)
else console.log(`Nobody scored at least 100 points or won the third match`)

