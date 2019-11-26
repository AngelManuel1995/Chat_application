const socket = io()

let messages = []
socket.on('message', (message) => {
    console.log('message from server', message)
    // messages.push(message)
    // document.querySelector('#messages__my').innerHTML = ''
    // messages.forEach((message) => {
    //     let messageP = document.createElement('P')
    //     let messageDiv = document.createElement('DIV')
    //     let userNameSPAN = document.createElement('SPAN')
    //     let messageSPAN = document.createElement('SPAN')
    //     userNameSPAN.classList.add('userName')
    //     messageDiv.classList.add('msg_sent')
    //     messageDiv.classList.add('messages')
    //     userNameSPAN.textContent = `${message.split(':')[0]}:`
    //     messageSPAN.textContent = `${message.split(':')[1]}`
    //     messageP.append(userNameSPAN)
    //     messageP.append(messageSPAN)
    //     messageDiv.append(messageP)
    //     document.querySelector('#messages__my').append(messageDiv)
    // })

})

document.querySelector('#btnSendLocation').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Your browser does not support Geolacation')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendGeolocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Position shered successfuly')
        })
    })
})

// document.querySelector('#testForm').addEventListener('submit', (e) => {
//     e.preventDefault()
//     if(document.querySelector('#userName').value === ''){
//         document.querySelector('#messages__my').innerHTML = ''
//         let messageP = document.createElement('P')
//         let messageDiv = document.createElement('DIV')
//         messageDiv.classList.add('msg_sent')
//         messageDiv.classList.add('messages')
//         messageDiv.append(messageP)
//         messageP.textContent = 'Admin says: Please provide a user name'
//         messageP.classList.add('userName')
//         document.querySelector('#messages__my').append(messageDiv)
//         return
//     }
//     if(e.target.elements.message.value === ''){
//         document.querySelector('#messages__my').innerHTML = ''
//         let messageP = document.createElement('P')
//         let messageDiv = document.createElement('DIV')
//         messageDiv.classList.add('msg_sent')
//         messageDiv.classList.add('messages')
//         messageDiv.append(messageP)
//         messageP.textContent = 'Admin says: Please provide a message'
//         messageP.classList.add('userName')
//         document.querySelector('#messages__my').append(messageDiv)
//         return
//     }
//     const message = e.target.elements.message.value
//     socket.emit('sendMessage', `${document.querySelector('#userName').value} says: ${message}`)
//     e.target.elements.message.value = ''
// })

document.querySelector('#testForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {
        if(error){
            console.log('The message could not be delivered')
        }
        console.log('Message delivered')
    })
})