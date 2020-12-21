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

    mailchimp.setConfig({
        apiKey: "6c882fb21d8e5e39b95d195c8bb02ad2-us7",
        server: "us7",
    });

    const listId = "fe0d5cc4bf";
    const subscribingUser = {
        firstName: name,
        lastName: surname,
        email: emails,
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            }
        });

        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
        );
    }
    run();

    // const data = {
    //     members: [{
    //         email_address: email,
    //         status: "subscribed",
    //         merge_field: {
    //             FNAME: name,
    //             LNAME: surname
    //         }
    //     }]
    // };

    // const jsonData = JSON.stringify(data);

    // const listid = "fe0d5cc4bf";
    // const url = "https://us7.api.mailchimp.com/3.0/lists/fe0d5cc4bf";
    // const option = {
    //     method: "POST",
    //     auth: "luferra:6c882fb21d8e5e39b95d195c8bb02ad2-us7"
    // }

    // const requesta = https.request(url, option, function(response) {
    //     response.on("data", function(data) {
    //         console.log(JSON.parse(data));
    //     })
    // })

    // requesta.write(jsonData);
    // requesta.end();
})

app.listen("3001", function() {
    console.log("Listen on port 3001");
})