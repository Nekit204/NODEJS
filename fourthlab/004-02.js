let util=require("util")
let ee=require("events")
 let db_data=[
     {id:1,name:'Иванов И.И',bday:'2001-01-01'},
     {id:2,name:'Петров П.П',bday:'2001-01-02'},
     {id:3,name:'Сидоров С.С',bday:'2001-01-03'}
 ]

function DB()
{
    this.get=()=>{return db_data;};
    this.post=(r)=>{return db_data.push(r);};
    this.put=(r)=>
    {
        let index = db_data.findIndex(x => x.id === r.id)
        let elementJson = db_data[index]
        db_data.splice(index, 1,r)
        return elementJson;
    }
    this.delete=(id)=> {
        let index = db_data.findIndex(x => x.id === id)
        let elementJson = db_data[index]
        db_data.splice(index, 1)
        return elementJson;
    };
    this.commit=()=>{};
}

util.inherits(DB,ee.EventEmitter);

exports.DB=DB;