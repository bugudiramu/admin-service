import { BaseSchema } from './base.schema';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    ...BaseSchema.obj,
  },

  { timestamps: false, versionKey: false }
);

const Categories = mongoose.model('Categories', CategoriesSchema);

export default Categories;
