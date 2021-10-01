var http=require("http");
var fs=require("fs");
var url=require("url");

let fact=(x)=>
{
    let ans=1;
    while(x!=0)
    {
        ans=ans*x;
        x--;
    }
return ans;
}

http.createServer((req,res)=>
{
    let rc=JSON.stringify({k:0});
    if(url.parse(req.url).pathname==='/fact')
    {
        console.log(req.url);
        if(typeof url.parse(req.url,true).query.k!='undefined')
        {
            let k=parseInt(url.parse(req.url,true).query.k);
            if(Number.isInteger(k))
            {
                res.writeHead(200,{'Content-type':'application/json;charset=utf-8'})
                console.log(fact(k));
                res.end(JSON.stringify({k:k,fact:fact(k)}))
            }
        }
    }
    else if (url.parse(req.url).pathname==='/')
    {
        let html=fs.readFileSync('./03-02.html');
        res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
        res.end(html);
    }
    else
    {
        res.end(rc);
    }
}).listen(5000)

console.log("Server running at http://localhost:5000/");