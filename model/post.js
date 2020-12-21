const mongoose = require('mongoose');

const Schema = {
    title:{
        type:String,
        min:5,
        required:true
    },
    description:{
        type:String,
        min:10,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    dislikes:{
        type:Number,
        default:0
    },
    comments:{
        type:String,
        max:200,
    },
    category:{
        type:Number
    },
    date:{
        type:Date,
        default:Date.now
    }
}

module.exports = mongoose.model('posts',Schema);