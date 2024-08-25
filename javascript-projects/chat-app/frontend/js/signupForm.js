"use strict";

let accounts = [];

// Selected Elements
const signUpForm = document.querySelector(
  ".profile-settings-page-form-element"
);

// functions

const addUser = function (dataObj) {
  let previousData = JSON.parse(localStorage.getItem("accounts")) || [];
  let newUser = dataObj;

  previousData.push(newUser);

  localStorage.setItem("accounts", JSON.stringify(previousData));
};

// EventListeners
signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(signUpForm);
  addUser(Object.fromEntries(formData));
});
