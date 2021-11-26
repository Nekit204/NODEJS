const ws = require('ws')
const fs = require('fs')

const webSocket = new ws('ws://localhost:4000/')

webSocket.on('open', () =>
{
    let duplex = ws.createWebSocketStream(webSocket, {encoding: 'utf-8'})
    let file = fs.createWriteStream(`upload/${Math.random()}.txt`)

    duplex.pipe(file)
})
