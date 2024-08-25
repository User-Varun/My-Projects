const button = document.querySelectorAll(".btn");

const modalWindow = document.querySelector(".modal-window");

const overlay = document.querySelector(".overlay");

const closeModal = function () {
  modalWindow.classList.toggle("hide-modal");
  overlay.classList.toggle("hide-modal");
};

button.forEach((btn) => {
  btn.addEventListener("click", closeModal);
});

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", closeModal);
