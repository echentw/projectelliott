var express = require('express');
var router = express.Router();

/* GET progress page */
router.get('/', function(req, res) {
  res.render('progress', { title: 'ProjectElliott' });
});

module.exports = router;
