const http = require('http')
const url = require('url')

let reqUrl = url.parse(url.format({
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    query: {
        x: 7,
        y: 8
    }
}))

const req = http.request(reqUrl, res => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(`statusMessage: ${res.statusMessage}`);
    res.on('data', d => {
        process.stdout.write(d);
    })
})

req.on('error', error => {
    console.error(error);
})

req.end();