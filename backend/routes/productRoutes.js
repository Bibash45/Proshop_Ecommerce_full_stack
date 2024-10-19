import express from "express";
import {
  postProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, admin, postProduct).get(getProducts);

router
  .route("/:id")
  .get(getProductsById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
