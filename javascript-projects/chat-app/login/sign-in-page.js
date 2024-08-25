"use strict";

const signInForm = document.querySelector(".sign-in-info-page-form");

async function signup() {
  const email = signInForm.elements["email"].value;
  const password = signInForm.elements["password"].value;
  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      await response.text();
      alert("User login successfull 🎉");
      window.location.href = "home-page.html"; // Redirect to welcome page
    } else {
      const errorData = await response.json();
      console.log("Signin failed:", response.status, errorData.message);
      alert("Invalid username or password");
    }
  } catch (error) {
    console.error("Error during signin request:", error);
  }
}

signInForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("form submitted");
  signup();
});
