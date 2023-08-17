const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Item = require('./models/item');
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

app.get('/home', async (req, res) => {
    const allItems = await Item.find({});
    res.render('home', { allItems });
})

app.post('/home', async (req, res) => {
    const newItem = new Item({ ...req.body, completed: false });
    await newItem.save();
    console.log(newItem);
    res.redirect('/home');
})

app.put('/completed/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findById(id);
    const toggleCompleted = !(item.completed);
    const updatedItem = await Item.findByIdAndUpdate(id, { completed: toggleCompleted });
    console.log(updatedItem);
    res.redirect('/home');
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);
    console.log(item);
    res.redirect('/home');
})

// app.post('/home', (req, res) => {
// })

// app.get('/create', (req, res) => {
//     res.render('new');
// })

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});