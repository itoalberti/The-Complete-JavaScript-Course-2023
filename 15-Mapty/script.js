'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener('submit', this._newWorkout);

    inputType.addEventListener('change', function () {
      inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
      inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // In case location is provided:
        this._loadMap.bind(this),
        // In case location is not provided:
        function () {
          alert('Mapty could not get your current position');
        }
      );
    }
  }

  _loadMap(position) {
    alert('Mapty got your current position');
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.com.br/maps/place/${latitude},${longitude}`);

    const coords = [latitude, longitude];

    //   leaflet code:
    this.#map = L.map('map').setView(coords, 13); //   setView(coordinates, zoom level)
    // console.log('map:', map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //   'on' is an event created by the leaflet library
    this.#map.on('click', function (mapE) {
      this.#mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance(focus);
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout(e) {
    console.log(this);
    e.preventDefault();

    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    // display marker
    console.log(this.#mapEvent);
    const { lat, lng } = mapEvent.latlng;
    // creates marker from the coordinates
    L.marker([lat, lng], {
      riseOnHover: true,
    })
      .addTo(this.#map) // adds marker to the map
      // creates a pop-up and binds it to the marker
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup(); // opens the pop-up
  }
}

const app = new App();
app._getPosition();
