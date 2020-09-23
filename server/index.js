const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Heather6113",
    database: "tennis_weather"
});

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO previous_calls (city, temp) VALUES ('los angeles', '100');";
    db.query(sqlInsert, (err, result) => {
        res.send(sqlInsert);
    });
}); 

app.listen(3001,() => {
    console.log('running on port 3001');

})