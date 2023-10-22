const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Item = require('./models/item');
const List = require('./models/list');
const methodOverride = require('method-override');

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

app.get('/home', async (req, res) => {
    const allLists = await List.find({}).populate('items');
    res.render('home', { allLists });
})

app.post('/home', async (req, res) => {
    const newList = new List({ ...req.body });
    await newList.save();
    console.log(newList);
    res.redirect('/home');
})

app.post('/home/:id', async (req, res) => {
    const { id } = req.params;
    const myList = await List.findById(id);
    const newItem = new Item({ ...req.body, completed: false });
    myList.items.push(newItem);
    await newItem.save();
    await myList.save();
    console.log(myList);
    res.redirect('/home');
})

app.delete('/home/:id', async (req, res) => {
    const {id}=req.params;
    const myList=await List.findByIdAndDelete(id); 
    res.redirect('/home');
})

app.put('/completed/:id', async (req, res) => {
    const { id } = req.params;
    const myItem = await Item.findById(id);
    const toggleCompleted = !(myItem.completed);
    const updatedItem = await Item.findByIdAndUpdate(id, { completed: toggleCompleted });
    console.log(updatedItem);
    res.redirect('/home');
})

app.delete('/home/:listId/items/:itemId', async (req, res) => {
    const { listId, itemId } = req.params;
    const myList = await List.findByIdAndUpdate(listId, { $pull: { items: itemId } });
    await Item.findByIdAndDelete(itemId);
    console.log(myList);
    res.redirect('/home');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});