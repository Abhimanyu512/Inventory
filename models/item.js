var mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    seller: String,
    image: String,
    desc: String,
    price: Number
});

module.exports = mongoose.model("item", itemSchema);