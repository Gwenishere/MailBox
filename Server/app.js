const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
})


app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log("info: " + firstName, lastName, email);
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/0a165e5ae5"

   const options = {
       method: "POST",
       auth: "Gwen:4cc8348475b9add69964e35e1fe2ebfd-us1"
   }

   const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});



app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running on port 3000');
})




/**API Key 4cc8348475b9add69964e35e1fe2ebfd-us1 */

/**list id 0a165e5ae5 */