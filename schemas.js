const Joi = require('joi');

module.exports.listSchema = Joi.object({
    title: Joi.string().required().min(1).max(12),
    items: Joi.array()
});

module.exports.itemSchema = Joi.object({
    task: Joi.string().required().min(1).max(25),
    completed: Joi.boolean()
});