const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "nodelogin",
});

connection.connect(function (err) {
  if (err) return console.log(err);
  console.log("DB connection OK");
});

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        console.log("results", results);
        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;

          response.send("OK");
        } else {
          response.status(401).send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.listen(5000);
