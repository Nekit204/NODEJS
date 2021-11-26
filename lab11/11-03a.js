const ws = require('ws')

const socket = new ws('ws://localhost:4000/')

socket.on('open', () =>
{
    console.log('open')
})

socket.on('message', (message) =>
{
    console.log(message.toString())
})

socket.on('open', () =>
{
    console.log('close')
})