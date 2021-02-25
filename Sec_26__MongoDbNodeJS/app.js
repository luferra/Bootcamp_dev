const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true});

const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Why no name?"]
  },
  rating: {
      type: Number,
      min: 1,
      max: 10
  },
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

const newFr = new Fruit({
  rating: 7,
  review: 'very good very good'
});

//  newFr.save();

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
