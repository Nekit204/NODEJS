let http=require('http')
let fs=require('fs')
const sql = require('mssql/msnodesqlv8');


const pool = new sql.ConnectionPool({
    database: "ZA_UNIVER",
    server: "PARAMON",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true,

    }
});

let GET_handler = (req, res) => {
    let parseUrl = require('url').parse(req.url);

    if (parseUrl.pathname.includes("/api/")) {
        let str = parseUrl.pathname.replace("/api/", "");
        let table = str.substring(0, str.indexOf("/"));
        let id = str.replace(table + "/", "");
        if(table==="") {
            pool.connect().then(() => {
                pool.request().query(`select * from ${id}`, (err, result) => {
                    if (err) {
                        res.end(JSON.stringify({
                            code: 1,
                            message: `Table ${table} does not exist`
                        }))
                    } else {
                        res.end(JSON.stringify(result.recordset));
                    }
                    pool.close();
                });
            });
        }
        else
        {
            pool.connect().then(() => {
                pool.request().query(`select * from ${table} where ${table}='${id}'`, (err, result) => {
                    if (err) {
                        res.end(JSON.stringify({
                            code: 1,
                            message: `Table ${table} does not exist`
                        }))
                    } else {
                        res.end(JSON.stringify(result.recordset));
                    }
                    pool.close();
                });
            });

        }
    } else if (parseUrl.pathname === '/') {
        let html = fs.readFileSync('14-03.html');
        res.writeHead(200, {
            'Content-Type' : 'text/html;charset=utf-8'
        });
        res.end(html);
    }


    console.log(parseUrl);
}

let POST_handler = (req, res) => {
    let parseUrl = require('url').parse(req.url);

    let insertedObject = '';

    if (parseUrl.pathname.includes("/api/")) {
        let table = parseUrl.pathname.replace("/api/", "");
        console.log("table: " + table);

        req.on('data', (data) => {
            insertedObject += data;
        });
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);
                    pool.connect().then(() => {
                        let keys = Object.keys(obj);
                        let array = Object.values(obj);

                        let k = "";
                        let v = "";

                        for (var i = 0; i < keys.length; i++) {
                            if (i !== 0) {
                                k += ` , ${keys[i]} `;
                                v += ` , '${array[i]}' `;
                            } else {
                                k += ` ${keys[i]} `;
                                v += ` '${array[i]}' `;
                            }
                        }
                        console.log(keys);
                        console.log(array);
                        pool.request().query(`insert into ${table} (${k}) values (${v})`, (err, result) => {
                            if (err) {
                                res.end(JSON.stringify({
                                    code: 1,
                                    message: `Table ${table} does not exist`
                                }));
                            } else {
                                console.log("Inserted");
                                res.end(JSON.stringify(obj));
                            }
                            pool.close();
                        });
                    });

            } catch {
                console.log("PARSE ERROR");
            }
        })
    }

}

let PUT_handler = (req, res) => {
    let parseUrl = require('url').parse(req.url);

    let insertedObject = '';

    if (parseUrl.pathname.includes("/api/")) {
        let table = parseUrl.pathname.replace("/api/", "");

        req.on('data', (data) => {
            insertedObject += data;
        });
        req.on('end', () => {
            try {
                let obj = JSON.parse(insertedObject);

                    pool.connect().then(() => {
                        let keys = Object.keys(obj);
                        let array = Object.values(obj);
                        console.log(array[0]) // John

                        let updatedValues = "";
                        for (let i = 0; i < keys.length; i++) {
                            console.log('updatedValues: ' + updatedValues);
                            if (i !== 0) {
                                updatedValues += `, ${keys[i]} = '${array[i]}' `;
                            } else {
                                updatedValues += `${keys[i]} = '${array[i]}' `;
                            }
                        }

                        pool.request().query(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`, (err, result) => {
                            console.log(`update ${table} set ${updatedValues} where ${keys[0]} = '${array[0]}'`);
                            if (err) {
                                res.end(JSON.stringify({
                                    code: 1,
                                    message: `Table ${table} does not exist`
                                }));
                            } else {
                                console.log("Updated");
                                res.end(JSON.stringify(obj));
                            }
                            pool.close();
                        });
                    });

            } catch {
                console.log("PARSE ERROR");
            }
        })
    }

}

let DELETE_handler = (req, res) => {
    let parseUrl = require('url').parse(req.url);
    let table;
    let id;
    let del_obj='';

    if (parseUrl.pathname.includes("/api/")) {
        let str = parseUrl.pathname.replace("/api/", "");

        table = str.substring(0, str.indexOf("/"));

        id = str.replace(table + "/", "");

        pool.connect().then(() => {
            pool.request().query(`select * from ${table} where ${table} = '${id}'`, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({
                        code: 1,
                        message: `Table ${table} does not exist`
                    }));
                } else {
                    del_obj=result.recordset;
                }
            });
            pool.request().query(`delete from ${table} where ${table} = '${id}'`, (err, result) => {
                if (err) {
                    res.end(JSON.stringify({
                        code: 1,
                        message: `Table ${table} does not exist`
                    }));
                } else {
                    console.log("Deleted");
                    res.end(JSON.stringify(del_obj));
                }
                pool.close();
            });
        });


    }

}
OTHER_handler = (req, res) => {
    res.end(`{"${req.method}": "${req.url}"}`);
}

let http_handler = (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8"
    })
    console.log(req.method, " - ", req.url);
    switch (req.method) {
        case "GET": GET_handler(req, res); break;
        case "POST": POST_handler(req, res); break;
        case "PUT": PUT_handler(req, res); break;
        case "DELETE": DELETE_handler(req, res); break;
        default: OTHER_handler(req, res); break;
    }
}

let server = http.createServer();
server.listen(3000, (v) => {
    console.log("server.listen(3000)");
}).on('error', (e) => {
    console.log("server.listen(3000); error: ", e);
}).on('request', http_handler);