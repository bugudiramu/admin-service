import express, { Request, Response } from 'express';
import Categories from '../models/categories';
import { v4 as uuidv4 } from 'uuid';
import getCurrentTimeStamp from '../utils/currentTimeStamp';

const router = express.Router();

// * Create Category
router.post('/categories', async (req: Request, res: Response) => {
  const { title, description, image } = req.body;

  try {
    const category_id: string = uuidv4();
    const created_at: Date = getCurrentTimeStamp();

    const createCategory = new Categories({ category_id, title, description, image, created_at, isDeleted: false });
    const category: Promise<object> = await createCategory.save();

    return res.status(200).json({ success: true, message: 'Category created...', category });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Internal Server Error...' } });
  }
});

// * Get All Categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categories: Array<object> = await Categories.find({ isDeleted: false });

    return res.status(200).json({ success: true, categories });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Internal Server Error...' } });
  }
});

// * Get Category by Id
router.get('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category = await Categories.findOne({ category_id: id, isDeleted: false });

    if (!category) return res.status(404).json({ success: false, error: { message: 'Invalid id provided...' } });

    return res.status(200).json({ success: true, category });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Internal Server Error...' } });
  }
});

// * Update Category by Id
router.put('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  const updated_at: Date = getCurrentTimeStamp();
  try {
    const category = await Categories.findOne({ category_id: id, isDeleted: false });
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Invalid category id...' } });
    }

    await Categories.findOneAndUpdate({ category_id: id }, { ...updatedData, updated_at });
    const updatedCategoryData = await Categories.findOne({ category_id: id });

    return res.status(200).json({ success: true, message: 'Category updated...', category: updatedCategoryData });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Internal Server Error...' } });
  }
});

// * Deleting a Category
router.delete('/categories/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  const deleted_at: Date = getCurrentTimeStamp();
  try {
    const category = await Categories.findOne({ category_id: id, isDeleted: false });

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Invalid category id...' } });
    }

    await Categories.findOneAndUpdate({ category_id: id }, { isDeleted: true, updated_at: deleted_at, deleted_at });
    const updatedCategoryData = await Categories.findOne({ category_id: id });

    return res.status(200).json({ success: true, message: 'Category deleted...', category: updatedCategoryData });
  } catch (err) {
    return res.status(500).json({ success: false, error: { message: 'Internal Server Error...' } });
  }
});

export default router;
