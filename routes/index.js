var express = require('express');
var router = express.Router();

var buildings = ['A1', 'A2', 'A6', 'A9', 'Admin'];

var rooms_a1 = [{name: '212', seats: 10, projector: true, computers: false, admin: 'Someone'},
                {name: '214', seats: 20, projector: true, computers: false, admin: 'Someone'}];
var rooms_a2 = [{name: '101', seats: 10, projector: true, computers: false, admin: 'Someone'},
                {name: '202', seats: 20, projector: true, computers: false, admin: 'Someone'},
                {name: '303', seats: 30, projector: true, computers: false, admin: 'Someone'}];

var rooms = {A1: rooms_a1, A2: rooms_a2, A6: rooms_a2, A9: rooms_a2, Admin: rooms_a2};

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { buildings: buildings, rooms: rooms });
});

module.exports = router;
