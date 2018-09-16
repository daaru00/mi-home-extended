const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config.json')

const miHome = require('./mi-home')
miHome.load();
const googleHome = require('./google-home')

const expressApp = express().use(bodyParser.json())
expressApp.use(function (req, res, next) {
    if (!req.query.token) {
        return res.status(403).json({ error: 'token not set' });
    }
    if (req.query.token !== config.server.auth) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
});

/**
 * Temperature
 */
expressApp.get('/temperature', async (req, res) => {
    const temp = await miHome.getTemperature();
    if (temp !== null) {
        googleHome.sayTemperature(temp);
        res.status(200).send('');
    }else{
        res.status(500).send('');
    }
});

/**
 * Humidity
 */
expressApp.get('/humidity', async (req, res) => {
    const hum = await miHome.getHumidity();
    if (hum !== null) {
        googleHome.sayHumidity(hum);
        res.status(200).send('');
    }else{
        res.status(500).send('');
    }
});

expressApp.listen(3000)
