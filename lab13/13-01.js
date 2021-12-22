const net=require('net');
let HOST='0.0.0.0';
let PORT = 3000;

net.createServer((sock)=>
{
    console.log('Server Connected:      '+ sock.remoteAddress+':'+sock.remotePort);
    sock.on('data',(data)=>
    {
        console.log('String from Client:    ' + data);
        sock.write('ECHO:' + data);
    });
    sock.on('close',(data)=>
    {
        console.log('Client disconnect')
    })
}).listen(PORT,HOST);

