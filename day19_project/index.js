const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const formatToggle = document.getElementById('formatToggle');


let is24HourFormat = true;


function updateClock() {
   
    const now = new Date();

  
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

   
    if (!is24HourFormat) {
      
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; 

        
        clockElement.textContent = `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)} ${ampm}`;
    } else {
        
        clockElement.textContent = `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`;
    }

    
    updateDate(now);
}


function formatTimeComponent(component) {
    return component < 10 ? `0${component}` : component;
}


function updateDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    dateElement.textContent = date.toLocaleDateString('en-US', options);
}


formatToggle.addEventListener('click', function () {
    is24HourFormat = !is24HourFormat;
    formatToggle.textContent = is24HourFormat ?
        'Switch to 12-hour format' : 'Switch to 24-hour format';

    
    updateClock();
});


updateClock();


setInterval(updateClock, 1000);