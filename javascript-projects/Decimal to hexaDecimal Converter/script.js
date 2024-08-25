// Selectors
const input = document.querySelector(".form-input-decimal");
const submitBtn = document.querySelector(".btn");
const result = document.querySelector(".result");

// Focusing on input el
window.onload = () => input.focus();

// Representation of Hexadecimal number system
const hexaDecimalTable = [
  { key: 0, value: 0 },
  { key: 1, value: 1 },
  { key: 2, value: 2 },
  { key: 3, value: 3 },
  { key: 4, value: 4 },
  { key: 5, value: 5 },
  { key: 6, value: 6 },
  { key: 7, value: 7 },
  { key: 8, value: 8 },
  { key: 9, value: 9 },
  { key: 10, value: "A" },
  { key: 11, value: "B" },
  { key: 12, value: "C" },
  { key: 13, value: "D" },
  { key: 14, value: "E" },
  { key: 15, value: "F" },
];

// Global Variables
let hexaDecimalNum = [];

// Functions
function hasDecimal(number) {
  return !Number.isInteger(number);
}

const getNumbers = function (startingNumber) {
  let intArr = [];
  let fracArr = [];

  while (startingNumber !== 0) {
    let integerPart = Math.floor(startingNumber);
    intArr.push(integerPart);

    let fractionPart = startingNumber - integerPart;
    fracArr.push(fractionPart);

    const acc = hasDecimal(startingNumber)
      ? String(startingNumber)?.split(".")[0]
      : startingNumber;

    startingNumber = acc / 16;
  }

  // Removing the first element from intArr and fracArr
  intArr.shift();
  fracArr.shift();

  // Stating for if user interted 0

  return { intArr, fracArr };
};

// Event Handler
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const userInput = Number(input.value);

  let { intArr, fracArr } = getNumbers(userInput);

  // Adding Zero to array when user Inter Zero
  if (userInput === 0) fracArr.push(0);

  const reminder = fracArr.map((fraction) => fraction * 16).reverse();

  const a = reminder
    .map((num) => hexaDecimalTable.filter((key) => key.key === num))
    .flat();

  a.forEach((obj) => hexaDecimalNum.push(obj.value));

  console.log("Calculating...");
  console.log("Finished Calculating. See the result!");
  console.log(
    `The Decimal Number ${"\x1b[31m"}${userInput}\x1b[0m will be \x1b[34m${hexaDecimalNum.join(
      ""
    )}\x1b[0m in HexaDecimal`
  );

  result.textContent = "";
  result.textContent = hexaDecimalNum.join("");
  hexaDecimalNum = [];
});
