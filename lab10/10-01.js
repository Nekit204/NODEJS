const httpserver=require('http').createServer((req,res)=>
{
    if(req.method==='GET' && req.url==='/start')
    {
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(require('fs').readFileSync('./10-01.html'));
    }
    else
    {
        res.statusMessage="Error";
        res.statusCode=400;
        res.end();
    }
});

httpserver.listen(3000);
console.log('ws server:3000');

let k=0;
let n=0;
const WebSocket=require('ws');
const wsserver=new WebSocket.Server({port:4000,host:'localhost',path:'/wsserver'});
wsserver.on('connection',(ws)=>
{
    ws.on('message',message=>
    {
        n=message.toString().split(":")[1];
        console.log(`Received message=>${message}`);
    })
    setInterval(()=>{ws.send(`10-01-server:${n}->${++k}`)},5000);
})
wsserver.on('error',(e)=>{console.log('ws server error',e)});
console.log(`ws server: host${wsserver.options.host},port:${wsserver.options.path}`);



