const express = require('express')
const bodyParser = require('body-parser')
const app = require('./dialog')
const config = require('./config.json')

const expressApp = express().use(bodyParser.json())
expressApp.use(function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'Authorization header not set' });
    }
    if (req.headers.authorization !== config.server.auth) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    next();
});
expressApp.post('/fulfillment', app)
expressApp.listen(3000)
