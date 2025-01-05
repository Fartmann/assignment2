document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const weatherDisplay = document.getElementById('weatherDisplay');
    const newsDisplay = document.getElementById('newsDisplay');
    const currencyDisplay = document.getElementById('currencyRates');
    const mapContainer = document.getElementById('map');
    let map;

    // weather + news
    document.getElementById('getWeather').addEventListener('click', async () => {
        const city = cityInput.value || 'Astana';

        // weather fetch
        const weatherResponse = await fetch(`/weather?city=${city}`);
        const weatherData = await weatherResponse.json();

        weatherDisplay.innerHTML = `
            <div class="weather-card">
                <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="Weather Icon">
                <h2>${weatherData.name}</h2>
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Feels Like: ${weatherData.main.feels_like}°C</p>
                <p>Humidity: ${weatherData.main.humidity}%</p>
                <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            </div>`;

        // map update
        if (map) map.remove();
        mapContainer.innerHTML = '';
        map = L.map(mapContainer).setView([weatherData.coord.lat, weatherData.coord.lon], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        L.marker([weatherData.coord.lat, weatherData.coord.lon])
            .addTo(map)
            .bindPopup(`<b>${weatherData.name}</b>`)
            .openPopup();

        // news fetch
        const newsResponse = await fetch(`/news?city=${city}`);
        const newsData = await newsResponse.json();

        newsDisplay.innerHTML = newsData
            .slice(0, 5)
            .map(
                (article) => `
                    <div class="news-item">
                        <img src="${article.urlToImage || 'placeholder.jpg'}" alt="News Image">
                        <h3>${article.title}</h3>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read More</a>
                    </div>`
            )
            .join('');
    });

    // currency data
    document.getElementById('getCurrency').addEventListener('click', async () => {
        const baseCurrency = document.getElementById('baseCurrencyInput').value || 'USD';

        // currency fetch
        const currencyResponse = await fetch(`/currency?base=${baseCurrency}`);
        const currencyData = await currencyResponse.json();

        // show currency
        const rates = currencyData.rates || {};
        currencyDisplay.innerHTML = Object.keys(rates)
            .slice(0, 10)
            .map((currency) => `<div class="currency-rate">${currency}: ${rates[currency]}</div>`)
            .join('');
    });
});
