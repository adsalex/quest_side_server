const http = require("http");
const filesys = require("fs")
const cors = require("cors")
 const express = require("express")
 const app = express()
 const dir = "./quests"
var filename = filesys.readdirSync(dir,{withFileTypes: true})
app.use(cors())
app.use("/list",function (request, response) {
    response.send(filename);
}); 
app.use("/preload",function (request, response) {
    console.log(request.query.q)
    let filebuf = filesys.readFileSync(dir+"/"+request.query.q+".json","utf-8")
    response.send(JSON.parse(filebuf).description);
});
app.use("/load",function (request, response) {
    let filebuf = filesys.readFileSync(dir+"/"+request.query.q+".json","utf-8")
    response.send(filebuf);
});  
app.use(function (request, response) {
    //console.log(request.query.fisle)
    //filename
    //response.sendFile(dir+questname)
    response.send(request.query);
    //response.send("{Hello:11}");
});
app.listen(3300);