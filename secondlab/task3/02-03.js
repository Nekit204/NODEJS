const http=require("http");
const fs=require("fs");
const file = require("fs");

http.createServer((req,res)=>
{
    if(req.url=="/api/name") {
        let text = fs.readFileSync("./name.txt");
        res.writeHead(200, {"Content-type": "text/plain"});
        res.end(text);
    }
    if(req.url=="/xmlhttprequest") {
        let html = file.readFileSync('./xmlhttprequest.html');
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        res.end(html);
    }
    if(req.url=="/fetch") {
        let html = file.readFileSync('./fetch.html');
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        res.end(html);
    }
    if(req.url=="/jquery") {
        let html = file.readFileSync('./jquery.html');
        res.writeHead(200, {'Content-type': 'text/html;charset=utf-8'});
        res.end(html);
    }
}).listen(5000);

console.log("Server running at http://localhost:5000/api/name")