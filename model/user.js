const { number } = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:256
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:1024
    },
    date:{
        type: Date,
        default:Date.now
    },
    role:{
        type:Number
    }

})

module.exports = mongoose.model('user', userSchema);