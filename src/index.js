const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT
const publicFolder = path.join(__dirname, '..', 'public')

app.use(express.static(publicFolder))
let count = 0

io.on('connection', (socket) => {

    socket.on('increment', () => {
        count = count + 1
        socket.emit('countUpdated', count)
    })

})

server.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})