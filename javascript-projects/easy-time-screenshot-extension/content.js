console.log("Content script loaded.");

// Getting the elements on youtube Page

if (document.querySelector(".ytp-chrome-bottom") !== null) {
  // Removing video toolbar
  document.querySelector(".ytp-chrome-bottom").style.display = "none";

  // Removing End screen suggestions
  document.querySelector(".ytp-ce-covering-overlay").style.display = "none";

  const endScreenSuggestions = document.querySelectorAll(".ytp-ce-element");

  endScreenSuggestions.forEach((suggestions) => {
    suggestions.style.display = "none";
  });

  console.log("playerControls hidden");
} else {
  console.log(
    "There is no active video playing , please open a video and try again :)"
  );
}
