var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  //Req (request).
  //Access database connection (already created in app.js) to collection 'users'. 
  //The method .find() with no parameters returns all documents from the collection.
  //The method .toArray() saves the find-results in an array.
  req.app.locals.db.collection("users").find().toArray()
  
  //When previous step is successful, .then (move on to...)
  .then(results => {
    console.log("Results: ", results);
  })

  res.send('respond with a resource');
});

module.exports = router;
