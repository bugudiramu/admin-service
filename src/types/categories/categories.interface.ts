export interface IInputCategory {
  title: string;
  image?: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deltedBy?: string;
}

export interface IOutputCategory extends IInputCategory {
  _id: string;
}
