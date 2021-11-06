const http = require('http')

let post_data = JSON.stringify({
    __comment: "REQUEST: LAB_8",
    x: 1,
    y: 2,
    s: "message",
    m: ["a", "b", "c", "d"],
         o: {
        surname: "Ivanov",
        name: "Ivan"
    }
})

let post_options = {
    host: 'localhost',
    port: '3000',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': post_data.length
    }
};

let post_req = http.request(post_options, function(res) {
    res.setEncoding('utf8')

    console.log(res.statusCode)

    res.on('data', d => {
        process.stdout.write(d)
    })
});

post_req.write(post_data);
post_req.end();