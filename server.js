const path = require("path");
const express = require("express");
const app = express();
const fs = require('fs');
const csv = require('csv-parser');
const inputData = require('./src/ApexCodeCoverage.csv');

app.use(express.static(__dirname + '/ApexTestSuite'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ApexTestSuite', 'index.html'))
});

app.get('/api/classes', function (req, res) {
    let apexClasses = [];
    fs.createReadStream(inputData)
        .pipe(csv())
        .on('data', (data) => {
            if (!apexClasses.includes(data.ApexClassOrTriggerName)) {
                apexClasses.push(data.ApexClassOrTriggerName);
            }
        })
        .on('error', (error) => {
            console.error(error);
            res.json(JSON.stringify(error));
        })
        .on('end', () => {
            // writeFileSync('db.json', JSON.stringify(apexClasses));
            res.json(apexClasses);
        });
});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);