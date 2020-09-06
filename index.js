const random = require('random');
const express = require('express');

const app = express();


app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

var otp = random.int(min = 100001, max = 999999);



app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.post('/sendMessage', async(req, res) => {
    try {
        var unirest = require("unirest");

        var requ = unirest("POST", "https://www.fast2sms.com/dev/bulk");

        requ.headers({
            "content-type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "authorization": "YOUR_API" //enter your fast2sms api-key
        });

        requ.form({
            "sender_id": "FSTSMS",
            "language": "english",
            "route": "p", //p-promotional
            "numbers": req.body.number,
            "message": `Your OTP is ${otp}`,
            "variables": "{#AA#}|{#CC#}",
            "variables_values": "123456787|asdaswdx"
        });

        requ.end(function(res) {
            console.log(res.body);
        });
        res.sent('OTP sent');
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log("server is started at 5000");
});

console.log(otp);
