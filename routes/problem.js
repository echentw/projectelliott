var express = require('express');
var schemas = require('../models/schemas');
var router = express.Router();

var User = schemas.User;

/* GET problems page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/:problem', function(req, res) {
  var problem = Number(req.params.problem);

  User.findOne({ 'username': 'Elliott' }, function(err, user) {
    var hasSolved = (user.problems.indexOf(problem) != -1);
    res.render('problem', { hasSolved: hasSolved });
  });
});

module.exports = router;
