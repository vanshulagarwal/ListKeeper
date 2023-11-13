const BaseJoi = require('joi');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean != value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi=BaseJoi.extend(extension);

module.exports.listSchema = Joi.object({
    title: Joi.string().required().min(1).max(12).escapeHTML(),
    items: Joi.array()
});

module.exports.itemSchema = Joi.object({
    task: Joi.string().required().min(1).max(25).escapeHTML(),
    completed: Joi.boolean()
});