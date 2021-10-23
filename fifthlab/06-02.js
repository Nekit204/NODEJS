let http=require('http');
let fs=require('fs');
const nodemailer=require('nodemailer');
const { parse } = require('querystring');
const { send }=require('./m0603');
const testpack=require('absahdbhsbchx');
const sendmail = require("sendmail");
http.createServer((req,res)=>{


    if(require('url').parse(req.url).pathname==="/"&&req.method==="GET")
    {
       res.end(fs.readFileSync("./page.html"));
       send("Hello");
    }
    else if(req.method==="POST")
    {
       let body='';
       req.on('data',chunk => {body+=chunk.toString()})
       req.on('end',()=>{
           let info=parse(body);
           let transporter = nodemailer.createTransport({
               service:'gmail',
               auth: {
                   user:'*************************' ,
                   pass: '***************************8'
               },
           });
           transporter.sendMail({
               from: info.from,
               to: info.to,
               subject: "LABTEST",
               text: info.message,
           });
           res.end("from:"+info.from+";" +
               "to:"+info.to+";" +
               "message:"+info.message+".")
       });

    }
    else if(require('url').parse(req.url).pathname==="/send")
    {
       // send("Sup!");
        testpack.send("Sup!");
    }

}).listen(3000);