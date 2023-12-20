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

  _setDescription() {
// prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }
}

// tests
// +++++++++++++++++++++++++ RUNNING +++++++++++++++++++++++++
class Running extends Workout {
  type = 'running';
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
  type = 'cycling';
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
  #workouts = [];

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
    const allNumbers = (...inputs) =>
      // every: function checks if every 'inp' satisfies the condition. If yes, returns true. If not, false.
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => Number(inp) > 0);

    console.log(this);
    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout is running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // Check if data is valid
      if (!allNumbers(distance, duration, cadence) || !allPositive(distance, duration, cadence)) return alert('All inputs must be positive numbers');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout is cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      // Check if data is valid
      if (!allNumbers(distance, duration, elevation) || !allPositive(distance, duration)) return alert('All inputs must be positive numbers');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);

    // Render workout on map as a marker
    this.renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkoutMarker(workout);

    // Hide form and clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    // display marker
    console.log(this.#mapEvent);
  }
  _renderWorkoutMarker(workout) {
    // creates marker from the coordinates
    L.marker(workout.coords, {
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
          // className: `${workout.type}-popup`,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(workout.distance)
      .openPopup(); // opens the pop-up
  }

  _renderWorkoutMarker(workout) {
    const html = `
        <li class="workout workout--running" data-id="${workout.id}">
          <h2 class="workout__title">${workout.type.charAt(0).toUpperCase() + workout.type.slice(1)} on April 14</h2>
          <div class="workout__details">
            <span class="workout__icon">🏃‍♂️</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;
  }
}

const app = new App();
const a = 'running';
console.log(a.charAt(0).toUpperCase() + a.slice(1));
