import { Request, Response } from 'express';
import Categories from '../models/categories.schema';
import { IInputCategory, IOutputCategory } from '../types/categories/categories.interface';
import convertToLowerCase from '../utils/convertToLowerCase';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';
import CategoryService from '../services/category.service';

const createCategory = async (req: Request, res: Response) => {
  const { title, image } = req.body;

  try {
    const convertedTitle = convertToLowerCase(title as string);
    const checkIsCategoryExistis = await CategoryService.findCategoryByTitle({ title: convertedTitle }, {});
    if (checkIsCategoryExistis) return res.status(409).json({ success: false, error: { message: 'Category with current name already exists...' } });

    const createdAt: string = getCurrentTimeStamp();

    const inputBody: IInputCategory = {
      title: convertedTitle,
      image,
      createdAt,
      isDeleted: false,
    };

    const category: IOutputCategory = await CategoryService.createCategory({}, inputBody);

    return res.status(201).json({ success: true, message: 'Category created...', category });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories: Array<IOutputCategory> = await CategoryService.getCategories();

    return res.status(200).json({ success: true, categories });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const category: IOutputCategory = await CategoryService.categoryById({}, { id });

    if (!category) return res.status(404).json({ success: false, error: { message: 'Invalid id provided...' } });

    return res.status(200).json({ success: true, category });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...', err } });
  }
};

const updateCategoryById = async (req: Request, res: Response) => {
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
};

const deleteCategoryById = async (req: Request, res: Response) => {
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
};

export default { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById };
