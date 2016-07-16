"use strict";

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(function(req, res, next) {

});


app.set("views", "./views");
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(bodyParser.urlencoded({ extended: true })); //needs to be registered before any routes that rely on it

app.get('/', function (req, res) { //handler 
        res.render('index', { title: "Home"});
});

var adminRouter = require("./admin");
app.use("/admin", adminRouter);

app.listen(3000, function () {
        console.log('Chat app listening on port 3000!');
});