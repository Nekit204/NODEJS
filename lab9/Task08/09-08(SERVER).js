const http = require('http')
const fs = require('fs')
const FormData = require("form-data");

http.createServer((req, res) =>
{
    let bound = 'Ne_kit'
    let body = `--${bound}\r\n`
    body += 'Content-Disposition: form-data; name="file"; filename="test.txt"\r\n'
    body += 'Content-Type:text/plain\r\n\r\n'
    body += fs.readFileSync('./test.txt')
    body += `\r\n--${bound}--\r\n`
    res.writeHead(200, {'content-type':'multipart/form-data; boundary='+bound})
    res.end(body)
}).listen(3000)