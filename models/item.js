const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    task: String,
    // author: String,
    completed: Boolean,
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;