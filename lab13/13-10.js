const udp=require('dgram');
const Buffer = require("buffer");
const client=udp.createSocket('udp4');
const PORT=3000;

client.on('message',(msg,info)=>
{
    console.log('Client:receive from Server: '+msg.toString());
});

client.send("Hello",PORT,'localhost',(err)=>{
    if(err) client.close();
    else console.log('Client:data send')
})