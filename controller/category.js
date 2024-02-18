const Counter = require('../model/categoryCounterSchema');
const Category = require('../model/categorySchema')

const getNextCategoryId = async(id)=>{
    const counter = await Counter.findByIdAndUpdate(
    id,
    {$inc:{sequenceValue:1}},
    {new:true,upsert:true}
    );
    return counter.sequenceValue;
}

const createCategory = async (req,res)=>{
    try {
        console.log("category",req.body);
       
       
        const {categoryName,description,status} = req.body;

        const existCategoryName = await Category.findOne({categoryName});
        if(existCategoryName){
             res.status(200).json({message:'category is aleardy exist'});
        }else{
            const id = await getNextCategoryId(process.env.CATEGORY_ID);
            
            const category = await Category.create({categoryName,description,status,id})
            if(category){
                res.status(201).json({message:"category added successfully"});
            }else{
                res.status(401).json({error:"error occured while adding category"});
            }
        }
        
    } catch (error) {
        console.log(error.message);
    }
}


const deleteCategory = async (req,res)=>{
    try {
        console.log("deleteCategory",req.params,req.query);
        const deleteCategory = await Category.findByIdAndDelete({_id:req.params.id});
        if(deleteCategory){
            res.status(200).json({message:'category deleted.'});
        }else{
            res.status(401).json({error:'no category'});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const editCategory = async (req,res)=>{
    try {
        console.log("editCategory",req.body);
        const getOneCategory = await Category.findByIdAndUpdate({_id:req.params.id},{$set:req.body});
        if(getOneCategory){
            res.status(200).json({message:'category updated.'});
        }else{
            res.status(401).json({error:'error occured while updating category'});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getOneCategory = async (req,res)=>{
    try {
        console.log("getOneCategory",req.params,req.query);
        const getOneCategory = await Category.findOne({_id:req.params.id});
        if(getOneCategory){
            res.status(200).json({data:getOneCategory})
        }else{
            res.status(401).json({error:'no category'})
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getAllCategory = async (req,res)=>{
    try {
        const getAllCategory  = await Category.find({});
        if(getAllCategory){
            res.status(200).json({data:getAllCategory})
        }else{
            res.status(401).json({error:'no category'})
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {createCategory,getAllCategory,getOneCategory,editCategory,deleteCategory}