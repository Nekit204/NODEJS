const rpc = require('rpc-websockets').Client

let client = new rpc('ws://localhost:4000/')

client.on('open', () =>
{
    client.call('square', [3]).then((data) => { console.log("square(3)="+data) })
    client.call('square', [5, 4]).then((data) => { console.log("square(5,4)="+data) })
    client.call('sum', [2]).then((data) => { console.log("sum(2)="+data) })
    client.call('sum', [2, 4, 6, 8, 10]).then((data) => { console.log("sum(2,4,6,8,10)="+data) })
    client.call('mul', [3]).then((data) => { console.log("mul(3)="+data) })
    client.call('mul', [3,5,7,9,11,13]).then((data) => { console.log("mul(3,5,7,9,11,13)="+data) })

    client.login({login: 'smw', password: '777'})
        .then(isAuth =>
        {
            if (isAuth)
            {
                client.call('fib', [1]).then((data) => { console.log("fib(1)="+data) }).catch(error => { return error})
                client.call('fib', [2]).then((data) => { console.log("fib(2)="+data) }).catch(error => { return error})
                client.call('fib', [7]).then((data) => { console.log("fib(7)="+data) }).catch(error => { return error})
                client.call('fact', [0]).then((data) => { console.log("fact(0)="+data) }).catch(error => { return error})
                client.call('fact', [5]).then((data) => { console.log("fact(5)="+data) }).catch(error => { return error})
                client.call('fact', [10]).then((data) => { console.log("fact(10)="+data) }).catch(error => { return error})
            }
        })


})

client.on('error', (error) =>
{
    console.log(error)
})