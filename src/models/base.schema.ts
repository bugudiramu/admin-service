const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const BaseSchema = new Schema({
  createdAt: {
    type: Date,
    required: false,
  },
  updatedAt: {
    type: Date,
    required: false,
  },
  deletedAt: {
    type: Date,
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
  },
  updatedBy: {
    type: String,
    required: false,
  },
  deletedBy: {
    type: String,
    required: false,
  },
});
