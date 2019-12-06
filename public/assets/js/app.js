const socket = io()

let messages = []

const $messageForm = document.querySelector('#testForm')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = document.querySelector('#btnFormMessage')
const $geolocationButtton = document.querySelector('#btnSendLocation')
const $messages = document.querySelector('#messages')

//Templates

const messageTemplate = document.querySelector('#message-template').innerHTML
const messageTemplateLocation = document.querySelector('#message-template-location').innerHTML

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message
    })

    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('messageLocation', (link) => {
    console.log(link)
    const html = Mustache.render(messageTemplateLocation, {
        link
    })

    $messages.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#btnSendLocation').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Your browser does not support Geolacation')
    }
    $geolocationButtton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendGeolocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $geolocationButtton.removeAttribute('disabled')
            console.log('Location shered successfully')
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

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value

    $messageFormButton.setAttribute('disabled', 'disabled')

    
    socket.emit('sendMessage', message, (error) => {
        //$messageFormButton.removeAttribute('disabled')
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if(error){
            console.log('The message could not be delivered')
        }
        console.log('Message delivered', message)
    })
})