const http=require('http');
    let h=(r)=>
    {
        let rc='';
        for(let key in r.headers) rc+='<h3>'+key+':'+r.headers[key]+'</h3>';
        return rc;
    }
const server=http.createServer((req,res)=>{
    let b='';
    req.on('data',str=>{b+=str;console.log('data',b);})
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    req.on('end',()=>res.end(
        '<!DOCTYPE html><html><head></head><head>'+
        '<body>'+
        '<h1>Hello World</h1>'+
        '<h1>Стуктура запроса</h1>'+
        '<h2>'+'метод:'+req.method+'</h2>'+
        '<h2>'+'uri:'+req.url+'</h2>'+
        '<h2>'+'версия:'+req.httpVersion+'</h2>'+
        '<h2>'+'Заголовки:'+'</h2>'+
        h(req)+
        '<h2>'+'тело:'+b+'</h2>'+
        '</body>'+
        '</html>'
        )
    )


}).listen(3000);
