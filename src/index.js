const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filer = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000
const publicFolder = path.join(__dirname, '..', 'public')

app.use(express.static(publicFolder))

const messageio =  'message'
io.on('connection', (socket) => {

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filer()
        if(filter.isProfane(message)){
            return callback('Error to deliveried message')
        }
        io.emit(messageio, message)
    })

    socket.on('sendGeolocation', (position, callback) => {
        socket.broadcast.emit(messageio, position)
        callback()
    })

    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('disconnect', () => {
        io.emit(messageio, 'A user has left!')
    })

})

server.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})