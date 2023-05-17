interface ICommonFields {
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deltedBy?: string;
}

export interface IInputCategory extends ICommonFields {
  title: string;
  image?: string;
}

export interface IOutputCategory extends IInputCategory {
  _id: string;
}
