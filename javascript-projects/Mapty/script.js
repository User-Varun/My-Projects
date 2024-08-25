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


const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const editWorkoutForm =  document.getElementById('workoutForm')

// Edit form inputs 
const distanceForEdit = document.getElementById('distance')
const durationForEdit = document.getElementById('duration')
const cadenceForEdit = document.getElementById('cadence')
const elevationForEdit = document.getElementById('elevation')

// Workout Dom Elements 

let distanceDom ;
let durationDom ;
let cadenceDom ;
let elevationDom ;
let paceDom ;
let speedDom ;

// Delete all workouts el 
const DelAllWorkouts = document.querySelector('.workoutDeleteAll')



let workoutEditBtn;

// Workout Class
class Workout {

  date =  new Date()
  id = (Date.now() + '').slice(-10)
  
  constructor(distance, duration, coords) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords; // array of [lat , lng]
  } 

 

}

class Running extends Workout {

  type = 'running'

  constructor(distance , duration , coords , cadence) {
    super(distance, duration, coords);
    this.cadence = cadence;
    this.clacPace()
 
  }

  clacPace(){
    // min per km 
    this.pace = this.duration / this.distance;
  return this.pace
  }
}
class Cycling extends Workout {

  type = 'cycling'
  constructor(distance , duration , coords , elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
     this.calcSpeed()
     
  }

  calcSpeed(){
    //  km/h
    this.speed = (this.distance  / this.duration/60) 
    return this.speed;
  }
}




// App Class
class App {
  #map;
  #mapZoomLevel = 13
  #mapEvent;
  workouts = []
  workoutForEdit;
  // formData = {}

  constructor() {
    this._getPosition();
    
    this._getLocalStorage('9070746248')

    // Handling Form submission
    form.addEventListener('submit', this._newWorkout.bind(this));

    // handling form select changes
    inputType.addEventListener('change', this._toggleElevationField);


    // moving to the marker 
    containerWorkouts.addEventListener('click' , this._moveToPopup.bind(this))

    // Edit Workout Form
    editWorkoutForm.addEventListener('submit' , this._handleEditFormData)

    // Edit Workout Btn
    workoutEditBtn?.forEach(btn => btn.addEventListener('click' ,  this._editWorkout.bind(this)))



    // Delete all workouts 
     DelAllWorkouts.addEventListener('click' , this._deleteAllWorkouts)

       
  
  }

  _handleEditFormData(e){
    e.preventDefault()
  document.dispatchEvent(new CustomEvent('formSubmitted'));
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function error() {
        alert('could not get your position');
      }
    );
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    this.#map = L.map('map').setView([latitude, longitude], this.#mapZoomLevel);
  
    // Rendering Map To User's location
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling the Map click
    this.#map.on('click', this._showForm.bind(this));

    this.workouts.forEach(workout => {
      this._renderWorkoutMarker(workout)
    })

  }

  
  _setLocalStorage(id){
    
    let lastWorkout = JSON.stringify(this.workouts.pop())
    console.log(lastWorkout)
    window.localStorage.setItem( id , lastWorkout)
  }

  _getLocalStorage(){
    function getAllLocalStorageValuesParsed() {
      const allValues = [];
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          const value = localStorage.getItem(key);
          try {
              const parsedValue = JSON.parse(value);
              allValues.push(parsedValue);
          } catch (e) {
              allValues.push(value); // If value is not JSON, push as is
          }
      }
      return allValues;
  }

const data = getAllLocalStorageValuesParsed().flat(1)

   if(!data) return 

   this.workouts = data;

   this.workouts.forEach(workout => {
    this._renderWorkout(workout)
  })


  // Wrong way of doing!
  // if(data){
  //   data.forEach(element => {
  //    console.log(element)
  //    this._renderWorkout(element)
  //   //  this._renderWorkoutMarker(element)
    // });
  }
  
  _newWorkout(e) {
    e.preventDefault();

    let workout;

    function allPositive(...nums){
      return nums.every(num => num > 0)
     }
    
    // get data from form 
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

   

   // if workout runnning create running object 
    if(type === 'running'){
      const cadence = +inputCadence.value

         // check if data is valid 
      if(!allPositive(distance ,duration , cadence )) return alert("Positive Numbers Only! ✌")

      workout = new Running(distance , duration , this.#mapEvent.latlng , cadence )
    }

    // if workout cycling create cycling object 
    if(type === 'cycling'){
      const elevationGain = +inputElevation.value

         // check if data is valid 
      if(!allPositive(distance , duration)) return alert('Positive Numbers Only! ✌')

     workout = new Cycling(distance , duration , this.#mapEvent.latlng , elevationGain)
    }

    // add new object to workout array 
    this.workouts.push(workout)
    this._setLocalStorage(workout.id)


    // render workout on map as marker 
    this._renderWorkoutMarker(workout)

    // render workout on list 
    this._renderWorkout(workout)

    // hide the form + clear the inputs 
    this._hideForm()
  }
  
  
  _renderWorkout(workout){
    
  function setDescription(){
    workout.description =  `${workout.type[0].toUpperCase()}${workout.type.slice(1)} on ${new Date().toLocaleDateString('en' , { month : 'short' , day : '2-digit'})}`
    return workout.description
    }

  
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${setDescription()}</h2>
      
          <a class='workout__edit__btn' title='Edit Workout' ><img src="edit.png" alt="edit workout"></a>
          <div class="workout__details">
            <span class="workout__icon"> ${workout.type === 'running' ? '🏃' : '🚴‍♀️'}</span>
            <span class="workout__value distance-dom">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value duration-dom ">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
          `

    if(workout.type === 'running'){
      html += ` 
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value pace-dom ">${(
              workout.duration / workout.distance
              ).toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon  ">🦶🏼</span>
            <span class="workout__value cadence-dom">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`

     
    } 
    if(workout.type === 'cycling'){

      html += ` 
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value speed-dom ">${(
            workout.duration / workout.distance
            ).toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value elevation-dom ">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
    </li>`
    }
         
    containerWorkouts.insertAdjacentHTML('beforeend', html);

    // Reassign the workout edit btn varibale 
    workoutEditBtn = document.querySelectorAll('.workout__edit__btn');

    // handler for editing workout btn
    workoutEditBtn.forEach(btn => btn.addEventListener('click' ,this._editWorkout.bind(this)))


    // Reassign Dom Elemetns for data (distance , duration , etc...)
        distanceDom = document.querySelector('.distance-dom')
        durationDom = document.querySelector('.duration-dom')
        cadenceDom = document.querySelector('.cadence-dom')
        elevationDom = document.querySelector('.elevation-dom')
        paceDom = document.querySelector('.pace-dom')
        speedDom = document.querySelector('.speed-dom')

      // Del All Workout Btn
      this._AddOrRemoveDelBtn()

  }
        
  
  _renderWorkoutMarker(workout){
 
   L.marker(workout.coords)
   .addTo(this.#map)
   .bindPopup(
   L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(` ${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}  ${ workout.type === 'running' ? "Running" : "Cycling"} on ${new Date().toLocaleDateString('en' , { month : 'short' , day : '2-digit'})}`)
      .openPopup();
    }
  
  _showForm(mapE) {
      this.#mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    }
    
  _hideForm(){
    // clear input Fields
        inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
        '';

      // hide form
      form.style.display = 'none'
      form.classList.add('hidden')
      setTimeout(() => form.style.display = 'grid' , 1000)
    }

  _toggleElevationField() {
      if (inputType.value === 'cycling') {
        inputElevation.parentElement.classList.remove('form__row--hidden');
        inputCadence.parentElement.classList.add('form__row--hidden');
      } else {
        inputElevation.parentElement.classList.add('form__row--hidden');
        inputCadence.parentElement.classList.remove('form__row--hidden');
      }
    }

     
  _moveToPopup(e){
    const workoutEl = e.target.closest('.workout')

    if(!workoutEl ) return


    const workout = this.workouts.find(work => work.id === workoutEl.dataset.id) 
 
    if(!workout) window.location.reload()


    this.#map.setView(workout.coords , this.#mapZoomLevel , {animate : true , pan : {
      duration : 1
    }})



    }

  reset(){
     window.localStorage.removeItem('workouts')
     location.reload()
    }

  _editWorkout(e){
    e.stopPropagation()

  // Part 1 : Update The DOM 
  
  // open popup Form
    modal.style.display = 'block'

  // When the user clicks on <span> (x), close the modal
     span.onclick = function() {
      modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

 const self = this
  document.addEventListener('formSubmitted', function(){


  // selected Edit Workout 
   const editedWorkoutEl =  e.target.closest('.workout')
   if(!editedWorkoutEl ) return

   
//  Just Update the Dom Element for Now (On next page load it will get rendered 
// from localstorage correctly , this will solve the bug in edit workout finctionaity)

// (NEW Part 4 ) Updating the Dom Elements (for Temporary)


if(editedWorkoutEl.classList.contains('workout--running')){


  distanceDom.textContent = +distanceForEdit.value
  durationDom.textContent = +durationForEdit.value
  cadenceDom.textContent = +cadenceForEdit.value
  paceDom.textContent  = Number(durationForEdit.value)/ Number(distanceForEdit.value) 


}else{
  distanceDom.textContent = +distanceForEdit.value
  durationDom.textContent = +durationForEdit.value
  elevationDom.textContent = +elevationForEdit.value
  speedDom.textContent = Number(distanceForEdit.value)/ Number(durationForEdit.value) 
}

const editedWorkout = self.workouts.find(work => work.id === editedWorkoutEl.dataset.id) 

// Reloading to get all data setup 
if(!editedWorkout) window.location.reload()

 //  change the workout values (in object to send to localstorage and all -- not updating the dom)
  if(editedWorkout.type === 'running'){
   editedWorkout.distance  = +distanceForEdit.value
   editedWorkout.duration = +durationForEdit.value
   editedWorkout.cadence = +cadenceForEdit.value
   }else{
   editedWorkout.distance  = +distanceForEdit.value
   editedWorkout.duration = +durationForEdit.value
   editedWorkout.elevationGain = +elevationForEdit.value
  }
 
  // Part 2 : Update the LocalStorage 
 
 // Find the object in localStorage 
 const localStorageData = self._getLocalStorageDataWithId(editedWorkout.id)
 
 //  update the slected Object 
 if(editedWorkout.type === 'running'){
   localStorageData.duration =  +distanceForEdit.value
   localStorageData.distance = +durationForEdit.value
   localStorageData.cadence = +cadenceForEdit.value
 }else{
   localStorageData.duration =  +distanceForEdit.value
   localStorageData.distance = +durationForEdit.value
   localStorageData.elevationGain = +elevationForEdit.value
 }
 
 // // pass back to local storage 
 const updatedData = JSON.stringify(localStorageData)
 
 localStorage.setItem( editedWorkout.id , updatedData)
 

/*
 
 // Old Code (Produces bug -- in edit workout functionality)

//  // Part 3 : Render the newly Edited Workout
 self._renderWorkout(editedWorkout)
 
 
 //  Part 4 : Delete the old copy of new edited workout 
 const workoutsWithSameId = document.querySelectorAll(`[data-id='${editedWorkout.id}']`)
 

 const previousEl = workoutsWithSameId[0]
 
 if (workoutsWithSameId) {
   // Remove the selected element
  previousEl.remove();
   console.log('Previous Workout Removed');
 } else {
   console.log('Previous Workout Not found!.');
 }

*/


//  Part 5 : Clear the form and close the model 




modal.style.display = 'none'
})
  distanceForEdit.value = durationForEdit.value = cadenceForEdit.value = elevationForEdit.value = ''
}

 _getLocalStorageDataWithId(id){
  function getAllLocalStorageKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        keys.push(key);
    }
    return keys;
  }
  
  const keysArr = getAllLocalStorageKeys()
  
  const selectedKey = keysArr.find(key => key == id)
  
  if(selectedKey){

  // find the selected Objet
  const selectedObject = JSON.parse(localStorage.getItem(selectedKey))

  return selectedObject
  }else{
  console.log('not found')
  }

 }

 _deleteAllWorkouts(){

  const DoNotHaveSiblings = form.previousElementSibling !== null  && form.nextElementSibling !== null;
  
  if(DoNotHaveSiblings) return alert('There is nothing to Delete! ✌')

  if(form.nextElementSibling !== null){
    const userConfirmed = confirm('Do you want to delete all your workouts?')
    if (userConfirmed) {
   // Part 1 : Delete All data from localstorage 
          localStorage.clear()
   //  Part 2 : Reload the page 
      window.location.reload()
      } else {
         return 
      }
  }else{
    alert('There is nothing to Delete! ✌')
  }
  }

  _AddOrRemoveDelBtn(){
    
    if(form.nextElementSibling !== null) {
      DelAllWorkouts.classList.remove('hidden')
  
    }
  }
 }

const app = new App();





 