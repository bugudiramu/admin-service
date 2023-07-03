import { ICommonFields } from '../common.interface';

export interface IInputCategory extends ICommonFields {
  title: string;
  image?: string;
}

export interface IOutputCategory extends IInputCategory {
  _id: string;
}
