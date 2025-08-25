import mongoose from "mongoose";

const photoSchema = mongoose.Schema({
  photoName: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const SinglePhoto = mongoose.model("SinglePhoto", photoSchema);

export default SinglePhoto;
