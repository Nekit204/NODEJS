const http = require('http')
const querystring = require('querystring')

let post_data = querystring.stringify({
    x: 1,
    y: 2,
    s: 3
})

let post_options = {
    host: 'localhost',
    port: '3000',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};

let post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8')

    console.log("Status code:"+res.statusCode);
    console.log("Status message:"+res.statusMessage);

    res.on('data', d => {
        process.stdout.write(d)
    })
});

post_req.write(post_data);
post_req.end();