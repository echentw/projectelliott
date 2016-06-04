var express = require('express');
var fs = require('fs');
var schemas = require('../models/schemas');
var router = express.Router();

var User = schemas.User;

var TITLE = 'ProjectElliott';

/* GET problems page. */
router.get('/', function(req, res) {
  res.render('index', { title: TITLE });
});

/* GET specific problem */
router.get('/:problem', function(req, res) {
  var index = req.params.problem;
  var json = fs.readFileSync('problems.json', 'utf8');
  var problems = JSON.parse(json);

  if (index in problems) {
    User.findOne({ 'username': 'Elliott' }, function(err, user) {
      var hasSolved = (user.problems.indexOf(Number(index)) != -1);
      var problemStatement = problems[index].problem;
      res.render('problem', { title: TITLE,
                              hasSolved: hasSolved,
                              index: index,
                              problemStatement: problemStatement });
    });
  }
});

/* POST specific problem */
router.post('/:problem', function(req, res) {
  var index = req.params.problem;
  var json = fs.readFileSync('problems.json', 'utf8');
  var problems = JSON.parse(json);

  var submittedAnswer = Number(req.body.submittedAnswer);

  if (index in problems) {
    if (problems[index].answer == submittedAnswer) {
      // handle correct answer
      User.findOne({ 'username': 'Elliott' }, function(err, user) {
        var answer = problems[index].answer;
        var hasSolved = (user.problems.indexOf(Number(index)) != -1);

        if (!hasSolved) {
          // if problem hasn't been solved yet, append it to the user array
          User.update({ 'username': 'Elliott' },
                      { $push: { 'problems': Number(index) } },
                      function(err) {
            res.render('problem', { title: TITLE,
                                    hasSolved: hasSolved,
                                    index: index });
          });
        } else {
          // if the problem has been solved already...
          res.render('problem', { title: TITLE,
                                  hasSolved: hasSolved,
                                  index: index });
        }
      });
    } else {
      // handle incorrect answer
      res.render('incorrect', { title: TITLE });
    }
  } else {
    res.render('error');
  }
});

module.exports = router;
