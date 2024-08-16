'use strict';

const btn = document.querySelector('.btn-country');
const counstriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  counstriesContainer.insertAdjacentText('beforeend', msg);
  counstriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages)[0];
  console.log(`languages:`, languages);
  const currencies = Object.values(data.currencies)[0].name;
  console.log(`currencies:`, currencies);
  //
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} millions</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
</article>`;
  console.log('Country data:', data);
  counstriesContainer.insertAdjacentHTML('beforeend', html);
  counstriesContainer.style.opacity = 1;
};

const getCountryData = function (country) {
  // Fetch returns a promise, therefore the need for the 'then' functions
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((resp) => resp.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log('neighbour:', neighbour);
      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log('data2:', data);
      renderCountry(data[0], 'neighbour');
    })
    // catch: catches any errors that occur in the chain
    .catch((err) => {
      // alert(err),
      console.error(err), renderError(`Something went wrong: ${err.message}. Make the necessary corrections and try again`);
    })
    // finally: is always called at the end of the promise, no matter its result
    .finally(() => {});
};

// const getCountryAndNeighbour = function (country) {
//   // AJAX call country 1
//   const req = new XMLHttpRequest();
//   req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   req.send();

//   req.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log('data:', data);
//     renderCountry(data);

//     // Get neighbour country
//     const [neighbour] = data.borders;
//     console.log(`neighbour:`, neighbour);
//     if (!neighbour) return;

//     // AJAX call country 2
//     const req2 = new XMLHttpRequest();
//     req2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//     req2.send();
//     req2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log('data2:', data2);
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('lesotho');

// const req = new XMLHttpRequest();
//   req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// req.send();

btn.addEventListener('click', function () {
  getCountryData(`austria`);
});
