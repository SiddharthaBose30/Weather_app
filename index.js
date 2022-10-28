const express=require('express');
const https = require('https');
const bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  var city_name=req.body.Name_Of_City;
  var api_key= "2f22f0e638666852dfef07f8479f2b4f";
  var unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city_name+"&appid="+api_key+"&units="+unit;
  https.get(url,function(response){
  response.on("data",function(data){
     var weatherDate=JSON.parse(data);
     var weatherDescription=weatherDate.weather[0].description;
     var temp=weatherDate.main.temp;
     var icon=weatherDate.weather[0].icon;
     var image_url= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
     res.write("<h1>" + weatherDescription + "</h1>");
     res.write("<h1>The temparature in "+city_name+" is "+ temp +"</h1>");
     res.write("<img src="+image_url+">");
     res.send();
  });
  });


});




app.listen(3000,function(){
  console.log("Weather App is Running");
});
