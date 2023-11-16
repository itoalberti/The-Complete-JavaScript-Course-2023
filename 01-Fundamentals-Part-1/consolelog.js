const year=1989;
console.log(`test`);
// usar crase para facilitar inserção de variáveis no console.log
console.log(`I was born in the year of ${year}`);

// imprimir string com várias linhas
console.log('primeira linha \nsegunda linha \nterceira linha')

// também é possível fazer assim (usando crase):
console.log(`quarta linha
quinta linha
sexta linha`)

var age=16
// maiordeidade é um booleano
const maiordeidade = age >= 18
if(maiordeidade){
    console.log('o cabra é maior de idade')
} else{
    console.log('o cara cheira leite ainda')
}

// = → assign value
// == → '18' == 18
// === → '18' != 18     using this operator is the best practice

// opens a promp pop-up in the browser
const favourite = prompt('What is your favourite number?')
console.log(favourite)
console.log(typeof favourite)
if (favourite==24) console.log('numero de boiola, boa escolha')

// !== → considers operands of different types to be different
if (favourite!==24) console.log('Favourite is not a number, it is a string')

// converts age from string to number
age=Number('18')
if(age===18) console.log('You are an adult')
console.log(typeof age)
if(typeof age == "string") console.log('age is a string')

// && - AND operator
// || - OR operator
const ImOlderThan18 = true
const ImMale = true

const Mauricio = ImOlderThan18 && ImMale
console.log(Mauricio) // will print "true"
if(ImOlderThan18) console.log("Mauricio is older than 18")
else console.log("Mauricio can't have no beers")