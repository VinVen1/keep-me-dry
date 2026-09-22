const express = require('express');
const path = require('path');
const axios = require('axios')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000;

const REQUESTS_LIMIT_PER_DAY = 900;
let currentLimitDay = new Date().getDate();
let requestsCounter = 0;

const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000;
const distPath = path.join(__dirname, '../client/dist/keep-me-dry/browser');
console.log('Servendo file statici da:', distPath);

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	res.removeHeader('ETag');
	res.removeHeader('Last-Modified');
	next();
});

if (!process.env.API_KEY) {
	console.error('Start failure: API Key is not present in the environment')
	return 0;
}

function checkLimitRate() {
	const today = new Date().getDate()
	if (currentLimitDay !== today) {
		requestsCounter = 0;
		currentLimitDay = today;
	}

	if (requestsCounter >= REQUESTS_LIMIT_PER_DAY) return false;

	requestsCounter++;
	return true;
}

app.use('/api', (req, res, next) => {
	if(checkLimitRate()) {
		console.log('Request n. ' + requestsCounter + '/' + REQUESTS_LIMIT_PER_DAY)
		next()
	} else {
		console.warn('Request limit exceeded!');
		return res.status(429).json({
			message: 'OpenWeatherApi daily request limit exceeded'
		})
	}
})

app.get('/api/weather', async (req, res) => {
	const { lat, lon } = req.query;
	const key = `weather_${lat}_${lon}`;
	console.log(`Richiesta API: lat=${lat}, lon=${lon}`);
	const cached = cache.get(key);
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) return res.json(cached.data);

	try {
		const response = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
			params: { ...req.query, appid: process.env.API_KEY }
		})

		const data = response.data;
		cache.set(key, { timestamp: Date.now(), data });
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ error: 'OpenWeatherMap API error', message: e.message });
	}
})

app.get('/api/geolocation/{*splat}', async (req, res) => {
	try {
		const dynamicPath = req.params.splat;
		const response = await axios.get(`https://api.openweathermap.org/geo/1.0/${dynamicPath}`, {
			params: { ...req.query, appid: process.env.API_KEY }
		})
		return res.status(200).json(response.data);
	} catch (e) {
		return res.status(500).json({ error: 'OpenWeatherMap API error', message: e.message });
	}
})
app.use(express.static(path.join(distPath)));


app.use((req, res) => {
	if (!req.path.startsWith('/api/') && !req.path.includes('.')) {
		res.sendFile(path.join(distPath, 'index.html'));
		return;
	}
	res.status(404).send('File non trovato');
});

app.listen(PORT, () => console.log('Server started on port ', PORT));
