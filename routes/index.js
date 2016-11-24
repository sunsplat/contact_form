var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me!' });
});

router.get('/submit_success', function(req, res, next) {
  res.render('submit_success', { title: 'Submitted' });
});

/* POST */
router.post('/add_message', function(req, res) {
  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var firstName = req.body.first_name;
  var lastName = req.body.last_name;
  var email = req.body.email;
  var message = req.body.message;
  // Set our collection
  var collection = db.get('messagecollection');

  // Submit to the DB
  collection.insert({
      "first_name": firstName,
      "last_name" : lastName,
      "email"     : email,
      "message"   : message
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // And forward to success page
      res.redirect('contact');
    }
  });
});


module.exports = router;
