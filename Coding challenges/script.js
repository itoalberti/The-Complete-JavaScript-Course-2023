// This file was created for testing/drafting purposes

// fulfilled promise    = win the lottery
// failed promise       = lose the lottery

// promise takes only one input
// const lotteryPromise = new Promise(function (resolve, reject) {
//   // win/lose = 50%/50%
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win!');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });

// lotteryPromise.then((res) => console.log(res)).catch((err) => console.error(err));

// const wait = function (seconds) {
//   return new Promise((resolve) => {
//     console.log(`Wait function: ${seconds} seconds`);
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2).then(() => {
//   console.log('I waited for 2 seconds');
//   return wait(1);
// });

// Promise.resolve('abc').then((x) => console.log(x));
// Promise.reject('abc').catch((x) => console.lerror(x));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition().then((pos) => console.log(pos));
