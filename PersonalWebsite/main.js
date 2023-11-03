const express = require('express');
const bodyParser = require('body-parser'); 
const fs = require('fs');
const app = express();

app.use(express.static(__dirname));

// Serve files from the 'PersonalWebsite' directory
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/submit_form', (req, res) => {
    if (!req.body.user_name || !req.body.user_email || !req.body.user_message) {
        res.status(400).json({ success: false, message: 'Invalid request' });
        return;
    }

    const dataString = `Name: ${req.body.user_name}, Email: ${req.body.user_email}, Message: ${req.body.user_message}\n`;

    fs.appendFile('contacts.txt', dataString, (err) => {
        if (err) {
            console.error("There was an error writing to the file:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
            return;
        }
        res.json({ success: true, message: 'Form data received!'});
    });
});

app.listen(4242, () => { //local host 4242
  console.log(`Server is running on port 4242`);
});