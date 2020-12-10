const express = require("express");
const bp = require("body-parser");

const app = express();
const port = 3000;

app.use(bp.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/bmiCalculator.html");
})

app.post("/bmicalculator", function(req, res){
    var weigth = req.body.weigth;
    var height = req.body.height;
    var bmi = weigth / Math.pow(height, 2);

    res.send("bmi: "+bmi);
})

app.listen(port, function() {
    console.log(`Listen on port ${port}`);
})