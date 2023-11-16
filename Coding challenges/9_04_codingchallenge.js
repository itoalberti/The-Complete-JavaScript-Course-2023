// Coding Challenge #4
// Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to insert the elements), and conversion will happen when the button is pressed.

// ► Test data (pasted to textarea, including spaces):
// underscore_case
//   first_name
// Some_Variable
//  calculate_AGE
// delayed_departure
//
// ► Should produce this output(5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅

// Hints:
// • Remember which character defines a new line in the textarea
// • The solution only needs to work for a variable made out of 2 words, like a_b
// • Start without worrying about the ✅. Tackle that only after you have the variable name conversion working
// • This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

// Afterwards, test with your own test data!
// Algorithm order:
// → split string in the line breaks '\n'
// → split string before and after '_'
// → remove extra empty spaces
// → make first letter of first and second words lowercase and uppercase, respectively
// → join first and second word in one string

function formatText(text) {
  let finalText = '';
  text = text.split('\n');
  for ([i, line] of text.entries()) {
    // all characters lowercase, then remove empty spaces and line breaks, then split in evey '_'
    let splitLine = line.toLowerCase().trim().split('_');
    // join together the words of each line
    let newLine = splitLine[0] + splitLine[1][0].toUpperCase() + splitLine[1].slice(1);
    // join together all lines in one string finalText
    finalText += newLine.padEnd(20) + ' ' + '✅'.repeat(i + 1) + '\n';
  }
  console.log(finalText);
}

formatText('underscore_case \n   first_name \n Some_Variable  \n  calculate_AGE \n delayed_departure ');
