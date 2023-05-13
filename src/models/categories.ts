const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    category_id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      required: false,
    },
    updated_at: {
      type: Date,
      required: false,
    },
    deleted_at: {
      type: Date,
      required: false,
    },
    created_by: {
      type: String,
      required: false,
    },
    updated_by: {
      type: String,
      required: false,
    },
    deleted_by: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

const Categories = mongoose.model('Categories', categoriesSchema);

export default Categories;
