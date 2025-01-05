const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assign1')));

const OPENWEATHER_API_KEY = '4a199fd8d6dfe914804fc74ce39e3262';
const NEWS_API_KEY = 'e30057a2a2c442e0bbcb5ce02249481a';
const CURRENCY_API_KEY = 'cur_live_iFToMsDOF1qjEclZX4FOf03nRYt1yIfrzw6g5YlD';

// /weather
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'Astana';
    try {
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data.');
    }
});

// /news
app.get('/news', async (req, res) => {
    const city = req.query.city || 'Astana';
    try {
        const newsResponse = await axios.get(
            `https://newsapi.org/v2/everything?q=${city}&apiKey=${NEWS_API_KEY}`
        );
        res.json(newsResponse.data.articles);
    } catch (error) {
        res.status(500).send('Error fetching news data.');
    }
});

// /currency
app.get('/currency', async (req, res) => {
    const baseCurrency = req.query.base || 'KZT';
    try {
        const currencyResponse = await axios.get(
            `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${CURRENCY_API_KEY}`
        );
        res.json(currencyResponse.data);
    } catch (error) {
        res.status(500).send('Error fetching currency data.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
