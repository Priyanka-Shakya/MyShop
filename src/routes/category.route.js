import express from 'express';
import { createCategory, getAllCategories, getCategoryById } from '../controllers/category.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/createCategory").post(isAuthenticated,createCategory);
router.route("/getAllCategories").get(isAuthenticated,getAllCategories);
router.route("/getCategory/:id").get(isAuthenticated,getCategoryById);


export default router;