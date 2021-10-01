// const http=require("http");
// const bodyParser = require('body-parser')
// const express = require("express");
// const url = require("url");
// const app = express();
// const people=[
//     [1,'Maksim','22.03.2000'],
//     [2,'Sasha','03.06.2001'],
//     [3,'Oleg','10.11.1996'],
//     [4,'Alisa','19.01.1999'],
// ]
//
// let jsonParser=bodyParser.json();
// let server;
//
//
// app.get("/",function(request,response)
// {
//     response.end(JSON.stringify(people))
//
//     server.close();
// })
//
//
//     app.post("/",jsonParser,function (request,response){
//         console.log(request.body);
//         people[people.length]=[request.body['id'],request.body['name'],request.body['bdate']]
//         response.end(JSON.stringify(people))
//         server.close();
//     })
//
//
// app.put("/",jsonParser,function (request,response)
// {
//    console.log(request.body)
//     let id=request.body['id']
//     for(let i=0;i<people.length;i++)
//     {
//         if(people[i][0]==id)
//         {
//             people[i]=[request.body['id'],request.body['name'],request.body['bdate']]
//             break;
//         }
//     }
//     response.end(JSON.stringify(people))
//     server.close();
// })
//
// app.delete("/app/db",jsonParser,function (request,response)
// {
//     let peopleDel=[];
//     if(typeof url.parse(request.url,true).query.id!='undefined')
//     {
//         let id=parseInt(url.parse(request.url,true).query.id);
//         if(Number.isInteger(id))
//         {
//             for(let i=0;i<people.length;i++)
//             {
//                 console.log(id)
//                 if(people[i][0]!=id)
//                 {
//                     peopleDel[i]=people[i];
//                 }
//             }
//         }
//     }
//     response.end(JSON.stringify(peopleDel))
//     server.close();
// })
// server=app.listen(3000)

