const calcAvg = function (score) {
  const numTotal = score.reduce((acc, cur) => acc + cur, 0);

  const avg = Math.round(numTotal / score.length);

  return avg;
};

const winner = function (KoalasAvgScore, dolphinsAvgScore) {
  if (KoalasAvgScore > dolphinsAvgScore && KoalasAvgScore >= 100) {
    console.log(
      `Team Koalas Wons the Throphy! with ${KoalasAvgScore} pts 🔥🔥🔥`
    );
  } else if (dolphinsAvgScore > KoalasAvgScore && dolphinsAvgScore >= 100) {
    console.log(
      `Team Dolphins Wons the Throphy with ${dolphinsAvgScore} pts 🔥🔥🔥`
    );
  } else if (
    dolphinsAvgScore === KoalasAvgScore &&
    KoalasAvgScore >= 100 &&
    dolphinsAvgScore >= 100
  ) {
    console.log(
      `Both teams have scored the Same and above 100 pts, so The Match is  Draw.  Koalas : ${KoalasAvgScore} pts  , Dolphins: ${dolphinsAvgScore} pts`
    );
  } else {
    console.log(
      `NO Team wins the Throphy Koalas : ${KoalasAvgScore} pts  , Dolphins: ${dolphinsAvgScore} pts `
    );
  }
};

console.log("----------------Data 1------------------");
let koalas = calcAvg([96, 108, 89]);
let dolphins = calcAvg([88, 91, 110]);
winner(koalas, dolphins);

console.log("----------------Data 2------------------");
koalas = calcAvg([97, 112, 101]);
dolphins = calcAvg([109, 95, 123]);
winner(koalas, dolphins);

console.log("----------------Data 3------------------");
koalas = calcAvg([97, 112, 101]);
dolphins = calcAvg([109, 95, 106]);
winner(koalas, dolphins);
