const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validateItem } = require('../middlewares');
const { createItem, updateItem, deleteItem } = require('../controllers/items');

//CREATE ITEM
router.post('/', isLoggedIn, isOwner, validateItem, catchAsync(createItem));

//UPDATE ITEM will run when checkbox is clicked
router.put('/taskcompleted/:itemId', isLoggedIn, isOwner, catchAsync(updateItem));

//DELETE ITEM
router.delete('/items/:itemId', isLoggedIn, isOwner, catchAsync(deleteItem));

module.exports = router;