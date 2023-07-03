import Categories from '../models/categories.schema';
import { IInputCategory, IOutputCategory } from '../types/categories/categories.interface';
import convertToLowerCase from '../utils/convertToLowerCase.utils';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';

const findCategoryByTitle = async (query: any) => {
  const { title } = query;
  const convertedTitle = convertToLowerCase(title as string);
  try {
    const category = await Categories.findOne({ title: convertedTitle });

    return category;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const createCategory = async (payload: any) => {
  const { title, image } = payload;
  try {
    console.log('category service');
    const categoryByTitle = await findCategoryByTitle({ title });

    if (categoryByTitle) throw new Error('Category with current name already exists...');

    const convertedTitle = convertToLowerCase(title as string);
    const createdAt: string = getCurrentTimeStamp();
    const inputBody: IInputCategory = {
      title: convertedTitle,
      image,
      createdAt,
      isDeleted: false,
    };

    const createNewCategory = new Categories(inputBody);
    const category: IOutputCategory = await createNewCategory.save();
    return category;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const getCategories = async () => {
  try {
    const categories: Array<IOutputCategory> = await Categories.find();
    return categories;
  } catch {
    throw new Error('Error while getting categories');
  }
};

const categoryById = async (payload: any) => {
  try {
    const category: IOutputCategory = await Categories.findById(payload.id);
    if (!category) throw new Error('Invalid category id provided...');
    return category;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const updateCategoryById = async (query: any, payload: any) => {
  const { _id } = query;

  try {
    await categoryById({ id: _id });

    const updatedCategory = await Categories.findOneAndUpdate(query, payload);
    if (!updatedCategory) throw new Error('Error in updating category, check your payload...');
    return updatedCategory;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const deleteCategory = async (id: string) => {
  try {
    await categoryById({ id });

    const deletedCategory = await Categories.findByIdAndDelete(id);
    if (!deletedCategory) throw new Error('Error in deleting category, check your payload...');
    return deletedCategory;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export default { findCategoryByTitle, createCategory, getCategories, categoryById, updateCategoryById, deleteCategory };
