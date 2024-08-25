"use strict";

let accounts = [];

// Selected Elements
const signUpForm = document.querySelector(
  ".profile-settings-page-form-element"
);
const signUpBtn = document.querySelector(".sign-up-btn");

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

signUpBtn.addEventListener("click", () => {
  fetch("../public/html/sign-up.html")
    .then((response) => response.text())
    .then((data) => {
      contentDiv.innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
});
