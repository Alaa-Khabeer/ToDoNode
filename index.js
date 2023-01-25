const express = require('express')
//const PORT = process.env.SERVER.PORT || 5000
const PORT =  5000
const app = express()
const uRouter = require("./routes/todo")

app.use(express.json())

app.use('/todo', uRouter);

app.listen(PORT,(err) => {
    if(!err) return console.log(`Server starts at port ${PORT}`);
    console.log(err);
});