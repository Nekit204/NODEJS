const http = require('http')
const { postHandler } = require('./postHandler')

const { getHandler } = require('./getHandler')

let server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            getHandler(req, res, server)
            break
        case 'POST':
            postHandler(req, res)
            break
        default:
            res.end('ERROR')
    }
}).listen(3000)