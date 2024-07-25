const search = document.querySelector('.search-box button');
const error404 = document.querySelector('.not-foound')

search.addEventListener('click', () => {
    const APIKey = '94d413218ccefd36c40996fe4257ce4f'; // Replace with your own API key
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(json => {
            const weatherBox = document.querySelector('.weather-box');
            const weatherDetails = document.querySelector('.weather-details');
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
                    break;
            }

            // Update the weather details
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;

            // Show the weather box and details
            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
        })
        .catch(error => {
            console.error(error);
            alert('Failed to retrieve weather data. Please check the city name.');
        });
});
