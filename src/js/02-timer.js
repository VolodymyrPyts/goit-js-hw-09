import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require("flatpickr/dist/themes/material_blue.css");

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

const refs = {
  timePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
  
};

refs.startBtn.setAttribute('disabled', true)
refs.startBtn.addEventListener('click', onStartClick);

const libraryFlatpickr = flatpickr(refs.timePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'rigth-top',
        closeButton: true,
      });
    }
  },
});

function onStartClick() {
  refs.startBtn.setAttribute('disabled', true);
  refs.timePicker.setAttribute('disabled', true);

  const timer = setInterval(() => {
    const deltaDate = libraryFlatpickr.selectedDates[0].getTime() - Date.now();

    if (deltaDate > 0) {
      renderTimer(convertMs(deltaDate));
      refs.secondsField.classList.add('zero');
    }
    else {
      clearInterval(timer);
      refs.timePicker.removeAttribute('disabled');
      refs.secondsField.classList.remove('zero');
      Notify.info("Time's up!", { position: 'rigth-top' });
    }
  }, 1000);
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = addLeadingZero(days);
  refs.hoursField.textContent = addLeadingZero(hours);
  refs.minutesField.textContent = addLeadingZero(minutes);
  refs.secondsField.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}
