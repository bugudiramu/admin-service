import { ICommonFields } from '../common.interface';

export interface IInputProduct extends ICommonFields {
  title: string;
  description: string;
  price: number;
  category: string;
  tags?: Array<string>;
  image?: string;
  stock: number;
  rating?: number;
}

export interface IOutputProduct extends IInputProduct, ICommonFields {
  _id: string;
}
