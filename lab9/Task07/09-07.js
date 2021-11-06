const FormData = require('form-data');
const http = require('http');
const fs = require('fs');

const readStream = fs.createReadStream('./peace.png');

const form = new FormData();
form.append('file', readStream);

const req = http.request(
    {
        host: 'localhost',
        port: '3000',
        method: 'POST',
        headers: form.getHeaders(),
    },
    res => {
        console.log(res.statusCode);

        res.on('data', d => {
            process.stdout.write(d)
        })
    }
);

form.pipe(req);