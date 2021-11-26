const ws = require('ws')

const socket = new ws('ws://localhost:4000/')
const clientName = process.argv[2]


socket.on('open', () =>
{
    console.log('open')

    setInterval(() =>
    {
        socket.send(JSON.stringify({
            client: clientName,
            timestamp: new Date().toISOString()
        }))
    }, 2000).unref()
    
})

socket.on('message', message =>
{
    console.log(JSON.parse(message.toString()))
})

socket.on('close', () =>
{
    console.log('close')
})