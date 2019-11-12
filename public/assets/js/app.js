const socket = io()

socket.on('countUpdated', (count) => {
    console.log(count)
})

socket.on('messageGotten', (message) => {
    console.log(message)
    document.querySelector('#message').textContent = message
})

document.querySelector('#addCounterBtn').addEventListener('click', () => {
    socket.emit('increment', () => {
        console.log('Increment')
    })
})