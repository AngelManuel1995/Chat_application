const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const publicFolder = path.join(__dirname, '..', 'public')

app.use(express.static(publicFolder))
io.on('connection', (socket) => {

    setInterval(() => {
        socket.emit('enterChat', 'Welcome to this ARUS chat')
    },2000)
})

server.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})