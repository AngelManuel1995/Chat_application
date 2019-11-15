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
    if(document.querySelector('#userName').value === ''){
        document.querySelector('#messages__my').innerHTML = ''
        let messageP = document.createElement('P')
        let messageDiv = document.createElement('DIV')
        messageDiv.classList.add('msg_sent')
        messageDiv.classList.add('messages')
        messageDiv.append(messageP)
        messageP.textContent = 'Admin says: Please provide a user name'
        document.querySelector('#messages__my').append(messageDiv)
        return
    }
    if(e.target.elements.message.value === ''){
        document.querySelector('#messages__my').innerHTML = ''
        let messageP = document.createElement('P')
        let messageDiv = document.createElement('DIV')
        messageDiv.classList.add('msg_sent')
        messageDiv.classList.add('messages')
        messageDiv.append(messageP)
        messageP.textContent = 'Admin says: Please provide a message'
        document.querySelector('#messages__my').append(messageDiv)
        return
    }
    const message = e.target.elements.message.value
    socket.emit('sendMessage', `${document.querySelector('#userName').value} says: ${message}`)
    e.target.elements.message.value = ''

})


