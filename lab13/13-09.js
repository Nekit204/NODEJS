const udp=require('dgram');
const PORT=3000;

let server = udp.createSocket('udp4');

server.on('error',(err)=>{console.log('Error:'+err);server.close();});

server.on('message',(msg,info)=>
{
    console.log('Server:receive from client '+msg.toString());
    let response_message='ECHO:'+msg.toString();
    server.send(response_message,info.port,info.address,(err)=>{
        if(err){server.close();}
        else{console.log("Data send");}
    });
})

server.on('close',()=>{console.log('Server is closed');})
server.bind(PORT);