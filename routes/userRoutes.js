import express from "express";
import {
  deleteUserController,
  getAllUsersController,
  getSingleUserController,
  updateUserController,
  createNewUserController,
} from "../controllers/categoriesControllers.js";

const router = express.Router();

router.get("/users", getAllUsersController);

router.get("/user/:id", getSingleUserController);

router.post("/create-user", createNewUserController);

router.delete("/delete-user/:id", deleteUserController);

router.patch("/update-user/:id", updateUserController);

export default router;
