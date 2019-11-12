const express = require('express')
const path = require('path')
const PORT = process.env.PORT

const publicFolder = path.join(__dirname, '..', 'public')

const app = express()
app.use(express.static(publicFolder))

app.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})