//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");

//const https = require("https");
const bodyParser = require("body-parser");
const _ = require("lodash");

//connection to db
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing name"]
  }
});

const Item = mongoose.model('Item', itemSchema);

const item1 = new Item({
  name: "exercize 1"
});

const item2 = new Item({
  name: "do laudry"
});

const item3 = new Item({
  name: "study"
});

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

const defaultItem = [item1, item2, item3];

//express + ejs conf/init
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  //usa sempre let al posto di var. le variabili let, come i const sono locali anche all'interno di loop e if. Le variabili var invece sono globali se inserite in loop o if.

  Item.find({}, function(er, items){
    console.log(items.length);
      if(items.length === 0) {
        console.log("enter");
        Item.insertMany(defaultItem, function(err) {
          if (err){
            console.log(err);
          }
          else {
            console.log("successfully insert");
          }
        });
        res.redirect("/");
      }
      else {
          res.render('list', {
          listTitle: "Today",
          newIteme: items
        });
      }
  });


})

app.get("/:customListName", function(req, res){
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, list){
    if (!err){
      if(!list){
        console.log("No exist");
        const list = new List({
          name: customListName,
          items: defaultItem
        });
        list.save();
        res.redirect("/" + customListName);
      }
      else {
        console.log("exist");
        res.render('list', {
          listTitle: list.name,
          newIteme: list.items
        })
      }
    }
    else{
      console.log(err);
    }
  })

});

app.post("/", function(req, res) {
  let item = req.body.newItem;
  let title = req.body.list;
  const nItem = new Item({
      name: item
    });

  if (title === "Today"){
    nItem.save();
    res.redirect("/");
  } else {
    List.findOne({name: title}, function(err, lista) {
      lista.items.push(nItem);
      lista.save();
      res.redirect("/" + title);
    });
  }

})
app.post("/delete", function(req, res) {
  let delItem = req.body.checkbox;
  let listCheck = req.body.listCheck;
  if (listCheck === "Today"){
    Item.findByIdAndRemove(delItem, {useFindAndModify: false}, function(err){
      if (err) {
        console.log(err);
      }
      else{
        console.log("successfully deleted");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listCheck}, {$pull: {items: {_id: delItem}}}, function(err, foundList){
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/" + listCheck);
      }
    });
}
})

app.get("/work", function(req, res) {
  res.render('list', {
    listTitle: "Work",
    newIteme: workItem
  })
})

app.listen(3000, function() {
  console.log("listen server 3000");
})
