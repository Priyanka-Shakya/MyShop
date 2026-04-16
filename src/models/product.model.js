import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productImages: [{
        type: String
    }],
    productBrand: {
        type: String,
    },
    productStock: {
        type: Number,
        default: 0
    },
    productRatings: {
        type: Number,
        default: 0
    },
    productReviews: {
        type: Number,
        default: 0
    },
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);