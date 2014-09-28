var moment = require('moment');
var express = require('express');
var router = express.Router();

var data = require('../data');

var sun = moment().startOf('week');
var this_week = [moment(sun)];

for (var i = 1; i <= 6; i++) {
	this_week.push(moment(sun.add(1, 'd')));
}

var next_week = [moment(sun.add(1, 'd'))];

for (var i = 1; i <= 6; i++) {
	next_week.push(moment(sun.add(1, 'd')));
}

function filter_records(docs, week) {
	var records = [];
	week.forEach(function(day) {
		var recs = docs.filter(function(rec) {
			return rec.date === day.format('ll');
		});
		records.push(recs);
	});
//	console.log(records);
	return records;
}

/* GET book records. */
router.get('/', function(req, res) {
	var room = null;
	var building = null;
	if (req.query.room)
		room = req.query.room;
	if (req.query.building)
		building = req.query.building;
	if (! (room && building)) {
		res.redirect('/');
		return;
	}
	var today = moment();
	var active_week = 1;
	if (req.query.week && (today.week() != Number(req.query.week)))
		active_week = 2;
	var active_day = today.day();
	if (req.query.day)
		active_day = Number(req.query.day);
	data.query({room: room, building: building}, function(err, docs) {
		res.render('rooms', {this_week: this_week, next_week: next_week,
							 room: room, building: building, today: today,
							 week1_records: filter_records(docs, this_week),
							 week2_records: filter_records(docs, next_week),
							 active_day: active_day, active_week: active_week
							});
	});
});

module.exports = router;
