const clacBMI = function (mass, height) {
  return Math.round(mass / height ** 2);
};

const whoHasHigherBMI = function (BMIJhon, BMIMark) {
  if (BMIMark > BMIJhon) {
    console.log(`Mark's BMI(${BMIMark}) is higher than Jhon's BMI(${BMIJhon})`);
  } else if (BMIJhon > BMIMark) {
    console.log(`Jhon's BMI(${BMIJhon}) is higher than Mark's BMI(${BMIMark})`);
  } else {
    console.log(`Jhon & Mark has Same BMI(${(BMIJhon, BMIMark)})`);
  }
};

// TEST DATA  1
console.log("-------------------DATA 1------------------");
let BMIMark = clacBMI(78, 1.69);
let BMIJhon = clacBMI(92, 1.95);

whoHasHigherBMI(BMIJhon, BMIMark);

// TEST DATA 2
console.log("-------------------DATA 2------------------");
BMIMark = clacBMI(95, 1.88);
BMIJhon = clacBMI(85, 1.76);

whoHasHigherBMI(BMIJhon, BMIMark);
