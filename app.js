"use strict";

var express = require("express");
var app = express();
var rooms = require("./data/rooms.json");

app.set("views", "./views");
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(express.static("node_modules/bootstrap/dist"));

app.get('/', function (req, res) { //handler 
        res.render('index', { title: "Home"});
});

app.get('/admin/rooms', function (req, res) { //handler 
        res.render('rooms', { 
                title: "Admin Rooms",  //options
                rooms: rooms
        });
});

//new route for forms to create new chat rooms
app.get('/admin/rooms/add', function (req, res) { //handler 
        res.render('add');
});

app.listen(3000, function () {
        console.log('Chat app listening on port 3000!');
});