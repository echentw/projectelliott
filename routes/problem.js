var express = require('express');
var fs = require('fs');
var schemas = require('../models/schemas');
var router = express.Router();

var User = schemas.User;

/* GET problems page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/:problem', function(req, res) {
  var index = req.params.problem;
  var json = fs.readFileSync('problems.json', 'utf8');
  var problems = JSON.parse(json);

  if (index in problems) {
    User.findOne({ 'username': 'Elliott' }, function(err, user) {
      var hasSolved = (user.problems.indexOf(Number(index)) != -1);
      var problemStatement = problems[index].problem;
      res.render('problem', { hasSolved: hasSolved,
                              problemStatement: problemStatement });
    });
  }
});

module.exports = router;
