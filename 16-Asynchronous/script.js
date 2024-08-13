'use strict';

const btn = document.querySelector('.btn-country');
const counstriesContainer = document.querySelector('.countries');

const req = new XMLHttpRequest();
req.open('GET', 'https://restcountries.com/v3.1/name/brazil');
req.send();

// console.log(req.responseText);

req.addEventListener('load', function () {
  const [data] = JSON.parse(this.responseText);
  console.log(data);
});
