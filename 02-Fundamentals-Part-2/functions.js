const mauricio = {
    firstName: 'Maurício',
    lastName: 'Alberti',
    birthYear: 1989,
    job: 'Analyst',
    friends: ['Sérgio', 'Marcelo', 'Ceará'],
    hasDriversLicense: true,

    // calcAge TYPE A
    calcAge_A: function (birthYear) {
        return 2023 - birthYear;
    },

    // calcAge TYPE B
    calcAge_B: function () {
        return 2023 - this.birthYear;
    },

    // calcAge TYPE C
    calcAge_C: function () {
        this.age = 2023 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName + ' ' + this.lastName} is a ${this.calcAge_B()}-year-old ${this.job} and has ${this.hasDriversLicense ? 'a' : 'no'} driver's license`;
    },
};


// Print the age by using function calcAge type A (an input is necessary):
console.log(mauricio.calcAge_A(2001));
console.log(mauricio['calcAge_A'](1989));

// Print the age by using function calcAge type B (no input is necessary):
console.log(mauricio.calcAge_B());
console.log(mauricio['calcAge_B']());

// Print the age by using function calcAge type C (no input necessary):
console.log(mauricio.calcAge_C());
console.log(mauricio['calcAge_C']());

console.log(mauricio.getSummary())