const rpcWSC=WebSocket=require('rpc-websockets').Server

let server=new rpcWSC({port:4000,host:'localhost'});

server.setAuth((l)=>{return(l.login==='smw'&&l.password==='777')});

function findFib(n) {
    let i;
    let fib = [];
    fib[0] = 0;
    fib[1] = 1;
    for (i = 2; i < n; i++)
    {
        fib[i] = fib[i - 2] + fib[i - 1];
    }
    return fib
}

function findFact(n) {
    return (n !== 1) ? n * findFact(n - 1) : 1;
}

server.register('square',(params =>{

    if (params[1])
    {
        return params[0] * params[1]
    }

    return Math.PI * (params[0] ^ 2)
})).public();

server.register('sum', params =>
{
    let sum = 0
    for (let par in params) {
        sum += Number(params[par])
    }
    return sum
}).public()

server.register('mul', params =>
{
    let mul = 1
    for (let par in params)
    {
        mul *= Number(params[par])
    }
    return mul
}).public()

server.register('fib', params =>
{
    return findFib(params[0])
}).protected()

server.register('fact', args =>
{
    return findFact(args[0])
}).protected()