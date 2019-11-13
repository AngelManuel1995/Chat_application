const socket = io()

let messages = []
socket.on('enterChat', (messageEmmited) => {
    messages.push(messageEmmited)
    document.querySelector('#messages__my').innerHTML = ''
    messages.forEach((message, index) => {
        let messageP = document.createElement('P')
        let messageDiv = document.createElement('DIV')
        messageDiv.classList.add('msg_sent')
        messageDiv.classList.add('messages')
        messageDiv.append(messageP)
        messageP.textContent = `${index + 1}. ${message}`
        document.querySelector('#messages__my').append(messageDiv)
    })

})
