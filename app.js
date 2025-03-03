const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Fin By IP' })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})