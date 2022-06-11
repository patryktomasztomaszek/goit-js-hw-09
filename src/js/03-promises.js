// Initializing Notiflix - Notify and Report modules
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

// Selecting input form
const form = document.querySelector('.form');

// Initializing timer for promises generation delay
let timer = 0;

// Letting user know, that all input values must be greater than 0
Notify.info('Please input values greater than 0. Thank You!');

// Function for generating promises
function createPromise(i, timer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ i, timer });
      } else {
        reject({ i, timer });
      }
    }, timer);
  });
}

// Function for handling form input data and using callback for generating promises
const promisesHandler = event => {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget.elements;

  const firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountOfPromises = Number(amount.value);

  // Checking for valid input - values greater than 0
  if (firstDelay <= 0 || stepDelay <= 0 || amountOfPromises <= 0) {
    delay.value = null;
    step.value = null;
    amount.value = null;

    return Report.failure(
      'Oops! I did it again... Or not?',
      'All values must be greater than zero!',
      'If you say so...'
    );
  }

  timer = firstDelay;
  for (let i = 1; i <= amountOfPromises; i++) {
    createPromise(i, timer)
      .then(({ i, timer }) => {
        Notify.success(`Fulfilled promise ${i} in ${timer}ms`);
      })
      .catch(({ i, timer }) => {
        Notify.failure(`Rejected promise ${i} in ${timer}ms`);
      });
    timer += stepDelay;
  }
};

form.addEventListener('submit', promisesHandler);
