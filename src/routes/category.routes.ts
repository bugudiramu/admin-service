import express from 'express';
import CategoryControllers from '../controllers/categories.controller';
import { routes } from './routes';

const router = express.Router();

router.post(routes.v1.categories, CategoryControllers.createCategory);

// * Get All Categories
router.get(routes.v1.categories, CategoryControllers.getAllCategories);

// * Get Category by Id
router.get(routes.v1.categoryById, CategoryControllers.getCategoryById);

// * Update Category by Id
router.put(routes.v1.categoryById, CategoryControllers.updateCategoryById);

// * Deleting a Category by Id
router.delete(routes.v1.categoryById, CategoryControllers.deleteCategoryById);

export default router;
