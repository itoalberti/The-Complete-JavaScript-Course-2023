// Coding Challenge #1
// Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula:
// BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter).

// Your tasks:
// 1. Store Mark's and John's mass and height in variables
// 2. Calculate both their BMIs using the formula (you can even implement both versions)
// 3. Create a Boolean variable 'markHigherBMI' containing information about whether Mark has a higher BMI than John.

// Test data:
// § Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// § Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76 m tall.


// 1. Store Mark's and John's mass and height in variables
// Data 1
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
