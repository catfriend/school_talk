"use strict";

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("views", "./views");
app.set('view engine', 'jade');

var fs = require("fs");
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

app.use(require("morgan")("combined", {stream: accessLogStream}));

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(express.static("node_modules/jquery/dist"));

app.use(bodyParser.urlencoded({ extended: true })); //needs to be registered before any routes that rely on it
app.use(bodyParser.json());

app.get('/', function (req, res) { //handler 
        res.render('home', { title: "Home"});
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

var apiRouter = require("./api");  //new router for api
app.use("/api", apiRouter);

app.listen(3000, function () {
        console.log('Chat app listening on port 3000!');
});