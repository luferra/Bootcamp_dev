var express = require("express");
var bp = require("body-parser");

var app = express();
var port = 3001;

app.use(bp.urlencoded({extended: true}))

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    console.log(req.body);
    var n1 = req.body.num1;
    var n2 = req.body.num2;

    var sum = n1 + n2;
    res.send("The result of calculation is: " + sum);
});
app.listen(port, function () {
    console.log(`Connected to port ${port}`);
})