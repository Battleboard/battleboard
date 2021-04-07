const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    spells:{
        type: Array,
        required: true,
        default: [0,1,2,3,4,5,6,7]
    },
    gold:{
        type: Number,
        required: true,
        default: 0,
    },
    role:{
        type:String,
        required: true,
        default:'player'
    },
    register_date: {
        type: Date,
        default: Date.now
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    draws: {
        type: Number,
        default: 0
    }
});

module.exports = User = mongoose.model('User', UserSchema);