const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'task content cannot be blank']
    },
    // author: String,
    completed: {
        type: Boolean,
        default: false
    },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;