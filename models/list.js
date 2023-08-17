const mongoose = require('mongoose');
const Item = require('./item');

const ListSchema = new mongoose.Schema({
    title: String,
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
})

ListSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Item.deleteMany({
            _id: {
                $in: doc.items
            }
        })
    }
})

const List = mongoose.model('List', ListSchema);

module.exports = List;