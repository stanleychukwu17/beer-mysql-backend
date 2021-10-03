const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen(port, function () {
    console.log('listening on port 4000')
});

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database : 'nodejs_beers'
})

// this is for fetching of all the beers from our beers table
app.get('/', function (req, res) {

    pool.getConnection((err, con) => {
        if (err) { return false }

        con.query("SELECT * from beers", (err, result) => {
            con.release()
            res.send(result)
        })
    })
})

//fetching the result of just one beer using the id of the beer
app.get('/:id', (req, res) => {
    pool.getConnection((err, con) => {
        if (err) { return false }

        con.query("SELECT * from beers where id = ?", [req.params.id], (err, result) => {
            con.release()
            res.send(result)
        })
    })
})