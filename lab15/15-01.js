const MongoClient = require("mongodb").MongoClient;
http=require('http')

const mongoClient = new MongoClient("mongodb://localhost:27017/");

http_handler=(req,res)=> {

    if (req.method === 'GET') {
        if (require('url').parse(req.url).pathname === '/api/pulpits') {
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("PULPIT");
                    collection.find().toArray(function (err, results) {
                        let jsonBody = JSON.stringify(results);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(jsonBody);

                    });
                }
            });
        } else if (require('url').parse(req.url).pathname === '/api/faculties') {
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("FACULTY");
                    collection.find().toArray(function (err, results) {
                        let jsonBody = JSON.stringify(results);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(jsonBody);

                    });
                }
            });
        }

    }

    else if (req.method === 'POST')
    {
        let insertedObject = '';
        req.on('data',chunk=>{insertedObject+=chunk.toString();});
        req.on('end', ()=>{
            let o = JSON.parse(insertedObject);
        if (require('url').parse(req.url).pathname === '/api/pulpits') {
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("PULPIT");
                    collection.insertOne(o, function(err, result){

                        if(err){
                            return console.log(err);
                        }
                        else
                        {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(o));
                        }

                    });
                }
            });
        } else if (require('url').parse(req.url).pathname === '/api/faculties')
        {
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("FACULTY");
                    collection.insertOne(o, function(err, result){

                        if(err){
                            return console.log(err);
                        }
                        else
                        {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(o));
                        }

                    });
                }
            });
        }

    })
    }

    else if (req.method === 'PUT')
    {
        let updatedObject = '';
        req.on('data',chunk=>{updatedObject+=chunk.toString();});
        req.on('end', ()=>{
            let o = JSON.parse(updatedObject);
            if (require('url').parse(req.url).pathname === '/api/pulpits') {
                mongoClient.connect(function (err, client) {
                    if (err) {
                        return console.log(err);
                    } else {
                        const db = client.db("BSTU");
                        const collection = db.collection("PULPIT");
                        collection.findOneAndUpdate({PULPIT:o.PULPIT}, { $set: {PULPIT_NAME: o.PULPIT_NAME}}, function(err, result){

                            if(err){
                                return console.log(err);
                            }
                            else
                            {
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(o));
                            }

                        });
                    }
                });
            } else if (require('url').parse(req.url).pathname === '/api/faculties')
            {
                mongoClient.connect(function (err, client) {
                    if (err) {
                        return console.log(err);
                    } else {
                        const db = client.db("BSTU");
                        const collection = db.collection("FACULTY");
                        collection.findOneAndUpdate({faculty: o.faculty}, {$set: {faculty_name: o.faculty_name}}, function (err, result) {

                            if (err) {
                                return console.log(err);
                            } else {
                                res.writeHead(200, {'Content-Type': 'application/json'});
                                res.end(JSON.stringify(o));
                            }

                        });
                    }
                });

            }

        })
    }

    else if (req.method === 'DELETE')
    {

        if(require('url').parse(req.url).pathname.search('\/api\/faculties\/[A-z]+')!==(-1))
        {
            let p = require('url').parse(req.url,true);
            let r =decodeURI(p.pathname).split('/');
            let o = r[3];
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("FACULTY");
                    collection.findOneAndDelete({faculty: o},function (err, result) {

                        if (err) {
                            return console.log(err);
                        }

                    });
                }
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(o));



        }
        else
        {
            let p = require('url').parse(req.url,true);
            let r =decodeURI(p.pathname).split('/');
            let o = r[3];
            mongoClient.connect(function (err, client) {
                if (err) {
                    return console.log(err);
                } else {
                    const db = client.db("BSTU");
                    const collection = db.collection("PULPIT");
                    collection.findOneAndDelete({PULPIT: o}, function (err, result) {

                        if (err) {
                            return console.log(err);
                        }

                    });
                }
            });
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(o));


        }
    }



}
let server=http.createServer(function (req, res){
    try{
        http_handler(req,res);
    }
    catch(e)
    {
        console.error(e);
    }

}).listen(3000);

