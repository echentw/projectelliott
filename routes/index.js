var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'ProjectElliott' });
});

router.get('/progress', function(req, res) {
  res.render('progress', { title: 'ProjectElliott' });
});

module.exports = router;
