require('dotenv').config();
require('./DB/connect');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;



app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(require('./routes/user'));
app.use(require('./routes/category'));
app.use(require('./routes/products'));





app.listen(port,()=>{
    console.log("connection succesfully at "+port)
})


