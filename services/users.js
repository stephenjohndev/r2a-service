var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


router.get('/', (req, res) => {
  req.db.collection('Users').find().toArray((err, results) => {
    if (err) throw err;
    res.send(results)
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  var parentres = res
  var requestBody = JSON.parse(Object.keys(req.body)[0])
  req.db.collection("Users").insertOne(requestBody, function(err, res) {
    if (err) throw err;
    console.log("1 record inserted");
    parentres.send('')
  });
})

router.put('/', (req, res) => {
  var requestBody = JSON.parse(Object.keys(req.body)[0])
  console.log(requestBody.values)
  console.log(requestBody._id)
  var parentres = res


  req.db.collection("Users").updateOne({_id: { $eq: ObjectID(requestBody._id)}}, {$set :  requestBody.values}, (err, res) => {
    if (err) throw err;
    console.log(res.result.nModified + " record updated");
    parentres.send('')
  });
})

router.delete('/', (req, res) => {
  var requestBody = JSON.parse(Object.keys(req.body)[0])
  var parentres = res
  req.db.collection("Users").deleteOne({_id: { $eq: ObjectID(requestBody._id)}}, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    parentres.send('')
  });
})

module.exports = router;