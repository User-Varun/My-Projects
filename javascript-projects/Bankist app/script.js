'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  locale: 'pt-PT',
  currency: '€',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  locale: 'en-US',
  currency: '$',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  locale: 'en-US',
  currency: '$',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  locale: 'en-US',
  currency: '$',
};
const account5 = {
  owner: 'Varun Pawar',
  movements: [430, 1000, 700, 50, 90, -500, 10000, , -1000],
  interestRate: 5,
  pin: 8120,
  locale: 'en-IN',
  currency: '₹',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

// Functions
const createUserNames = function (accounts) {
  accounts.forEach(account => {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const calcAccBalance = function (accounts) {
  accounts.forEach(account => {
    account.balance = account.movements
      .filter(mov => mov > 0)
      .reduce((acc, cur) => acc + cur, 0);
  });
};
calcAccBalance(accounts);

const calcSumOut = function (accounts) {
  accounts.forEach(account => {
    account.sumOut = account.movements
      .filter(movement => {
        return movement < 0;
      })
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);
  });
};
calcSumOut(accounts);

const calcInterest = function (accounts) {
  accounts.forEach(account => {
    const totalBalance = account.movements
      .filter(movement => movement >= 0)
      .reduce((acc, cur) => {
        return acc + cur;
      }, 0);

    const interestRate = account.interestRate / 100;
    const interest = totalBalance * interestRate;

    account.interest = interest;
  });
};
calcInterest(accounts);

const renderMovements = function (account) {
  account.movements.map(movement => {
    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${
            movement >= 0 ? 'deposit' : 'withdrawal'
          }">${movement >= 0 ? 'deposit' : 'withdrawal'}</div>
    <div class="movements__date">${
      Math.round(Math.random() * 10) + 1
    } days ago </div>

          <div class="movements__value">${movement}${account.currency}</div>
   </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const getDate = function (format) {
  const now = new Date();
  return Intl.DateTimeFormat(format).format(now);
};

const timer = function () {
  // Initialize total time in seconds (5 minutes)
  let totalTime = 10 * 60;

  // Function to update the display
  function updateDisplay() {
    // Calculate minutes and seconds
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    // Format the time as MM:SS
    let formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    // Display the formatted time
    labelTimer.innerText = `${formattedMinutes}:${formattedSeconds}`;

    // Decrement the total time
    totalTime--;

    // Stop the timer when it reaches zero
    if (totalTime < 0) {
      clearInterval(timerInterval);
      containerApp.style.opacity = 0;
    }
  }

  // Update the display initially to avoid 1-second delay
  updateDisplay();

  // Set interval to update the timer every second (1000 milliseconds)
  const timerInterval = setInterval(updateDisplay, 1000);
};

// EventListeners
let currentUser;
let sorted = false;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  const userName = inputLoginUsername.value.toLowerCase();
  const userPin = Number(inputLoginPin.value);
  currentUser = accounts.find(account => account.userName === userName);

  if (currentUser && userPin === currentUser.pin) {
    console.log(`user found: `, currentUser);
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome, ${currentUser.owner.split(' ')[0]}!`;
    labelDate.textContent = getDate(currentUser.locale);
    labelBalance.textContent = `${currentUser.balance}${currentUser.currency}`;

    labelSumIn.textContent = `${currentUser.balance}${currentUser.currency}`;
    labelSumOut.textContent = `${currentUser.sumOut}${currentUser.currency}`;
    labelSumInterest.textContent = `${currentUser.interest}${currentUser.currency}`;

    containerMovements.innerHTML = '';

    // Starting the timer
    timer();

    // Rendering the movements
    renderMovements(currentUser);
  } else if (!currentUser) {
    console.log('Invalid Credentials');
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const recieverAccount = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  const transferAmount = Number(inputTransferAmount.value);

  // check if user exist , have enough balance , not sending to themselves
  if (
    recieverAccount &&
    transferAmount > 0 &&
    currentUser.userName !== recieverAccount.userName
  ) {
    console.log('transfer valid!');

    // Update the currentAccount
    currentUser.movements.push(-transferAmount);

    // Update the reciever
    recieverAccount.movements.push(transferAmount);

    // CurrentUser : Calculate and display the balance
    currentUser.balance = currentUser.balance - transferAmount;
    currentUser.sumOut = currentUser.movements
      .filter(mov => mov < 0)
      .reduce((acc, cur) => acc + cur, 0);

    labelBalance.textContent = currentUser.balance;
    labelSumOut.textContent = currentUser.sumOut;
    labelSumIn.textContent = currentUser.balance;

    // Reciever : update the reciever
    recieverAccount.balance = recieverAccount.balance + transferAmount;
    recieverAccount.sumOut = recieverAccount.movements
      .filter(mov => mov < 0)
      .reduce((acc, cur) => acc + cur, 0);

    renderMovements(currentUser);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('checking for availability...');

  // check if user has 10% money of the loan he is asking
  const tenPercent = Number(inputLoanAmount.value) * 0.1;

  setTimeout(() => {
    if (currentUser.balance > tenPercent && Number(inputLoanAmount.value) > 0) {
      console.log('loan approved! 🎉');
      currentUser.movements.push(Number(inputLoanAmount.value));
      renderMovements(currentUser);
      currentUser.balance = currentUser.balance + Number(inputLoanAmount.value);
      labelBalance.textContent =
        currentUser.balance + Number(inputLoanAmount.value);
      labelSumIn.textContent =
        currentUser.balance + Number(inputLoanAmount.value);
    } else {
      console.log('loan did not approved! 😐');
    }
  }, 5000);
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  const userName = inputCloseUsername.value;
  const userPin = Number(inputClosePin.value);

  // Check credentials

  if (userName === currentUser.userName && userPin === currentUser.pin) {
    const index = accounts.findIndex(account => {
      return userName === account.userName;
    });

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    console.log('account deleted!');
  }
});

btnSort.addEventListener('click', function () {
  // Deep copy using JSON methods
  const deepCopy = JSON.parse(JSON.stringify(currentUser));

  if (!sorted) {
    deepCopy.movements.sort((a, b) => a - b);
    containerMovements.innerHTML = '';
    renderMovements(deepCopy);
    sorted = !sorted;
  } else if (sorted) {
    containerMovements.innerHTML = '';
    renderMovements(currentUser);
    sorted = !sorted;
  }
});

// legacy code
// const makeShortName = function (name) {
//   return name
//     .split(' ')
//     .map(word => word[0])
//     .join('')
//     .toLowerCase();
// };
// const totalAccMoney = function (arr) {
//   return arr.reduce((acc, cur) => {
//     return acc + cur;
//   }, 0);
// };
// const userExist = function (name) {
//   const userNickNames = accounts
//     .map(account => makeShortName(account.owner))
//     .find(nickName => nickName === name);

//   if (userNickNames === undefined) return true;
//   else {
//     return false;
//   }
// };

// btnSort.addEventListener('click', function () {
//   let sorted = false;

//   const currentArr = [...user.movements];
//   if (!sorted) {
//     currentArr.sort((a, b) => b - a);
//     containerMovements.innerHTML = '';
//     renderMovements(currentArr);
//     sorted = !sorted;
//   } else if (sorted) {
//     containerMovements.innerHTML = '';
//     renderMovements(user.movements);
//     sorted = !sorted;
//   }
// });
// const getUserByNickName = function (nikeName) {
//   const [user] = accounts.filter(
//     account => makeShortName(account.owner) === nikeName
//   );
//   return user;
// };
// const renderMovement = function (movement) {
//   const html = `
//     <div class="movements__row">
//           <div class="movements__type movements__type--${
//             movement >= 0 ? 'deposit' : 'withdrawal'
//           }">${movement >= 0 ? 'deposit' : 'withdrawal'}</div>
//           <div class="movements__date">3 days ago</div>
//           <div class="movements__value">${movement}</div>
//    </div>`;

//   containerMovements.insertAdjacentHTML('afterbegin', html);
// };
// const getDate = function () {
//   const now = new Date();
//   const date = `${now.getDate()}`.padStart(2, 0);
//   const month = `${now.getMonth() + 1}`.padStart(2, 0);

//   const year = now.getFullYear();

//   return `${date}/${month}/${year}`;
// };
