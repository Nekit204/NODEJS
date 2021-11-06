const http = require('http')
const url = require('url')
const querystring = require('querystring')

http.createServer((req, res) =>
{
    let urlObject = url.parse(req.url)
    let queryObject = querystring.parse(urlObject.query)
    console.log(queryObject)

    let x = Number(queryObject.x)
    let y = Number(queryObject.y)

    res.statusCode=200;
    res.statusMessage="All good";
    res.end(`x:${x}\ny:${y}`)
}).listen(3000)