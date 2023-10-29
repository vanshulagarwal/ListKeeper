const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username must be provided']
    },
    password: {
        type: String,
        required: [true, 'password must be created']
    },
    email: {
        type: String,
        required: [true, 'email should be provided']
    },
})

// a static function appended in the userschema, so that we may use it for directly validating user during login
userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username: username });
    //if a user is found, this means that the username is already in use
    if (!foundUser) return false;

    //if username is unique, then we will verify the password
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}
const User = mongoose.model('user', userSchema);

module.exports = User;