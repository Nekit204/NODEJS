const fs = require('fs')
const ws = require('ws')

const server = new ws.Server({ port:4000 })

server.on('connection', (client)=>{

    const duplex = ws.createWebSocketStream(client,{encoding:'utf-8'})
    let file = fs.createWriteStream(`./upload/${Math.random()}.txt`)

    duplex.pipe(file)
})