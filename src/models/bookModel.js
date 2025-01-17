const mongoose = require("mongoose");
//const objectId = mongoose.Types.ObjectId;

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    
    ISBN: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    releasedAt: {
      type: Date,
      required: true,
        },
        coverLink: {
            type: String,
            required: true,
            trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookcover", BookSchema);
