function displayImage(event) {
  const photoPreview = document.getElementById("photoPreview");
  const file = event.target.files[0];

  if (file) {
    photoPreview.src = URL.createObjectURL(file);
  } else {
    photoPreview.src = "profile-picture.png";
  }
}
const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("form submitted");
  const formData = new FormData(signUpForm);
  // Convert the FormData object to a plain object
  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  // Convert the plain object to a JSON string
  const jsonData = JSON.stringify(formObject);

  const url = "http://localhost:3000/signup";
  const options = {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json", // Indicate the request body format is JSON
    },
    body: jsonData, // Convert the data to a JSON string
  };

  // Sending the data to server using fetch
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        return response.text();
      }
    })
    .then((data) => {
      console.log("Success:", data);
      alert("user Created Successfully");
    })
    .catch((error) => {
      console.error("user already exist", error);
      alert("User Already exist");
    });
});
