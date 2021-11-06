const http = require('http')
const url = require('url')
const querystring = require('querystring')

http.createServer((req, res) =>
{
    let data = ''
    req.on('data', chunk =>
    {
        data += chunk
    })
    req.on('end', () =>
    {
        let queryObject = querystring.parse(data)

        let x = Number(queryObject.x)
        let y = Number(queryObject.y)
        let s = Number(queryObject.s)

        res.end(`x:${x}\ny:${y}\ns:${s}`)
    })

}).listen(3000)