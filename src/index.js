const express = require('express')
const PORT = process.env.PORT
const app = express()

app.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})