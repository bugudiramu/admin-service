import express, { Request, Response, NextFunction } from 'express';
import Categories from '../models/categories.schema';
import { routes } from './routes';
import { IInputCategory, IOutputCategory } from '../types/categories/categories.interface';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.utils';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';

const router = express.Router();

// * Create Category
router.post(routes.v1.categories, async (req: Request, res: Response) => {
  const { title, image } = req.body;

  try {
    const convertedTitle = capitalizeFirstLetter(title as string);
    const checkIsCategoryExistis = await Categories.findOne({ title: convertedTitle });
    if (checkIsCategoryExistis) return res.status(409).json({ success: false, error: { message: 'Category with current name already exists...' } });

    const createdAt: string = getCurrentTimeStamp();

    const inputBody: IInputCategory = {
      title: convertedTitle,
      image,
      createdAt,
      isDeleted: false,
    };

    const createCategory = new Categories(inputBody);
    const category: IOutputCategory = await createCategory.save();

    return res.status(201).json({ success: true, message: 'Category created...', category });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
});

// * Get All Categories
router.get(routes.v1.categories, async (req: Request, res: Response) => {
  try {
    const categories: Array<IOutputCategory> = await Categories.find();

    return res.status(200).json({ success: true, categories });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
});

// * Get Category by Id
router.get(routes.v1.categoryById, async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category: IOutputCategory = await Categories.findById(id);

    if (!category) return res.status(404).json({ success: false, error: { message: 'Invalid id provided...' } });

    return res.status(200).json({ success: true, category });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...', err } });
  }
});

// * Update Category by Id
router.put(routes.v1.categoryById, async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category = await Categories.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Invalid category id...' } });
    }

    const updatedAt: string = getCurrentTimeStamp();
    const dataToUpdate: IInputCategory = {
      ...body,
      updatedAt,
    };

    Categories.findOneAndUpdate({ _id: id }, dataToUpdate)
      .then((result: any) => res.status(200).json({ success: true, message: 'Category updated...' }))
      .catch((err: any) => res.status(404).json({ success: false, message: err.message }));
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' }, err });
  }
});

// * Deleting a Category by Id
router.delete(routes.v1.categoryById, async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  try {
    const category: IOutputCategory = await Categories.findById(id);

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Invalid category id...' } });
    }

    Categories.findByIdAndDelete(id)
      .then((result: any) => res.status(200).json({ success: true, message: 'Category deleted...' }))
      .catch((err: any) => res.status(404).json({ success: false, message: err.message }));
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
});

export default router;
