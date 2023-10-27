const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Item = require('./models/item');
const List = require('./models/list');
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const { listSchema, itemSchema } = require('./schemas');

const dbUrl = 'mongodb://127.0.0.1:27017/todo';
mongoose.connect(dbUrl)
    .then(() => {
        console.log('mongo database connected');
    })
    .catch((err) => {
        console.log('mongo connection error!!');
        console.log(err);
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

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

app.get('/home', catchAsync(async (req, res, next) => {
    const allLists = await List.find({}).populate('items');
    res.render('home', { allLists });
}))

app.post('/home', validateList, catchAsync(async (req, res, next) => {
    // if (!req.body.title) throw new Error('Invalid campground data');
    const newList = new List({ ...req.body });
    await newList.save();
    console.log(newList);
    res.redirect('/home');
}))

app.post('/home/:id', validateItem, catchAsync(async (req, res, next) => {
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

app.delete('/home/:id', catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const myList = await List.findByIdAndDelete(id);
    if (!myList) {
        throw new Error("Invalid list");
    }
    res.redirect('/home');
}))

app.put('/completed/:id', catchAsync(async (req, res, next) => {
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

app.delete('/home/:listId/items/:itemId', catchAsync(async (req, res, next) => {
    const { listId, itemId } = req.params;
    const myList = await List.findByIdAndUpdate(listId, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);
    console.log(myList);
    res.redirect('/home');
}))

app.all('*', (req, res, next) => {
    next(new Error('Page Not Found'));
})

const handleValidationErr = err => {
    console.log(err);
    return new Error(`Validation Failed... ${err.message}`);
}

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') {
        err = handleValidationErr(err);
    }
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh no! Something went Wrong!';
    console.log("****error****", err);
    res.status(status).render('error', { err });
    next(err);
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});