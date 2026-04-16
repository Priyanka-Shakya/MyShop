import express from 'express';
import { createCategory } from '../controllers/category.controller.js';
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/createCategory").post(isAuthenticated,createCategory);



export default router;