import mongoose from "mongoose";

const photoSchema = mongoose.Schema({
  photos: [
    {
      photoName: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;

// import mongoose from "mongoose";

// const photoSchema = mongoose.Schema({
//   photoName: {
//     type: String,
//     required: true,
//   },
//   url: {
//     type: String,
//     required: true,
//   },
//   productId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//   },
// });

// const Photo = mongoose.model("Photo", photoSchema);

// export default Photo;
