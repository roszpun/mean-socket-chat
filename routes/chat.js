var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/schema');
var database = require('../model/database');

/* GET chat landing page. */
router.get('/', function (req, res, next) {
    var rooms = mongoose.model('Room');
    var messages = mongoose.model('Message');

    rooms.find({}, function (err, db_rooms) {
        if (err) {
            console.error(err);
            res.render(err);
        }
        else {
            messages.find({}, function (err, db_messages) {
                if (err) {
                    console.error(err);
                    res.render(err);
                }
                else {
                    res.redirect('http://127.0.0.1:3000');
                }
            })
        }
    })
});

module.exports = router;