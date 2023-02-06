var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String
}),


async function register(params) {
    // create account object
    const newPerson = new User(params);

    // hash password
    newPerson.passwordHash = bcrypt.hashSync(params.password, 10);

    // save account
    await newPerson.save();
}

async function authenticate({ email, password }) {
    // get account from database
    const newPerson = await User.findOne({ email });

    // check account found and verify password
    if (!newPerson || !bcrypt.compareSync(password, account.passwordHash)) {
        // authentication failed
        return false;
    } else {
        // authentication successful
        return true;
    }
}

User = mongoose.model('User', userSchema);

module.exports = User;