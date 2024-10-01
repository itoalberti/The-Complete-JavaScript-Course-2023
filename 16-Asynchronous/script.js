'use strict';

const btn = document.querySelector('.btn-country');
const counstriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  counstriesContainer.insertAdjacentText('beforeend', msg);
  counstriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const languages = Object.values(data.languages)[0];
  const currencies = Object.values(data.currencies)[0].name;
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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  // 'fetch' returns a promise, therefore the need for the 'then' functions
  return fetch(url).then((resp) => {
    if (!resp.ok) throw new Error(`${errorMsg}: Error ${resp.status}`);
    return resp.json();
  });
};

const getCountryData = function (country) {
  // COUNTRY 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `Country not found`)
    .then((data) => {
      console.log('Main country:');

      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log('Neighbour:');
      if (!neighbour) throw new Error(`No neighbour found!`);

      // COUNTRY 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, `Neighbour country not found`);
    })
    .then((data) => {
      renderCountry(data[0], 'neighbour');
    })
    // catch: catches any errors that occur in the chain
    .catch((err) => {
      console.error(err);
      renderError(`${err.message}. Make the necessary corrections and try again.`);
    })
    // finally: is always called at the end of the promise, no matter its result
    .finally(() => {});
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
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

const whereAmI = async function (country) {
  // Geolocation
  const pos = await getPosition();
  console.log('pos:', pos);
  const { latitude: lat, longitude: lng } = pos.coords;

  // fetch(`https://restcountries.com/v3.1/name/${country}`);
  const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  console.log('resGeo: ', resGeo);
  const dataGeo = await resGeo.json();
  console.log('dataGeo:');
  console.log(dataGeo);
};

btn.addEventListener('click', function () {
  getCountryData(`peru`);
});

whereAmI();
