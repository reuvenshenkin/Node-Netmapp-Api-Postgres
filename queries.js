const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'gisuser2',
    host: '212.179.205.15',
    database: 'gisuser2db',
    password: 'gisuser#2',
    port: 5432,
});


const getAllSignalsGPSEntries = (request, response) => {
    pool.query('SELECT * FROM signalgps', (error, results) => {
        if (error) {
            throw error
        }

        response.status(200).json(results.rows);
        console.log(results.json);
    })
}

const addSignalGPSEntry = (request, response) => {
    console.log(request.body);
    const { type, MNO, time, signal_strength, latitude, longitude, generation } = request.body;
    pool.query('INSERT INTO signalgps (type, "MNO", time, signal_strengh, "Latitude", "Longitude", generation) VALUES ($1, $2, $3, $4, $5, $6, $7)', [type, MNO, time, signal_strength, latitude, longitude, generation], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(`Signal GPS Entry added`);
    })
};



module.exports = {
    getAllSignalsGPSEntries,
    addSignalGPSEntry
};