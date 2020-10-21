//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const items = ["Buy Food", "Cook Food"];
const workItems = [];

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  const day = date.GetDate();
  res.render("list", {
    ListTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {

  const item = req.body.NewItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {
    ListTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req,res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
