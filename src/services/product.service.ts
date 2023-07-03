import Products from '../models/products.schema';
import { IOutputProduct } from '../types/products/products.interface';

const createProduct = async (payload: any) => {
  if (!payload) throw new Error('Invalid input...');

  try {
    const createNewProduct = new Products(payload);
    const product: IOutputProduct = await createNewProduct.save();
    return product;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const allProducts = async () => {
  try {
    const allProducts: Array<IOutputProduct> = await Products.find();
    return allProducts;
  } catch (err: any) {
    throw new Error('Error while fetching products...');
  }
};

const productById = async (id: string) => {
  try {
    const product: IOutputProduct = await Products.findById(id);
    if (!product) throw new Error('Invalid product ID...');
    return product;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const updateById = async (id: string, payload: any): Promise<any> => {
  try {
    await productById(id);
    const updatedData = await Products.findOneAndUpdate({ _id: id }, payload, { new: true });
    return updatedData;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};

const deleteById = async (id: string) => {
  try {
    await productById(id);
    const deletedProduct = await Products.findByIdAndDelete(id);
    return deletedProduct;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
export default { createProduct, allProducts, productById, updateById, deleteById };
