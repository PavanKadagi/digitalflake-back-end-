const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    }
});


userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        }
        next()
});

userSchema.methods.generatingToken = async function(){
    try {
        const token =  jwt.sign({_id:this._id},process.env.SECRETE_KEY)
    return token;
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoose.model('User',userSchema);