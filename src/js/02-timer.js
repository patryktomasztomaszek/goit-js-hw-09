// Initializing flatpickr library and css ruleset 
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

// Flatpickr options 
const options = {
    enableTime: true,
    time_24hr: true,
    minDate: "today",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  };

// Selecting input for datetime picker
flatpickr("#datetime-picker", options);