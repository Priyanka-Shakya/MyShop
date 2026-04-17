import { Category } from "../models/category.model.js";


// Create Category
export const createCategory = async(req,res)=>{
    try {
        const {categoryName} = req.body;
        const userId = req.id;
        if(!categoryName){
            return res.status(400).json({
                message:"Category name is required",
                success:false
            })
        }

        let category = await Category.findOne({categoryName});

        if(category){
            return res.status(400).json({
                message:"Category already exist",
                success:false
            })
        }
        await Category.create({
            categoryName,
            created_by:userId
        });
        return res.status(201).json({
            message:"Category Created Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get All categories
export const getAllCategories=async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {categoryName:{$regex:keyword,$options:"i"}}
            ]
        }
        const categories = await Category.find(query).populate({
            path:"created_by"
        })
        return res.status(200).json({
            categories,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}



// Get category By Id
export const getCategoryById = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId).populate({
            path:"created_by"
        });
        if(!category){
            return res.status(400).json({
                message:"Category not found",
                success:false
            })
        }
        return res.status(200).json({
            category,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}


