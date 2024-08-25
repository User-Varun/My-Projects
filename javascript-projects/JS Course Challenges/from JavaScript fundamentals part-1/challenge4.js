const tipCalc = function (billValue) {
  const tip =
    billValue >= 50 && billValue <= 300 ? billValue * 0.15 : billValue * 0.2;

  return console.log(
    `The Bill was ${billValue}, The tip was ${tip}, and the total value ${
      billValue + tip
    }`
  );
};

tipCalc(275);
tipCalc(40);
tipCalc(430);
