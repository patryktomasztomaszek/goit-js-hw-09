// Initializing flatpickr library and css ruleset - datetime picker
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Initializing Notiflix library - Notify, Report and Block
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

// Variables initiation
const startBtn = document.querySelector('[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');
let datetimePicker = document.querySelector('#datetime-picker'); //did this to be able to disable input
let selectedDateTime = 0;
let timer = null;

// Disabling start button as default
startBtn.disabled = true;

// Function for time data conversion to object
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Flatpickr options
const options = {
  position: 'auto center',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Preventing improper countdown behavior
  onOpen() {
    startBtn.disabled = true;
  },
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startBtn.disabled = false;
      selectedDateTime = selectedDates[0] - 0; //Subtracting 0 converts data to unix format
      Notify.info('Date & time set, ready for countdown');
    } else {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    }
  },
};

const notiflixOptions = {};

// Fix for displaying remaining time as two-digit number
function addLeadingZero(value) {
  const string = String(value);
  return string.padStart(2, '0');
}

// Function for countdown display handling - Start button event handler,
// Starting countdown and updating time at 1000ms interval
function countdown(evt) {
  // Preventing improper countdown behavior, callback duplication,
  // and checking if date & time is still valid
  startBtn.disabled = true;
  if (selectedDateTime < Date.now()) {
    Report.failure(
      'Countdown start impossible!',
      'Set date & time older than present date & time. You need to be faster!',
      'Okie dokie...'
    );

    return;
  }
  datetimePicker.disabled = true;
  Block.hourglass('[block]', 'Countdown in progress...');

  timer = setInterval(() => {
    let timeLeft = selectedDateTime - Date.now();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysOutput.innerHTML =
      String(days).length < 2 ? addLeadingZero(days) : days;
    hoursOutput.innerHTML =
      String(hours).length < 2 ? addLeadingZero(hours) : hours;
    minutesOutput.innerHTML =
      String(minutes).length < 2 ? addLeadingZero(minutes) : minutes;
    secondsOutput.innerHTML =
      String(seconds).length < 2 ? addLeadingZero(seconds) : seconds;

    if (timeLeft < 1000) {
      clearInterval(timer);
      Notify.success('Countdown exectuted successfully');
      Block.remove('[block]');
      datetimePicker.disabled = false;
    }
  }, 1000);
}

//Initializing datetime picker
datetimePicker = flatpickr('#datetime-picker', options);

// Initializing listener for start button
startBtn.addEventListener('click', countdown);
