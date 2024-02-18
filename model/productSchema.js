const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
    },
    productName:{
        type:String,
        required:true,
        trim:true
    },
    packSize:{
        type:String,
        required:true,
        trim:true
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    mrp:{
        type:Number,
        required:true,
        
    },
    image:{
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


module.exports = mongoose.model('Product',productSchema);