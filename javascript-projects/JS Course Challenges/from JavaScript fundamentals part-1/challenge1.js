const clacBMI = function (mass, height) {
  return Math.round(mass / height ** 2);
};
const markHigherBMI = function () {
  return BMIMark > BMIJhon ? true : false;
};

// TEST DATA  1

let BMIMark = clacBMI(78, 1.69);
let BMIJhon = clacBMI(92, 1.95);

console.log("---------------DATA 1---------------------------");
console.log("Mark's BMI: ", BMIMark, "\nJhon's BMI: ", BMIJhon);
console.log("is mike's BMI Higher? : ", markHigherBMI());

// TEST DATA 2
BMIMark = clacBMI(95, 1.88);
BMIJhon = clacBMI(85, 1.76);

console.log("---------------DATA 2---------------------------");
console.log("Mark's BMI: ", BMIMark, "\nJhon's BMI: ", BMIJhon);
console.log("is mike's BMI Higher? : ", markHigherBMI());
