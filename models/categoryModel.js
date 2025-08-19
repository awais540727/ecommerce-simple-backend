import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      replacement: "-",
    });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;

// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );
// const Category = mongoose.model("Category", categorySchema);

// export default Category;
