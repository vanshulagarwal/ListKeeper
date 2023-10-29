const List = require('../models/list');

//RENDER LISTS of currently logged in user
module.exports.showLists = async (req, res, next) => {
    const allLists = await List.find({ 'owner': req.session.user_id }).populate('items');
    if (!allLists) {
        req.flash('error', 'No Lists found. Create one below!');
        return res.redirect('/home');
    }
    res.render('home', { allLists });
}

//CREATE LIST
module.exports.createList = async (req, res, next) => {
    // if (!req.body.title) throw new Error('Invalid campground data');
    const newList = new List({
        ...req.body,
        owner: req.session.user_id
    });
    await newList.save();
    console.log(newList);
    req.flash('success', 'Successfully created a new list');
    res.redirect('/home');
}

//DELETE LIST
module.exports.deleteList = async (req, res, next) => {
    const { id } = req.params;
    const myList = await List.findByIdAndDelete(id);
    if (!myList) {
        throw new Error("Invalid list");
    }
    req.flash('success', `${myList.title} was discarded`);
    res.redirect('/home');
}