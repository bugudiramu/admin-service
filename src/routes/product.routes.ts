import express from 'express';
import { routes } from './routes';
import ProductsController from '../controllers/products.controller';

const router = express.Router();

// * Create Product
router.post(routes.v1.products, ProductsController.createProduct);

// * Get All Products
router.get(routes.v1.products, ProductsController.getAllProducts);

// * Get Product by Id
router.get(routes.v1.productById, ProductsController.getProductById);

// * Update Product by Id
router.put(routes.v1.productById, ProductsController.updateProductById);

// * Deleting a Product by Id
router.delete(routes.v1.categoryById, ProductsController.deleteProductById);

export default router;
