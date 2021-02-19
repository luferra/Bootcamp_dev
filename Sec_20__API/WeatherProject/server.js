const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const query = req.body.city;
    const appid = "2e899d82d1191e37057bde619b790f3c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
    // console.log(url);
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.setHeader('Content-type', 'text/html');
            res.write("<h3>The weather is " + desc + "</h3>");
            res.write("<h2>The temperature in " + query + " is: " + temp + "</h2>");
            res.send();

        })
    })
})



app.listen("3000", function() {
    console.log("listen server3000");
})