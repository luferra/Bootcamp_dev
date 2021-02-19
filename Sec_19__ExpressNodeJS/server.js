//jshint esversion:6

const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res) {
    res.send("<h1>Helloo</h1>");
})
app.get("/contact", function(req, res) {
    res.send("<h1>contact me at me@me.com</h1>");
})
app.get("/about", function(req, res) {
    res.send("<p><span>name:</span> Luuuuuuuuca</p>");
})
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});