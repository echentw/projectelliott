var express = require('express');
var fs = require('fs');
var schemas = require('../models/schemas');
var router = express.Router();

var User = schemas.User;

/* GET progress page */
router.get('/', function(req, res) {
  var json = fs.readFileSync('problems.json', 'utf8');
  var problems = JSON.parse(json);

  User.findOne({ 'username': 'Elliott' }, function(err, user) {
    var progress = [];
    var counter = 1;
    var numSolved = 0;
    for (index in problems) {
      if (user.problems.indexOf(Number(index)) != -1) {
        progress.push({ number: counter, solved: true });
        ++numSolved;
      } else {
        progress.push({ number: counter, solved: false });
      }
      ++counter;
    }

    var oneSolved = (numSolved == 1);

    res.render('progress', { title: 'ProjectElliott',
                             progress: progress,
                             numSolved: numSolved,
                             oneSolved: oneSolved });
  });
});

module.exports = router;
