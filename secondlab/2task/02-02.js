const http=require("http");
const fs=require("fs");

http.createServer((req,res)=>
{
    const fname="./horse.png";
    let jpg=null;
    fs.stat(fname,(err,stat)=>
    {
        if(err){console.log("Error...");}
        else
        {
            jpg=fs.readFileSync(fname);
            res.writeHead(200,{'Content-type':'image/jpeg','Content-Length':stat.size});
            res.end(jpg,"binary");
        }
    })
}).listen(5000)
console.log("Server running at http://localhost")