import express from "express";
import {
  deleteUserController,
  signInUserController,
  getAllUsersController,
  updateUserController,
  createNewUserController,
  changePassword,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/users", getAllUsersController);

// router.get("/user/:id", getSingleUserController);

router.post("/create-user", createNewUserController);

router.post("/sign-in", signInUserController);

router.post("/change-password", changePassword);

router.delete("/delete-user/:id", deleteUserController);

router.patch("/update-user/:id", updateUserController);

export default router;
