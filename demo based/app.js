const express = require("express");
const server = express()
const bparser = require("body-parser");
const http = require("http")
server.use(bparser.urlencoded({extended:true}))
server.use(express.static("public"))
server.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/index.html")

})
server.post("/",(req,res)=>{

    const cityname = req.body.cityName;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=da4c2c05e6604aa3b59a1f17381fc341`
     http.get(url,(RES)=>
     { RES.on("data",(data)=>{
         let wdata = JSON.parse(data);
         console.log(wdata)
         res.write(wdata)
     }
     )

     })

})
server.listen(3000)