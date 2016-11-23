var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me!' });
});

router.get('/admin_contact', function(req, res) {
  var db = req.db;
  var collection = db.get('messagecollection');
  collection.find({},{},function(e,docs){
    res.render('admin_contact', {    // this is referencing the jade template
        "messages" : docs            // this is applying the data to a variable named messages
    });
  });
});

module.exports = router;
