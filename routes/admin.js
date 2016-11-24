
var express = require('express');
var router = express.Router();

/*
 * GET messagelist.
 */
router.get('/con', function(req, res) {
    var db = req.db;
    var collection = db.get('messagecollection');
    collection.find({},{},function(e,docs){
    res.render('con', {    // this is referencing the jade template
        "messages" : docs            // this is applying the data to a variable named messages
    });
  });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deletemsg/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('messagecollection');
    var msgToDelete = req.params.id;
    collection.remove({ '_id' : msgToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

router.get('/admin_contact', function(req, res) {
  var db = req.db;
  var collection = db.get('messagecollection');
  collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


module.exports = router;
