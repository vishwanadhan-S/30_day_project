
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const messageEl = document.getElementById('message');


const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
dateInput.min = formattedDate;


const oneHourLater = new Date(today.getTime() + 60 * 60 * 1000);
const formattedTime = oneHourLater.toTimeString().slice(0, 5);
timeInput.value = formattedTime;


let countdownInterval;
let targetDate;


startBtn.addEventListener('click', startCountdown);


resetBtn.addEventListener('click', resetCountdown);

function startCountdown() {
   
    clearInterval(countdownInterval);

        
    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    if (!selectedDate || !selectedTime) {
        alert('Please select both date and time');
        return;
    }

    
    targetDate = new Date(`${selectedDate}T${selectedTime}`);


    if (targetDate <= new Date()) {
        alert('Please select a future date and time');
        return;
    }


    messageEl.style.display = 'none';

   
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

   
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        displayCountdownComplete();
        return;
    }

   
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

   
    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
}

function displayCountdownComplete() {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';

    messageEl.textContent = 'Countdown Complete!';
    messageEl.classList.remove('expired');
    messageEl.style.display = 'block';
}

function resetCountdown() {
    clearInterval(countdownInterval);


    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';

    
    messageEl.style.display = 'none';

   
    dateInput.value = formattedDate;
    timeInput.value = formattedTime;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}
