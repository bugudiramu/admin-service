import { Request, Response } from 'express';
import Products from '../models/products.schema';
import { IInputProduct, IOutputProduct } from '../types/products/products.interface';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';

const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, category, image, inStock } = req.body;

  try {
    const createdAt: string = getCurrentTimeStamp();

    const inputBody: IInputProduct = {
      title,
      description,
      price,
      category,
      image,
      inStock,
      createdAt,
      isDeleted: false,
    };

    const createProduct = new Products(inputBody);
    const product: IOutputProduct = await createProduct.save();

    return res.status(201).json({ success: true, message: 'Product created...', product });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Array<IOutputProduct> = await Products.find();

    return res.status(200).json({ success: true, products });
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const product: IOutputProduct = await Products.findById(id);

    if (!product) return res.status(404).json({ success: false, error: { message: 'Invalid id provided...' } });

    return res.status(200).json({ success: true, product });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...', err } });
  }
};
const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const product = await Products.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Invalid product id...' } });
    }

    const updatedAt: string = getCurrentTimeStamp();
    const dataToUpdate: IInputProduct = {
      ...body,
      updatedAt,
    };

    Products.findOneAndUpdate({ _id: id }, dataToUpdate)
      .then((result: any) => res.status(200).json({ success: true, message: 'Product updated...' }))
      .catch((err: any) => res.status(404).json({ success: false, message: err.message }));
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' }, err });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  try {
    const product: IOutputProduct = await Products.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Invalid category id...' } });
    }

    Products.findByIdAndDelete(id)
      .then((result: any) => res.status(200).json({ success: true, message: 'Product deleted...' }))
      .catch((err: any) => res.status(404).json({ success: false, message: err.message }));
  } catch (err) {
    return res.status(400).json({ success: false, error: { message: 'Something went wrong...' } });
  }
};

export default { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById };
