var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/progress', function(req, res) {
  res.render('progress');
});

module.exports = router;
