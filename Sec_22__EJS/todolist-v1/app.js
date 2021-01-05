const express = require("express");
//const https = require("https");
const bodyParser = require("body-parser");

const PORT = 3000;
//usa sempre let al posto di var. le variabili let, come i const sono locali anche all'interno di loop e if. Le variabili var invece sono globali se inserite in loop o if.
let items = ["Buy food", "Cook food", "Eat food"];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    let today = new Date();
    // let weekday = new Array(7);
    // weekday[0] = "Sunday";
    // weekday[1] = "Monday";
    // weekday[2] = "Tuesday";
    // weekday[3] = "Wednesday";
    // weekday[4] = "Thursday";
    // weekday[5] = "Friday";
    // weekday[6] = "Saturday";
    // let day = weekday[today.getDay()];
    let day = today.toLocaleDateString("it-IT", options);
    res.render('list', { dayz: day, newIteme: items });
})

app.post("/", function(req, res) {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.listen(PORT, function() {
    console.log("listen server " + PORT);
})