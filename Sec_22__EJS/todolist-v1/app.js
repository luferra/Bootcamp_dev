//jshint esversion:6

const express = require("express");
//const https = require("https");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

//è consigliabile utilizzare const per varibili che non cambiano. Ma gli array possono essere dichiarati come costanti.
const items = ["Buy food", "Cook food", "Eat food"];
const workItem = [];

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  //usa sempre let al posto di var. le variabili let, come i const sono locali anche all'interno di loop e if. Le variabili var invece sono globali se inserite in loop o if.

  let day = date.getDayDate();
  res.render('list', {
    listTitle: day,
    newIteme: items
  });
})

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItem.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work",
    newIteme: workItem
  })
})

app.listen(3000, function() {
  console.log("listen server 3000");
})
