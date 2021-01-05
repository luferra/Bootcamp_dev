const express = require("express");
//const https = require("https");
const bodyParser = require("body-parser");

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    var today = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[today.getDay()];

    res.render('list', { dayz: day });
})

app.listen(PORT, function() {
    console.log("listen server " + PORT);
})