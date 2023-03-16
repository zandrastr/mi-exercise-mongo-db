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

    let printUsers = "<h1>All users:</h1> <ul>"

    //Loop through the results
    for (user in results) {
      printUsers += "<li>" + results[user].userName + "</li>"
    }

    printUsers += "</ul>"

    res.send(printUsers);
  })
});

//POST to database
router.post("/add", function(req, res) {

  req.app.locals.db.collection("users").insertOne(req.body)

  .then(result => {
    console.log(result);
    res.redirect("/show");
  })

})

module.exports = router;
