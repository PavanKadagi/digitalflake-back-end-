
const Product = require('../model/productSchema');
const ProductCounter = require('../model/productCounterSchema');


const getNextProductId = async(id)=>{
    const counter = await ProductCounter.findByIdAndUpdate(
    id,
    {$inc:{sequenceValue:1}},
    {new:true,upsert:true}
    );
    return counter.sequenceValue;
}


const createProduct = async (req,res)=>{
    try {
        const {productName,packSize,category,mrp,status} = req.body;
        console.log("createProduct",req.body)
        const id = await getNextProductId(process.env.PRODUCT_ID);
        const product = await Product.create({
            productName,packSize,category,mrp,image:req.file.filename,status,id
        });
        if(product){
            res.status(201).json({message:"product added successfully"});
        }else{
            res.status(401).json({error:"error occured while adding product"});
        }
        
    } catch (error) {
        console.log(error.message);
    }
}


const deleteProduct = async (req,res)=>{
    try {
        console.log("deleteProduct",req.params,req.query);
        const deleteProduct = await Product.findByIdAndDelete({_id:req.params.id});
        if(deleteProduct){
            res.status(200).json({message:'product deleted.'});
        }else{
            res.status(401).json({error:'error occured while product deleting'});
        }
    } catch (error) {
        console.log(error.message);
    }
}


const editProduct = async (req,res)=>{
    try {
        console.log("editProduct",req.body);
        const {productName,packSize,mrp,category,status} = req.body;
        const image = req?.file ? req?.file?.filename : req.body.image;
        const getOneCategory = await Product.findByIdAndUpdate({_id:req.params.id},{$set:{productName,packSize,mrp,category,status,image}});
        if(getOneCategory){
            res.status(200).json({message:'product updated.'});
        }else{
            res.status(401).json({error:'error occured while updating product'});
        }
    } catch (error) {
        console.log(error.message);
    }
}


const getOneProduct = async (req,res)=>{
    try {
        console.log("getOneProduct",req.params,req.query);
        const getOneProduct = await Product.findOne({_id:req.params.id});
        if(getOneProduct){
            res.status(200).json({data:getOneProduct});
        }else{
            res.status(401).json({error:'error occured while product getting'});
        }
    } catch (error) {
        console.log(error.message);
    }
}


const getAllProduct = async (req,res)=>{
    try {
        const getAllProduct  = await Product.find({});
        if(getAllProduct){
            res.status(200).json({data:getAllProduct})
        }else{
            res.status(401).json({error:'error occured while product getting'})
        }
    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {createProduct,getAllProduct,getOneProduct,editProduct,deleteProduct}