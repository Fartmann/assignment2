# The 2nd Assignment by Satyshev Adam

The objective of this assignment was to learn how to work with APIs to retrieve, process, and display data.
I created a website, where you can watch news or weather of the certain region (city). Also you can type certain currency to convert it to the other ones.

# Installation (Libraries, APIs and applications)

We are going to work in VS Code, so you have to install it :
https://code.visualstudio.com

To run this code, you have to install node.js. You can do this at this website :
https://nodejs.org/en/download
To check if installation of node.js was successful, you can use this command :
```javascript
node -v
npm -v
```

I used libraries such as express, axios and path. If they are not installed on your device, you can install them with npm :
```javascript
npm i express axios path
```

For the APIs, I used OpenWeatherMap, NewsAPI, CurrencyAPI. Here are the links :
CurrencyAPI : https://currencyapi.com
NewsAPI : https://newsapi.org
OpenWeatherMap : https://openweathermap.org

You may have to log in to these websites, to get your own API keys and manually replace them in server.js file in these lines :
```javascript
const OPENWEATHER_API_KEY = 'YOUR API KEY';
const NEWS_API_KEY = 'YOUR API KEY';
const CURRENCY_API_KEY = 'YOUR API KEY';
```

# Running the code

Before running the code, you have to create a new directory and initialize it with this command :
```javascript
npm init -y
```

After this, you have to write :
```javascript
node sever.js
```
...to run the code.

After typing the command above, you'll get the message "**Server running at http://localhost:${PORT}**", press Ctrl + LMB on it, to open it in web browser.
