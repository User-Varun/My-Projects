"use strict";

const submitBtn = document.querySelector(".submit");
const finalPrice = document.querySelector(".final-price");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const price = Number(document.getElementById("select1").value);
  const age = Number(document.getElementById("age").value);

  if (age >= 60) {
    // discount logic (15%)
    const updatedPrice = price - price * 0.15;
    finalPrice.textContent = "$" + updatedPrice;
  } else {
    finalPrice.textContent = "$" + price;
    console.log("you are regular");
  }
});
