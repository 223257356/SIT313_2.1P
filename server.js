const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    const data = {
        from: `Deakin University <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to: [email],
        subject: 'Welcome to DEV@Deakin!',
        text: 'Thank you for subscribing to DEV@Deakin. We are excited to have you on board!',
        html: '<strong>Thank you for subscribing to DEV@Deakin. We are excited to have you on board!</strong>',
    };

    mg.messages.create(process.env.MAILGUN_DOMAIN, data)
        .then(msg => {
            console.log('Mailgun response:', msg);
            res.status(200).send('Welcome email sent successfully!');
        })
        .catch(err => {
            console.error('Mailgun error:', err);
            res.status(500).send('Error sending welcome email');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

