var express = require('express');
var multer = require('multer');
var router = express.Router();

router.get('/new', function (req, res) {
  res.render('new');
});

module.exports = router;
