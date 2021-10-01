let http=require("http")
var url=("url")
let fs=require("fs")
let data=require("./004-02")
let dateStart=null;
let dateFinish=null;
let commit_count=null;
let request_count=null;
let commit_count2=null;
let request_count2=null;
let flag2=false;
let flag=false;
let db=new data.DB();

db.on('GET',(req,res)=>{console.log('DB.GET');res.end(JSON.stringify(db.get()));});
db.on('POST',(req,res)=>{
    console.log('DB.POST');
    req.on('data',data=>
    {
        let r=JSON.parse(data);
        db.post(r);
        res.end(JSON.stringify(r));
    });});
db.on('PUT',(req,res)=>{
    console.log('DB.PUT');
    req.on('data',data=> {
        let r=JSON.parse(data);
        db.put(r);
        res.end(JSON.stringify(r));
    });});
db.on('DELETE',(req,res)=> {
    console.log('DB.DELETE');
    let id = parseInt(require('url').parse(req.url,true).query.id);
    console.log(id);
    let line = db.delete(id)
    res.end(JSON.stringify(line))
});

let server=http.createServer((req,res)=>
{
    if(require('url').parse(req.url,true).pathname==='/')
    {
        let html=fs.readFileSync("./04-02.html");
        request_count++;
        res.writeHead(200,{'Content-type':'text/html;charset=utf-8'});
        res.end(html);
    }
    else if (require('url').parse(req.url,true).pathname==='/api/db')
    {
        db.emit(req.method,req,res);
        request_count++;
    }
    else if(require('url').parse(req.url).pathname === '/api/ss'){
        request_count++;
        if(!flag)
        {
            res.end("{start:null"  + ",finish:null"+ ",request:null" + ",commit:null"  + "} ");
        }
        else
        {
            if(!flag2)
            {
                res.end("{start:" + dateStart + ",finish:" + dateFinish + ",request:" + request_count2 + ",commit:" + commit_count2 + "} ");
            }
            else {
                res.end("{start:" + dateStart + ",finish:" + dateFinish + ",request:" + request_count + ",commit:" + commit_count + "} ");
            }
        }
    }
}).listen(3000)

process.stdin.setEncoding('utf-8');
process.stdin.unref();
let s;
let f;
let n;
process.stdin.on('readable',()=>{
    let chunk2=null;
    let chunk;
    while ((chunk2 = process.stdin.read()) !=null){
        chunk = chunk2.split(' ');
        if	(chunk[0].trim() === 'sd') {
            if(chunk[1]!==undefined)
            {
                s = setTimeout(()=>{server.close();},chunk[1].trim()*1000);
            }
            else
            {clearTimeout(s);}
        }
        else if  (chunk[0].trim() ==='sc')
        {
            if(chunk[1]!==undefined)
            {
                f = setInterval(()=>{db.commit();commit_count++;},chunk[1].trim()*1000);
                f.unref();
            }
            else
            {clearInterval(f);}
        }
        else if  (chunk[0].trim() ==='ss')
        {
            flag=true;
            flag2=true;
            let dt=new Date();
            dateStart=dt.getDate()+"."+(dt.getMonth()+1)+"."+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();
            commit_count=0;
            request_count=0;
            if(chunk[1]!==undefined)
            {
                n = setTimeout(()=>{
                    let dt2=new Date();
                    dateFinish=dt.getDate()+"."+(dt2.getMonth()+1)+"."+dt2.getFullYear()+" "+dt2.getHours()+":"+dt2.getMinutes()+":"+dt2.getSeconds();
                    flag2=false;
                    request_count2=request_count;
                    commit_count2=commit_count;
                },chunk[1].trim()*1000);
                n.unref();
            }
            else
            {
                clearTimeout(n);
            }
        }
    }
});