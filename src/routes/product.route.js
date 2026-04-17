import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createProduct, getAllProducts, getProductByCategory, getProductById } from '../controllers/product.controller.js';

const router = express.Router();

router.route("/createProduct").post(isAuthenticated,createProduct);
router.route("/getAllProducts").get(isAuthenticated,getAllProducts);
router.route("/getProduct/:id").get(isAuthenticated,getProductById);
router.route("/getProductByCategory/:id").get(isAuthenticated,getProductByCategory);

export default router;