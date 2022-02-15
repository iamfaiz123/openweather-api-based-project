const express = require("express")
server = express()
const https = require("https")
const bparser = require("body-parser")
server.use(bparser.urlencoded({extended:true}))
server.use(express.static("public"))



  server.get("/",(req,res)=>
  {
    res.sendFile(__dirname + "/index.html")
  })
  server.post("/",(req,res)=>
  {
      let cityname = req.body.cityName
     /// console.log(cityname)
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=da4c2c05e6604aa3b59a1f17381fc341`
      {
          //let url = "https://api.openweathermap.org/data/2.5/weather?q=lucknow&appid=da4c2c05e6604aa3b59a1f17381fc341"
          //starting of sending response
          https.get(url,(RES)=>
            {
                RES.on("data",(data)=>
                {
                    let wdata = JSON.parse(data)
                    //console.log(wdata)
                    console.log(wdata.cod)
                   if(wdata.cod != 200)
                   {
                     let errurl = "https://auditivohearing.com/front_assets/img/search.png"
                     res.write("<h1>city name does not exist in our data, make sure to check spelling</h1> ")
                     res.write(`<img src=${errurl}>`)
                   }

                    else if(wdata.cod == 200){
                     //////
                      let icon = wdata.weather[0].icon
                   //console.log(wdata.main.temp)
                   temp = Math.floor(wdata.main.temp - 273)
                    res.write(`<h1>the temprature in ${cityname} is ${temp} degree celcius</h1>`)
                    let iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`
                    res.write(`<img src=${iconurl}>
                    <p>the weather description can be classified as ${wdata.weather[0].description}</p></img>`)
                    res.write(`<p>the speed on the wind is `)
          
                    //////
                   
                  }
                })
            })

      }
  })


server.listen(3000,(err)=>{
    if(err)console.log(err)
    else console.log("server is up and running")

})