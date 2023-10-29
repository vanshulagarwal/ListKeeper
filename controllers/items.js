const Item = require('../models/item');
const List = require('../models/list');

//CREATE ITEM and append in its respective list
module.exports.createItem = async (req, res, next) => {
    const { id } = req.params;
    const myList = await List.findById(id);

    //if no list found (can occur if wrong list_id provided (using postman, hoppscotch etc.))
    if (!myList) {
        throw new Error("Invalid list");
    }
    const newItem = new Item({ ...req.body });
    myList.items.push(newItem);
    await newItem.save();
    await myList.save();
    console.log(myList);
    res.redirect('/home');
}

//UPDATE ITEM runs when checkbox is clicked
module.exports.updateItem = async (req, res, next) => {
    const { itemId } = req.params;
    const myItem = await Item.findById(itemId);
    if (!myItem) {
        throw new Error("Invalid item");
    }
    const toggleCompleted = !(myItem.completed);
    const updatedItem = await Item.findByIdAndUpdate(itemId, { completed: toggleCompleted });
    console.log(updatedItem);
    res.redirect('/home');
}

//DELETE ITEM
module.exports.deleteItem = async (req, res, next) => {
    const { id, itemId } = req.params;
    const myList = await List.findByIdAndUpdate(id, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);
    console.log(myList);
    res.redirect('/home');
}