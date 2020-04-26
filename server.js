const path = require('path');
const express = require('express');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// an api endpoint
app.get('/api/helloworld', async (req, res) => {
    res.json("Hello, World!");
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Handle graceful shutdowns
var signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15
};

const shutdown = (signal, value) => {
    console.log("shutdown!");
    server.close(() => {
        console.log(`server stopped by ${signal} with value ${value}`);
        process.exit(128 + value);
    });
};

Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        console.log(`process received a ${signal} signal`);
        shutdown(signal, signals[signal]);
    });
});

const port = process.env.PORT || 5000;
const server = app.listen(port);
