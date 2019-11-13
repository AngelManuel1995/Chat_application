const socket = io()

let messages = []
socket.on('enterChat', (messageEmmited) => {
    messages.push(messageEmmited)
    document.querySelector('#messages').innerHTML = ''
    messages.forEach((message, index) => {
        let messageP = document.createElement('P')
        messageP.textContent = `${index + 1}. ${message}`
        document.querySelector('#messages').append(messageP)
    })

})
