const express = require('express')
const router = express.Router()
const helper = require("../my_modules/helper")

router.post("",(req,res) => {
    helper.add(req.body);
    res.end(`New task added`);
});

router.delete("/:id", (req,res) => {
    helper.remove(req.params.id);
    res.end(`Task of id ${req.params.id} removed`);
});

router.put("/:id",(req,res) => {
    helper.edit(req.params.id, req.body)
    res.end(`Task of id ${req.params.id} updated`);
});

router.get("", (req,res) => {
    let fs = require("fs");
    fs.readFile('data.json', 'utf8',function(err, todoData){
        if (err) console.log(err);

        if(req.body.checked == undefined)res.end(`${todoData}`);

        else if(req.body.checked == "true"){
            let data = JSON.parse(todoData).filter(tsk =>  tsk.checked == "true")
            res.end(`${JSON.stringify(data)}`);
        }

        else if(req.body.checked == "false"){
            let data = JSON.parse(todoData).filter(tsk =>  tsk.checked == "false")
            res.end(`${JSON.stringify(data)}`);
        }

    });
});

module.exports = router