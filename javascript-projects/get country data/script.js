'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputForm = document.querySelector('.input-form');
const inputElement = document.querySelector('.input-element');
const country = document.querySelectorAll('.country');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `  
  <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    1
  )}M People</p>
  <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(
    ','
  )}</p>
  <p class="country__row"><span>💰</span>${
    Object.values(data.currencies)[0].name
  }</p>
  </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg, errorCode = 404) {
  const errorTemplate = `<div class="error-container">
    <div class="error-code">${errorCode}</div>
    <div class="error-message">${msg}</div>
    <div>
      <a class="error-home-link" href="/">Return to Home</a>
    </div>
  </div>`;

  countriesContainer.insertAdjacentHTML('beforeend', errorTemplate);
};

const getJson = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(errorMsg, response.status);
      // renderError(response.statusText, response.status);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  getJson(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      console.log(`Main Country:`, data[0]);

      const neighbour = data[0].hasOwnProperty('borders')
        ? data[0].borders[0]
        : false;

      if (!neighbour) throw new Error('Neighbour country not found.');

      return getJson(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'neighbour country not found.'
      );
    })

    .then(data => {
      renderCountry(data[0], 'neighbour');
      console.log(`Neighbour country:`, data[0]);
    })
    .catch(err => {
      renderError(err.message);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

inputForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (countriesContainer.hasChildNodes()) {
    console.log('child nodes');
    for (let i = 0; i < countriesContainer.children.length; i++) {
      countriesContainer.removeChild(countriesContainer.children[i]);
      countriesContainer.removeChild(countriesContainer.children[i]);
    }
  } else {
    // console.log('no child nodes');
  }
  getCountryData(inputElement.value);
  this.reset();
});
