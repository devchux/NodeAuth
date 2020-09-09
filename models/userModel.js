const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('app:userModel');
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 255,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash)=>{
        if (err){
            return debug(err)
        }
        user.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User