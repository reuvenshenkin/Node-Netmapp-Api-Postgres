const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const db = require('./queries');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(cors());

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/signalgps', db.getAllSignalsGPSEntries);
app.get('/signalgps/interval', db.getSignalsGPSEntriesByInterval);
app.post('/signalgps', db.addSignalGPSEntry);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});