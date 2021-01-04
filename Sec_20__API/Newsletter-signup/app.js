const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
    const name = req.body.inputName;
    const surname = req.body.inputSurname;
    const emails = req.body.inputEmail;

    const listId = "fe0d5cc4bf";
    const subscribingUser = {
        firstName: name,
        lastName: surname,
        email: emails,
    };

    const data = {
        members: [{
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_field: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const listid = "fe0d5cc4bf";
    const url = "https://us7.api.mailchimp.com/3.0/lists/fe0d5cc4bf";
    const option = {
        method: "POST",
        auth: "luferra:b77397ad48e8330b87cab35ebdc72282-us7"
    }

    const requesta = https.request(url, option, function(response) {
        console.log(response.error_count);

        response.on("data", function(data) {
            var rex = JSON.parse(data);
            //console.log(JSON.parse(data));
            if (rex.error_count === 0) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
    })

    requesta.write(jsonData);
    requesta.end();
})

app.listen("3001", function() {
    console.log("Listen on port 3001");
})