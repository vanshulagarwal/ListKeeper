const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const List = require('../models/list');
const { listSchema } = require('../schemas');


const validateList = (req, res, next) => {
    const { error } = listSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    }
    else {
        next();
    }
}

router.get('/', catchAsync(async (req, res, next) => {
    const allLists = await List.find({}).populate('items');
    if(!allLists){
        req.flash('error','No Lists found. Create one below!');
        return res.redirect('/home');
    }
    res.render('home', { allLists });
}))

router.post('/', validateList, catchAsync(async (req, res, next) => {
    // if (!req.body.title) throw new Error('Invalid campground data');
    const newList = new List({ ...req.body });
    await newList.save();
    console.log(newList);
    req.flash('success','Successfully created a new list');
    res.redirect('/home');
}))

router.delete('/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const myList = await List.findByIdAndDelete(id);
    if (!myList) {
        throw new Error("Invalid list");
    }
    req.flash('success',`${myList.title} was discarded`);
    res.redirect('/home');
}))

module.exports = router;