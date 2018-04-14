const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var env = require('./env.js');
const pool = require('./env.js');
app.use(express.static(__dirname + '/pub'));
var mysql = require('mysql');

console.log(env.dbUser);

var con = mysql.createConnection({
    user: env.dbUser,
    password: env.dbPassword,
    host: "localhost",
    port: 8889,
    database: env.dbName,
    ssl: false
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

function errorCallback(res) {
	return function(err) {
		console.log(err);
        res.status(500); // 500 Server Error
        res.send("ERROR!");
    }
}

var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log('JSON Server is running on ' + port);
});