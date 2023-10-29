const List = require('./models/list');
const { listSchema, itemSchema } = require('./schemas');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        req.flash('success', 'You need to Signed in first');
        return res.redirect('/login');
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const list = await List.findById(id);
    if (!list.owner.equals(req.session.user_id)) {
        req.flash('error', 'You do not have permission to do that. You will be blocked if you try to breach security.');
        return res.redirect('/home');
    }
    next();
}

module.exports.validateList = (req, res, next) => {
    const { error } = listSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    }
    else {
        next();
    }
}

module.exports.validateItem = (req, res, next) => {
    const { error } = itemSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new Error(msg);
    }
    else {
        next();
    }
}