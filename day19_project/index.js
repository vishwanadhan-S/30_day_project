const clockElement = document.getElementById('clock');
const dateElement = document.getElementById('date');
const formatToggle = document.getElementById('formatToggle');

// Initial format state (24-hour format)
let is24HourFormat = true;

// Function to update the clock
function updateClock() {
    // Create a new Date object
    const now = new Date();

    // Get time components
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format time based on selected format
    if (!is24HourFormat) {
        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight

        // Format time with AM/PM
        clockElement.textContent = `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)} ${ampm}`;
    } else {
        // 24-hour format
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

// Initialize the clock
updateClock();

// Update the clock every second using setInterval
setInterval(updateClock, 1000);