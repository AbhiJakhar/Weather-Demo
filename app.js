const { response } = require("express");
const express=require("express");

const bodyParser=require("body-parser");
const https =require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
    res.sendFile(__dirname+"/index.html")
    
    
});
app.post("/",function(req,res){
    console.log(req.body.cityName);
    const city=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ecc1285fba30f3414532c9c0f6f0f1e8&units=metric";
    https.get(url,function(response){
      console.log(response.statusCode);
      if(response.statusCode==404){
        res.send("write correct city name");
      }
      else {
      response.on("data",function(data){
       const weatherData=JSON.parse(data);
       const temp=weatherData.main.temp;
       const icon=weatherData.weather[0].icon;
       const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
       console.log(temp);
       console.log(weatherData.weather[0].description);
       res.write("<p>The weather is currently "+weatherData.weather[0].description+"</p>");
       res.write("<h1>The temperature in "+ city+" is "+temp+"*C.</h1>");
       res.write("<img src="+imageURL+">")
       res.write("")
       res.send();
      });
    }
});

})

app.listen(process.env.PORT||3000,function(){
    console.log("Server started at port 3000");
});