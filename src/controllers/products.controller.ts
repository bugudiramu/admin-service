import { Request, Response } from 'express';
import Products from '../models/products.schema';
import { IInputProduct, IOutputProduct } from '../types/products/products.interface';
import getCurrentTimeStamp from '../utils/currentTimeStamp.utils';
import ProductService from '../services/product.service';

const createProduct = async (req: Request, res: Response) => {
  const { title, description, price, category, image, tags } = req.body;

  try {
    const createdAt: string = getCurrentTimeStamp();

    const inputBody: IInputProduct = {
      title,
      description,
      price,
      category,
      image,
      stock: 1,
      createdAt,
      tags,
      isDeleted: false,
    };

    const product = await ProductService.createProduct(inputBody);

    return res.status(201).json({ success: true, message: 'Product created...', product });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err?.message } });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Array<IOutputProduct> = await ProductService.allProducts();

    return res.status(200).json({ success: true, products });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err?.message } });
  }
};

const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const product: IOutputProduct = await ProductService.productById(id);
    return res.status(200).json({ success: true, product });
  } catch (err: any) {
    return res.status(400).json({ success: false, error: { message: err?.message } });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }

  try {
    const updatedAt: string = getCurrentTimeStamp();
    const dataToUpdate: IInputProduct = {
      ...body,
      updatedAt,
    };
    const data = await ProductService.updateById(id, dataToUpdate);
    res.status(200).json({ success: true, message: 'Product updated...', data });
  } catch (err: any) {
    return res.status(404).json({ success: false, error: { message: err?.message } });
  }
};

const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ success: false, error: { message: 'ID not provided...' } });
  }
  try {
    const data = await ProductService.deleteById(id);
    res.status(200).json({ success: true, message: 'Product deleted...', data });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: { message: err?.message } });
  }
};

export default { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById };
