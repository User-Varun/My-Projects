// "use strict";

// Elements
const inputForm = document.querySelector(".form-input");
const formBtn = document.querySelector(".form-btn");
const noteInput = document.querySelector(".create-note-input");
const noteContainer = document.querySelector(".notes-container");
const createNoteBtn = document.querySelector(".create-note-btn");

createNoteBtn.addEventListener("click", () => {
  inputForm.classList.remove("display-none");
});

let noteCount = 0;

const createNote = function (content) {
  console.log("got the content, here it is", content);

  const html = ` 
  <div class="notes">
    <p>Note <span class="note-number">${noteCount}</span></p>
    <p>Content: <span>${content}</span></p>
  </div>`;

  noteContainer.insertAdjacentHTML("beforeend", html);
  inputForm.classList.add("display-none");
  noteInput.value = "";
};

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  noteCount++;
  createNote(noteInput.value);
});
