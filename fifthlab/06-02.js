let http=require('http');
let fs=require('fs');
const { parse } = require('querystring');
const { send }=require('./m0603');
const sendmail = require("sendmail");
http.createServer((req,res)=>{

    if(require('url').parse(req.url).pathname==="/"&&req.method==="GET")
    {
       res.end(fs.readFileSync("./page.html"));
    }
    else if(req.method==="POST")
    {
       let body='';
       req.on('data',chunk => {body+=chunk.toString()})
       req.on('end',()=>{
           let info=parse(body);
           sendmail({
               from: info.from,
               to: info.to,
               subject: 'Lab6',
               html: info.message
           }, function (err, reply){
               console.log(err && err.stack);
               console.dir(reply);
           });
           res.end("from:"+info.from+";" +
               "to:"+info.to+";" +
               "message:"+info.message+".")
       });

    }
    else if(require('url').parse(req.url).pathname==="/send")
    {
        send("Sup!");
    }

}).listen(3000);