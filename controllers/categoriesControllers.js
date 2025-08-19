import slugify from "slugify";
import Category from "../models/categoryModel.js";

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json("Categories not Found");
    }
    if (categories.length == 0) {
      return res.status(200).json("No Categories Found");
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};

const getSingleCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).json("Something went wrong");
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};

const getSingleCategoryBySlugController = async (req, res) => {
  try {
    // const { title } = req.params;
    const { title } = req.query;
    if (!title) {
      return res.status(404).json("Something went wrong");
    }

    const slug = slugify(title, {
      lower: true,
      replacement: "-",
      strict: true,
    });

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json("Something went wrong");
    }
    res.status(200).json({ message: "Category Found", data: category });
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};

const postNewCategoryController = async (req, res) => {
  try {
    const categoryDatails = req.body;
    // console.log(categoryDatails);
    const category = new Category(categoryDatails);
    await category.save();
    res.status(201).json({ message: "Category Created", data: category });
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};
const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deleteCategory = await Category.findByIdAndDelete({ _id: id });
    if (!deleteCategory) {
      return res.status(404).json("Category not found");
    }
    res.status(200).json({ message: "Category Deleted", data: deleteCategory });
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = { ...req.body };

    // If title is provided, update it and regenerate slug
    if (updateData.title) {
      // updateData.title = title;
      updateData.slug = slugify(updateData.title, {
        lower: true,
        strict: true,
        replacement: "-",
      });
    }
    // console.log(categoryDatails.title.toUpperCase());
    const checkSameCategory = await Category.findOne({ _id: id });
    // console.log(checkSameCategory.title);
    if (updateData.title.toUpperCase() == checkSameCategory.title) {
      return res.status(404).json({
        message: "Category must be diffirent",
        data: checkSameCategory,
      });
    } else {
      const updateCategory = await Category.findByIdAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Category Updated", data: updateCategory });
    }
  } catch (error) {
    res.status(500).json({ message: "Someting wrong", err: error.message });
  }
};

export {
  getAllCategoriesController,
  getSingleCategoryController,
  deleteCategoryController,
  updateCategoryController,
  postNewCategoryController,
  getSingleCategoryBySlugController,
};
