const http = require("http");
const filesys = require("fs")
const cors = require("cors")
 const express = require("express")
 const app = express()
 const dir = "./quests"
console.log("server running. let's quest")
var filename = filesys.readdirSync(dir,{withFileTypes: true})
app.use(cors())
app.use("/list",function (request, response) {
    response.send(filename);
}); 
app.use("/preload",function (request, response) {
    
    if(filesys.existsSync(dir+"/"+request.query.q+".json"))
    {
    let filebuf = filesys.readFileSync(dir+"/"+request.query.q+".json","utf-8")
    response.send(JSON.parse(filebuf).description);
    }
    else{response.send(JSON.stringify({error:"404"}))}
    
});
app.use("/load",function (request, response) {
    if(filesys.existsSync(dir+"/"+request.query.q+".json"))
    {
    let filebuf = filesys.readFileSync(dir+"/"+request.query.q+".json","utf-8")
    response.send(filebuf);
    }
    else
    {
        response.send(JSON.stringify({error:"404"}))
    }
});  
app.use(function (request, response) {
    response.send(request.query);
});
app.listen(3300);