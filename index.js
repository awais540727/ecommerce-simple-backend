import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

dotenv.config();

connectDB();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Use the product routes
app.use("/api", productRoutes);
// Use Categorie routes
app.use("/api", categoriesRoutes);

app.listen(process.env.PORT || 3000, process.env.HOST, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
