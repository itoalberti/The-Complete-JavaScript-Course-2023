'use strict';

// prettier-ignore

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  constructor(coords, distance, duration) {
    // this.date =...
    // this.id =...
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}

// +++++++++++++++++++++++++ RUNNING +++++++++++++++++++++++++
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// +++++++++++++++++++++++++ CYCLING +++++++++++++++++++++++++
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

const run1 = new Running([39, -15], 5.2, 26, 186);
const cycling1 = new Cycling([42, -11], 32, 84, 221);
console.log(run1);
console.log(cycling1);

// ######################### APPLICATION ARCHITECTURE #########################
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        // In case location is provided:
        this._loadMap.bind(this),
        // In case location is not provided:
        function () {
          alert('Mapty could not get your current position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    console.log(latitude, longitude);
    console.log(`https://www.google.com.br/maps/place/${latitude},${longitude}`);

    //   leaflet code:
    this.#map = L.map('map').setView(coords, 13); //   setView(coordinates, zoom level)
    // console.log('map:', map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //   'on' is an event created by the leaflet library
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      // every: function checks if every 'inp' satisfies the condition. If yes, returns true. If not, false.
      inputs.every((inp) => Number.isFinite(inp) && Number(inp) > 0);

    console.log(this);
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    // If workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence))
        !validInputs(distance, duration, cadence)
      )
        return alert('All inputs must be positive numbers');
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(elevationGain))
        !validInputs(distance, duration, elevation)
      )
        return alert('All inputs must be positive numbers');
    }

    // Add new object to workout array

    // Render workout on map as a marker
    const { lat, lng } = this.#mapEvent.latlng;
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

    // Render workout on list

    // Hide form and clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    // display marker
    console.log(this.#mapEvent);
  }
}

const app = new App();
