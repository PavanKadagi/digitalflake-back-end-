const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    categoryName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        trim:true
    }
});


module.exports = mongoose.model('Category',categorySchema);