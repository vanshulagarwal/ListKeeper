const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isOwner, validateList } = require('../middlewares');
const { showLists, createList, deleteList } = require('../controllers/lists');

//RENDER LISTS and CREATE LIST
router.route('/')
    .get(isLoggedIn, catchAsync(showLists))
    .post(isLoggedIn, validateList, catchAsync(createList))

//DELETE LIST
router.delete('/:id', isLoggedIn, isOwner, catchAsync(deleteList))

module.exports = router;