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

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

server.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})