const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Heather6113',
    database: 'tennis_weather',
    port: '3306'
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO tennis_weather.previous_calls (city, temp) VALUES ('seattle', '20');";
    db.query(sqlInsert, function (err, result) {
        if(err) console.log(err);
        res.send(sqlInsert);
    });
}); 

app.listen(3001,() => {
    console.log('running on port 3001');

})