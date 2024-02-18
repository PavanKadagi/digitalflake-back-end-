const express = require('express');
const route = express.Router();

const authentication= require('../middleware/auth');
const {createCategory,getAllCategory,getOneCategory,editCategory,deleteCategory} = require('../controller/category');

route.route('/create-category').post(authentication,createCategory);
route.get('/get-all-category',authentication,getAllCategory);
route.get('/get-one-category/:id',authentication,getOneCategory);
route.patch('/edit-category/:id',authentication,editCategory);
route.delete('/delete-category/:id',authentication,deleteCategory);



module.exports =  route;
