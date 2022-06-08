
// Function for generating random hex color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Selecting Start and Stop buttons
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

// Disabling stop button
stopButton.disabled = true;

// Function for start button listener,
// Changing background color every 1000ms,
// enabling stop button, and disabling start button
function changeColorAtInterval() {
  stopButton.disabled = false;
  startButton.disabled = true;
  eventTimer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Function for stop button listerner,
// stopping start button listener function,
// enabling start button, and disabling stop button
function stopChangeColorEvent() {
  clearInterval(eventTimer);
  startButton.disabled = false;
  stopButton.disabled = true;
}

// initalizing start & stop button listeners
startButton.addEventListener('click', changeColorAtInterval);
stopButton.addEventListener('click', stopChangeColorEvent);

// Just a nice touch ;)
document.body.style.transition = "background 100ms ease-in-out";