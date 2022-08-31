const { response } = require('express');
var express = require('express');
const pool = require('../public/javascripts/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



module.exports = router;
