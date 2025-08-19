import Product from "../models/product.js";

const getProductControllers = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "No Products Found" });
  }
};

const getSingleProduct = async (req, res) => {
  const _id = req.params.id;
  // console.log(_id);
  try {
    // const product = await Product.findOne({ id: parseInt(id) });
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const deleteSingleProduct = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const singleDelete = await Product.findByIdAndDelete({ _id: id });
    if (!singleDelete) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(singleDelete);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const postSingleProduct = async (req, res) => {
  const productDetails = req.body;
  // console.log(productDetails);
  try {
    const singleProduct = new Product(productDetails);
    await singleProduct.save();
    res.status(201).json({ message: "Product Created", data: singleProduct });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const productDetails = req.body;
  console.log(id);
  console.log(productDetails);
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      { _id: id },
      productDetails,
      { new: true }
    );
    if (!updateProduct) {
      return res.status(404).json("Something went wrong");
    }
    res.status(200).json({ message: "Product Updated", data: updateProduct });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export {
  updateProduct,
  getProductControllers,
  getSingleProduct,
  deleteSingleProduct,
  postSingleProduct,
};
