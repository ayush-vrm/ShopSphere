import express from 'express'
import {
    createProductController,
    getProductsController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController,
    productFilterController,
    productCountController,
    productListController,
    searchProductController,
    categoryProductController,
    paymentController,
} from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'

const router = express.Router()

// Create Products
router.post("/create-product", requireSignIn, isAdmin, formidable(), createProductController)

// Update Products
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );

// Get all products  
router.get("/get-products", getProductsController)


// Get a single Product
router.get("/get-product/:slug", getSingleProductController)

// Get Photo
router.get("/product-photo/:pid", productPhotoController)

// Delete Product
router.delete("/delete-product/:pid",deleteProductController)

// Filter Products
router.post('/filter-product',productFilterController)

// Count Products
router.get('/total-count',productCountController)

// ProductList
router.get('/product-list/:page',productListController)

// Search Products
router.get('/search/:keyword',searchProductController)

// Products Based On Category
router.get('/category-product/:slug',categoryProductController)

// Patment Routes
router.post('/payments',requireSignIn,paymentController)

export default router