import { Request, Response } from 'express';
import { IInputCategory, IOutputCategory } from '../types/categories/categories.interface';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';
import CategoryService from '../services/category.service';
import isValidaInput from '../utils/isValidInput.utils';

const createCategory = async (req: Request, res: Response) => {
  const { title, image } = req.body;

  if (!isValidaInput(title) || !isValidaInput(image)) return res.status(400).json({ success: false, error: { message: 'Invalid input...' } });

  try {
    const category: IOutputCategory = await CategoryService.createCategory({ title, image });

    return res.status(201).json({ success: true, message: 'Category created...', category });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories: Array<IOutputCategory> = await CategoryService.getCategories();

    return res.status(200).json({ success: true, categories });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!isValidaInput(id)) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category: IOutputCategory = await CategoryService.categoryById({ id });

    return res.status(200).json({ success: true, category });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
};

const updateCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category = await CategoryService.categoryById({ id });
    const updatedAt: string = getCurrentTimeStamp();
    const dataToUpdate: IInputCategory = {
      ...body,
      updatedAt,
    };

    const updatedCategory = await CategoryService.updateCategoryById({ _id: id }, dataToUpdate);
    if (updatedCategory) {
      return res.status(200).json({ success: true, message: 'Category updated...' });
    }
    throw new Error('Something went wrong...');
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
};

const deleteCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  try {
    const deletedCategory = await CategoryService.deleteCategory(id);

    if (deletedCategory) {
      return res.status(200).json({ success: true, message: 'Category deleted...' });
    }
    throw new Error('Something went wrong...');
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err.message } });
  }
};

export default { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById };
