const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const uri = "mongodb+srv://luferra:Figone1987!!@cluster0.c5myl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "fruitDB";

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");

  const db = client.db(dbName);

  // insertDocuments(db, function() {
  //   client.close();
  // });
  findDocuments(db, function() {
    client.close();
  });
});

const insertDocuments = function(db, callback) {
  const collection = db.collection("fruit");
  collection.insertMany([
    {a:1}, {a:2}, {a:3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("inserted 3 documents");
    callback(result)
  });
};

const findDocuments = function(db, callback) {
  const collection = db.collection('fruit');
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
};
