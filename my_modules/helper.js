function add(dt){
let data = dt;
let fs = require("fs");

fs.readFile('data.json', 'utf8',function(err, todoData){
    if (err) console.log(err);
    
if(todoData.length == 0){
    data.id= 1
    data.checked = 'false'
    fs.writeFileSync("data.json", JSON.stringify([data]))
}
else{
    let ID = JSON.parse(todoData)[JSON.parse(todoData).length - 1].id
    data.id=ID + 1
    data.checked = 'false'
    const jsonObj = JSON.parse(todoData.toString())
    
    jsonObj.push(data);
    fs.writeFileSync("data.json", JSON.stringify(jsonObj))
} 
});
}

function remove(dt){
    let fs = require("fs");
    fs.readFile('data.json', 'utf8',function(err, todoData){
        if (err) console.log(err);

        let ID = JSON.parse(todoData)[JSON.parse(todoData).length - 1].id
        let deletedTask = JSON.parse(todoData).filter(tsk =>  tsk.id == dt);
        let tasks = JSON.parse(todoData).filter(tsk =>  tsk.id != dt);
        
        if(deletedTask[0].id != ID){
            tasks.map(tsk => {if(tsk.id > deletedTask[0].id) tsk.id -= 1;})
        }
        fs.writeFileSync("data.json", JSON.stringify(tasks));
    });
}

function edit(id,dt){ 
let fs = require("fs");
fs.readFile('data.json', 'utf8',function(err, todoData){
    if (err) console.log(err);

    let editTask = JSON.parse(todoData).filter(tsk =>  tsk.id == id);
    let tasks = JSON.parse(todoData).filter(tsk =>  tsk.id != id);
    if(dt.title != undefined & dt.body != undefined)
    {
        editTask[0].title = dt.title
        editTask[0].body = dt.body
    }
    else if(dt.checked != undefined){
        editTask[0].checked = dt.checked
    }
    let data=[...editTask,...tasks]

    //sort data
    data = data.sort((tsk1, tsk2) => {
        if (tsk1.id < tsk2.id) return -1;
      });

    fs.writeFileSync("data.json", JSON.stringify(data))
});
}

module.exports = {add, remove, edit};