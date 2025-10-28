const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '44f7dfb0e544cf8cd840b3e4f7290849';
    const city = document.querySelector('.search-box input').value.trim();

    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(res => res.json())
        .then(data => {
            if (data.cod == 404) {
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                container.style.height = '400px';
                return;
            }

            error404.classList.remove('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            container.style.height = '555px';

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Corrected image names
            switch (data.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.jpg';
                    break;
                case 'Snow':
                    image.src = 'snow.jpg';
                    break;
                case 'Clouds':
                    image.src = 'colud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }


            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            description.textContent = data.weather[0].description;
            humidity.textContent = `${data.main.humidity}%`;
            wind.textContent = `${parseInt(data.wind.speed)} Km/h`;
        })
        .catch(err => {
            console.error(err);
            alert('Something went wrong. Please try again!');
        });
});

// Optional: Press Enter to search
document.querySelector('.search-box input').addEventListener('keyup', (e) => {
    if (e.key === 'Enter') search.click();
});
