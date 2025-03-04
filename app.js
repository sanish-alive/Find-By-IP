const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('ip2location.sqlite', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database: '. err.message)
    } else {
        console.log('Connected to SQLite database.')
    }
})

app.use(express.json())

const PORT = 3000

function ipToInt (ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
}

app.get('/', (req, res) => {
    ipAddress = req.ip
    ipInt = ipToInt(ipAddress)

    db.get(
        'SELECT * FROM data WHERE start <= ? AND end >= ? LIMIT 1',
        [ipInt, ipInt],
        (err, row) => {
        if (err) {
            console.error('Error executing query: ', err.message)
            res.status(500).json({ error: 'Internal Server Error'})
        } else if (row) {
            res.status(200).json({ IP_Address: ipAddress, Country: row.country})
        } else {
            res.status(404).json({ message: 'No data found for the given IP' })
        }
    })
})

app.get('/find-country', (req, res) => {
    ipAddress = req.query.ip
    ipInt = ipToInt(ipAddress)

    db.get(
        'SELECT * FROM data WHERE start <= ? AND end >= ? LIMIT 1',
        [ipInt, ipInt],
        (err, row) => {
        if (err) {
            console.error('Error executing query: ', err.message)
            res.status(500).json({ error: 'Internal Server Error'})
        } else if (row) {
            res.status(200).json({ IP_Address: ipAddress, Country: row.country})
        } else {
            res.status(404).json({ message: 'No data found for the given IP' })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})