const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');

const authentication= require('../middleware/auth');

const {createProduct,getAllProduct,getOneProduct,editProduct,deleteProduct} = require('../controller/products');

const filePath = path.resolve(__dirname,'../public/images');

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,filePath)
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+'-'+file.originalname;
        cb(null,uniqueSuffix) 
    }
});


const upload = multer({storage:storage});


route.post('/create-product',authentication,upload.single('image'),createProduct);
route.get('/get-all-product',authentication,getAllProduct);
route.get('/get-one-product/:id',authentication,getOneProduct);
route.put('/edit-product/:id',upload.single('image'),authentication,editProduct);
route.delete('/delete-product/:id',authentication,deleteProduct);



module.exports =  route;
