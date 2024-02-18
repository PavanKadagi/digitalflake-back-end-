const mongoose = require('mongoose');

const productCounterSchema = mongoose.Schema({
    
    sequenceValue:{
        type:Number,
        default:101
    }
});

module.exports = mongoose.model('Counterproduct',productCounterSchema)
