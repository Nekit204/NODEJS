const http=require("http");
const file=require("fs");
http.createServer((req,res)=>
{
let html=file.readFileSync('./index.html');
res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
res.end(html);
}).listen(3000);
console.log("Server running at http://localhost")