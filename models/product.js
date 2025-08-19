import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Where is the description"],
  },
  price: {
    type: Number,
    min: [5, "Minimum value should be grater than 5"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category", // optional reverse link
  },
  rating: Object,
});
const Product = mongoose.model("Product", productSchema);

export default Product;
