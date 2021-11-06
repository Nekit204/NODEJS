let http = require('http')
let options = {
    host: 'localhost',
    path: '/',
    port: 3000,
    method: 'GET'
}
const req = http.request(options, (res) => {
    console.log("response code: ", res.statusCode)
    let data =''
    res.on('data', (chunk) => {data += chunk})
    res.on('end', () => {console.log('body: '+data)})
})
req.end();