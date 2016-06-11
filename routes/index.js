var express = require('express');
var fs = require('fs');
var schemas = require('../models/schemas');
var router = express.Router();

var User = schemas.User;

/*
 * Check if Elliott is in the DB.
 * If not, save it.
 */
checkDB = function(username, cb) {
  User.findOne({ 'username': username }, function(err, user) {
    if (!user) {
      console.log("First time user! Creating user.");
      var user = new User({
        username: 'Elliott',
        problems: []
      });
      user.save(function (err) {
        cb();
      });
    } else {
      console.log("Elliott has already been created!");
      cb();
    }
  });
};

/* GET home page. */
router.get('/', function(req, res) {
  var json = fs.readFileSync('problems.json', 'utf8');
  var problems = JSON.parse(json);

  checkDB('Elliott', function() {
    User.findOne({ 'username': 'Elliott' }, function(err, user) {
      var progress = [];
      var counter = 0;
      var numSolved = 0;
      for (index in problems) {
        ++counter;
        if (user.problems.indexOf(Number(index)) != -1) {
          progress.push({ number: counter, solved: true });
          ++numSolved;
        } else {
          progress.push({ number: counter, solved: false });
        }
      }

      res.render('index', { title: 'ProjectElliott',
                            progress: progress,
                            numSolved: numSolved });
    });
  });
});

module.exports = router;
