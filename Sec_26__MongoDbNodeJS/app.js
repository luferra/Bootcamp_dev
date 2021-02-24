const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit({
  name: 'Apple',
  rating: 7,
  review: 'very good very good'
});

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 5,
  review: 'toomuch'
});

const banana = new Fruit({
  name: 'Banana',
  rating: 8,
  review: 'Bunnanna'
});
//fruit.save();

// Fruit.insertMany([kiwi, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Inseirtittutti");
//   }
// });

Fruit.find(function(err, fruits){
  if (err){
    console.log(err);
  }
  else {
  //  console.log(fruits);

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
  mongoose.connection.close();
});
