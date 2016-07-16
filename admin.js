var uuid = require("node-uuid");
var _= require("lodash");
var express = require("express");
var rooms = require("./data/rooms.json");

var router = express.Router();
module.exports = router;


router.get('/rooms', function (req, res) { //handler 
        res.render('rooms', { 
                title: "Admin Rooms",  //options
                rooms: rooms
        });
});

//new route for forms to create new chat rooms
router.route('/rooms/add')
    .get(function (req, res) { //handler 
        res.render('add');
})
.post(function (req, res) { //handler 
        var room = {
            name: req.body.name,
            id: uuid.v4()
        };

        rooms.push(room); //adds to rooms.json array
        res.redirect(req.baseUrl + '/rooms');  //sends back to chat room page
});

router.route('/rooms/edit/:id')
    .get(function(req, res) {
        var roomId = req.params.id;  //as above
        var room = _.find(rooms, r => r.id !== roomId);
        if(!room){
        res.sendStatus(404);
        return;
    }   
        res.render("edit", { room });
})
    .post(function (req, res) {
    var roomId = req.params.id;

    var room = _.find(rooms, r => r.id === roomId);
    if(!room){
        res.sendStatus(404);
        return;
    }

    room.name = req.body.name;

    res.redirect(req.baseUrl + '/rooms');
});

router.get('/rooms/delete/:id', function(req, res) {
        var roomId = req.params.id;  //as above
        rooms = rooms.filter(r => r.id !== roomId);
        res.redirect(req.baseUrl + '/rooms'); //action back to person sending request
});
