// Script.js

function useCurrentLocation() {
    const userResponse = confirm("Do you allow us to access your location for weather details?");
    
    if (userResponse) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeatherByCoordinates, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

function fetchWeatherByCoordinates(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            alert('Error fetching weather data.');
        });
}

function showManualEntry() {
    // Hide the Use Current Location and Manual Enter Option buttons
    document.getElementById('manualEntryButton').style.display = 'none';
    
    // Show the manual entry section
    document.getElementById('manualEntry').style.display = 'block';
}

function searchByCity() {
    const city = document.getElementById('cityInput').value;

    if (city.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fd2de79e67c986eec7dcb8ba7fd1218e`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            alert('Error fetching weather data.');
        });
}

function displayWeatherData(data) {
    const weatherInfo = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    document.getElementById('weatherData').innerHTML = weatherInfo;
    document.getElementById('weatherData').style.display = 'block';
}
