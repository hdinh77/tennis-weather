const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Heather',
    database: 'tennis_weather',
    port: '3306'
});

/*
app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO tennis_weather.previous_calls (city, temp) VALUES ('seattle', '20');";
    db.query(sqlInsert, function (err, result) {
        if(err) console.log(err);
        res.send(sqlInsert);
    });
});
*/

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM tennis_weather.previous_calls";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post('/', (req, res) => {
    const city = req.body.city;
    const temp = req.body.temp;
    const sqlInsert = "INSERT INTO tennis_weather.previous_calls (city, temp) VALUES (?, ?)";
    db.query(sqlInsert, [city, temp], (err, result) => {
        if(err) {
            console.log(err);
        }
    });
});

app.listen(3001,() => {
    console.log('running on port 3001');

});
