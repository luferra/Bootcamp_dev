const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Milan&appid=2e899d82d1191e37057bde619b790f3c";
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            console.log(temp + desc + icon);
        })
    })
    res.send("ciao connesso");
})



app.listen("3000", function() {
    console.log("listen server3000");
})