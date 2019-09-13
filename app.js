//Requiring Modules
var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    Item = require("./models/item"),
    mongoose = require("mongoose"),
    app = express();

//Setting Up Server
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/itemlist");

//Routes

//Root Route
app.get("/", function (req, res) {
    res.redirect("/index");
});

//Index Route
app.get("/index", function (req, res) {
    // Item.create({
    //     name: "Football",
    //     seller: "C",
    //     price: "5000"
    // }, function (err) {
    //     if (err)
    //         console.log(err);
    // })
    Item.find({}, function (err, items) {
        if (err)
            console.log(err);
        else {
            res.render("index", {
                items: items
            })
        }
    })
});

//New Route
app.get("/index/new", function(req, res){
    res.render("new");
});

//Create Route
app.post("/index", function(req, res){
    Item.create(req.body.item, function(err){
        if(err)
            console.log(err);
        else
            res.redirect("/index");
    });
});

//Show Route
app.get("/index/:id", function(req, res){
    Item.findById(req.params.id, function(err, item){
        if(err)
            console.log(err);
        else
            res.render("show", {item: item});
    })
});

//Edit Route
app.get("/index/:id/edit", function(req, res){
    Item.findById(req.params.id, function(err, editItem){
        if(err)
            console.log(err);
        else
            res.render("edit", {item: editItem});
    })
});

//Update Route
app.put("/index/:id", function(req, res){
    Item.findByIdAndUpdate(req.params.id,req.body.item,function(err, updatedItem){
        if(err)
            console.log(err);
        else
            res.redirect("/index/"+req.params.id);
    });
});

//Delete Route
app.delete("/index/:id", function(req, res){
    Item.findByIdAndRemove(req.params.id, function(err, deletedItem){
        if(err)
            console.log(err);
        else
            res.redirect("/index");
    });
});

app.listen("3000", function () {
    console.log("Server Has Started");
});