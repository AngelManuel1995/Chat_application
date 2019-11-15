const socket = io()

let messages = []
socket.on('message', (message) => {
    messages.push(message)
    document.querySelector('#messages__my').innerHTML = ''
    messages.forEach((message) => {
        let messageP = document.createElement('P')
        let messageDiv = document.createElement('DIV')
        messageDiv.classList.add('msg_sent')
        messageDiv.classList.add('messages')
        messageDiv.append(messageP)
        messageP.textContent = `${message}`
        document.querySelector('#messages__my').append(messageDiv)
    })

})

document.querySelector('#testForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', `${document.querySelector('#userName').value} says: ${message}`)
    e.target.elements.message.value = ''

})


