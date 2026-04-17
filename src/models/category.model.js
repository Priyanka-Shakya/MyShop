import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
        unique: true
    },
    categoryProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

}, { timestamps: true });

export const Category = mongoose.model('Category', categorySchema);