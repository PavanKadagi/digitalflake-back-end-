const User = require('../model/userSchema');
const bcrypt = require('bcrypt')
const register = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const existEmail = await User.findOne({email}); 
        if(existEmail){
          return  res.status(200).json({message:"email is aleardy exist"})
        }
        console.log(req.body,"00")
        const user  = await User.create({email,password})
        if(user){
            res.status(201).json({message:"regitser successfully.."});
        }else{
            res.status(401).json({error:"error occured while registering"});
        }
    } catch (error) {
        console.log(error.message);
    }
}



const login = async (req,res)=>{
    try {
        const { email, password } = req.body;
        const signin = await User.findOne({ email });
        if (signin) {
            const passwordMatch = await bcrypt.compare(password, signin.password);
            if (passwordMatch) {
                const token = await signin.generatingToken();  
                res.status(200).json({ message: "Signin Successfull...!", token, });
            } else {
                res.json({ error: "Invalid Credientials" });
            }
        } else {
            res.json({ error: "Invalid Credientials" });
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {login,register}