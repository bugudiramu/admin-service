import Categories from '../models/categories.schema';
import { IInputCategory, IOutputCategory } from '../types/categories/categories.interface';

const findCategoryByTitle = async (query: any, payload: any) => {
  try {
    const category = await Categories.findOne(query);
    return category;
  } catch {
    throw Error('Error while getting category');
  }
};

const createCategory = async (query: any, payload: IInputCategory) => {
  try {
    const createCategory = new Categories(payload);
    const category: IOutputCategory = await createCategory.save();
    return category;
  } catch {
    throw Error('Error while creating category');
  }
};

const getCategories = async () => {
  try {
    const categories: Array<IOutputCategory> = await Categories.find();
    return categories;
  } catch {
    throw Error('Error while getting categories');
  }
};

const categoryById = async (query: any, payload: any) => {
  try {
    const category: IOutputCategory = await Categories.findById(payload.id);
    return category;
  } catch {
    throw Error('Error while getting categories');
  }
};

export default { findCategoryByTitle, createCategory, getCategories, categoryById };
