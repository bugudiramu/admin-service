import { BaseSchema } from './base.schema';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    inStock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
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

const Products = mongoose.model('Products', ProductsSchema);

export default Products;
