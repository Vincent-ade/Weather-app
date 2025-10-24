async function checkWeather(city) {
    if (!city || city.trim() === '') {
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            alert('City not found');
            return;
        }

        const data = await response.json();
        
        // Update UI
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';
        
        // Check if weatherIcon exists before using it
        const weatherIcon = document.querySelector('.weather-icon');
        if (weatherIcon) {
            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
        }
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data');
    }
}