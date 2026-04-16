import { Category } from "../models/category.model.js";

export const createCategory = async(req,res)=>{
    try {
        const {categoryName} = req.body;
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
            // created_by:userId
             created_by:"69e11cabd80fe72bee75ebd9"
        });

        return res.status(201).json({
            message:"Category Created Successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getCategoryById = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}


