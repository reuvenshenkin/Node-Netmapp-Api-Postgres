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
        response.status(200).json(results.rows)
    })
}

const addSignalGPSEntry = (request, response) => {
    const { Phone_type, MNO, date, signal_strengh_dbm, Latitude, Longitude } = request.body;
    pool.query('insert into signalgps values ($1, $2, $3, $4, $5, $6)', [Phone_type, MNO, date, signal_strengh_dbm, Latitude, Longitude], (error, results) => {
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