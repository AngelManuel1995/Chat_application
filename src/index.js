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

io.on('connection', (socket) => {

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filer()
        if(filter.isProfane(message)){
            return callback('Error to deliveried message')
        }
        io.emit('message', message)
        callback()
    })

    socket.on('sendGeolocation', (position, callback) => {

        socket.broadcast.emit('messageLocation', `https://google.com/maps?q=${position.latitude},${position.longitude}`)
        callback()
 
    })

    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

server.listen(PORT,() => {
    console.log('Port is up and running on port:'.toUpperCase(), + PORT)
})