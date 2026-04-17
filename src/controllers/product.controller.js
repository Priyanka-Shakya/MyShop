import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";


// Create product
export const createProduct = async (req, res) => {
    try {
        const { productName, productDescription, productPrice, productImages, productBrand, productStock, productRatings, productReviews, productCategory } = req.body;
        const userId = req.id;
        if (!productName || !productDescription || !productPrice) {
            return res.status(400).json({
                message: "Product Name, Description and Price are required",
                success: false
            })
        }

        let product = await Product.findOne({ productName });

        if (product) {
            return res.status(400).json({
                message: "product already exists",
                success: false
            })
        }

        product = await Product.create({
            productName,
            productDescription,
            productPrice,
            productImages,
            productBrand,
            productStock,
            productRatings,
            productReviews,
            productCategory,
            createdBy: userId
        })

        await Category.findByIdAndUpdate(
            productCategory,
            {
                $push:{categoryProducts: product._id}
            }
        )

        return res.status(201).json({
            message: "Product Created Successfully",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}


// get All products for user(Admin)
export const getAllProducts = async (req, res) => {
    try {
        const userId = req.id;
        const products = await Product.find({ createdBy: userId }).populate({
            path: 'createdBy'
        }).sort({ created_At: -1 }).populate({
            path: 'productCategory'
        });

        if(!products){
            return res.status(400).json({
                message:"Products not found",
                success:false
            })
        }

        return res.status(200).json({
            products,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}



// Get product by Id
export const getProductById = async(req,res)=>{
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId).populate({
            path:'createdBy'
        }).sort({created_At:-1}).populate({
            path:'productCategory'
        });

        if(!product){
            return res.status(400).json({
                message:"product not found",
                success:false
            })
        }

        return res.status(200).json({
            product,
            success:false
        })

    } catch (error) {
        console.log(error);
    }
}



// get product by category for user(admin) or customer
export const getProductByCategory = async(req,res)=>{
    try {
        const categoryID = req.params.id;
        const products = await Product.find({productCategory:categoryID}).populate({
            path:'createdBy'
        }).sort({created_At:-1}).populate({
            path:'productCategory'
        });

        if(!products){
            return res.status(400).json({
                message:"products not found",
                success:false
            })
        }

        return res.status(200).json({
            products,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}



