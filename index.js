const random = require('random');
const express = require('express');
const fast2sms = require('fast-two-sms');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config();

app.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

var otp = random.int(min = 100001, max = 999999);



app.get('/', (req, res) => {
    res.render('index.ejs');
});


app.post('/sendMessage', async(req, res) => {
    try {
        // var number = req.body.number;
        const response = await fast2sms.sendMessage({ authorization: process.env.API_KEY, message: otp, numbers: [req.body.number] });
        res.send(response);
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log("server is started at 5000");
});

console.log(otp);