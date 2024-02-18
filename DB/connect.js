const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(()=>{
    console.log("DB Connected");
}).catch((error)=>{
    console.log(error.message);
})

