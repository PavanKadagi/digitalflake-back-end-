const mongoose = require('mongoose');

const categoryCounterSchema = mongoose.Schema({
    
    sequenceValue:{
        type:Number,
        default:101
    }
});

module.exports = mongoose.model('Counter',categoryCounterSchema)
