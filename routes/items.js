const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');
const List = require('../models/list');
const catchAsync = require('../utils/catchAsync');
const { itemSchema } = require('../schemas');


const validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    }
    else {
        next();
    }
}

router.post('/', validateItem, catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const myList = await List.findById(id);
    if (!myList) {
        throw new Error("Invalid list");
    }
    const newItem = new Item({ ...req.body });
    myList.items.push(newItem);
    await newItem.save();
    await myList.save();
    console.log(myList);
    res.redirect('/home');
}))

router.put('/completed', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const myItem = await Item.findById(id);
    if (!myItem) {
        throw new Error("Invalid item");
    }
    const toggleCompleted = !(myItem.completed);
    const updatedItem = await Item.findByIdAndUpdate(id, { completed: toggleCompleted });
    console.log(updatedItem);
    res.redirect('/home');
}))

router.delete('/items/:itemId', catchAsync(async (req, res, next) => {
    const { id, itemId } = req.params;
    const myList = await List.findByIdAndUpdate(id, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);
    console.log(myList);
    res.redirect('/home');
}))

module.exports = router;