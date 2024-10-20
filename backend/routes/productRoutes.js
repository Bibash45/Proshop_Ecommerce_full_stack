import express from "express";
import {
  postProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

const router = express.Router();

router.route("/").post(protect, admin, postProduct).get(getProducts);

router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(checkObjectId, getProductsById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

export default router;
