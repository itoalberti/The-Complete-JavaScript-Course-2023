// Coding Challenge #2
// Use the BMI example from Challenge #1, and the code you already wrote, and improve it.

// Your tasks:
// 1. Print a nice output to the console, saying who has the higher BMI. The message is either
// "Mark's BMI is higher than John's!" or "John's BMI is higher than Mark's!"

// 2. Use a template literal to include the BMI values in the outputs.
// Example: "Mark's BMI (28.3) is higher than John's (23.9)!"

let massM=78, heightM=1.69
let massJ=92, heightJ=1.95

console.log('DATA 1:')
console.log('Mark\'s mass:',massM, 'kg')
console.log('Mark\'s height:', heightM, 'm')
console.log('John\'s mass:', massJ,'kg')
console.log('John\'s height:', heightJ,'m')
// 2. Calculate both their BMIs using the formula (you can even implement both versions)
let BMI_M=massM/heightM**2
let BMI_J=massJ/heightJ**2
console.log('Mark\'s BMI:', BMI_M)
console.log('John\'s BMI:', BMI_J)
// 3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.
let markHigherBMI=BMI_M>BMI_J
console.log('markHigherBMI:', markHigherBMI)
if(BMI_M>BMI_J){
    console.log('Mark\'s BMI is higher than John\'s!')
} else{
    console.log('John\'s BMI is higher than Mark\'s!')
}

// Data 2
massM=95, heightM=1.88
massJ=85, heightJ=1.76
console.log('DATA 2:')
console.log('Mark\'s mass:',massM, 'kg')
console.log('Mark\'s height:', heightM, 'm')
console.log('John\'s mass:', massJ,'kg')
console.log('John\'s height:', heightJ,'m')
// 2. Calculate both their BMIs using the formula (you can even implement both versions)
BMI_M=massM/heightM**2
BMI_J=massJ/heightJ**2
console.log('Mark\'s BMI:', BMI_M)
console.log('John\'s BMI:', BMI_J)
markHigherBMI=BMI_M>BMI_J
console.log('markHigherBMI:', markHigherBMI)
if(BMI_M>BMI_J){
    console.log('Mark\'s BMI is higher than John\'s!')
} else{
    console.log('John\'s BMI is higher than Mark\'s!')
}
