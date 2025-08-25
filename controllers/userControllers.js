import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createNewUserController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, Please Sign In" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const user = new User(newUser);
    await user.save();
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    res.status(400).json({ message: "Error creating user" });
  }
};

export const signInUserController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ messages: "Email or password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No User found, Please Sign Up" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    let jwtOptions = {
      expiresIn: "1h",
      jwtid: "123456",
      issuer: "json",
    };

    let tempUser = {};
    tempUser.name = user.name;
    tempUser.email = user.email;
    let userToken = jwt.sign(
      { id: user._id },
      process.env.jwtSecret,
      jwtOptions
    );
    return res.status(200).json({
      message: "User signed in successfully",
      user: tempUser,
      token: userToken,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error signing in user", error: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    } else {
      return res
        .status(200)
        .json({ message: "User Deleted Successfully", user });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while deleting the user", error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updateUserDetails = { ...req.body };
  const { password } = updateUserDetails;
  // console.log(password);
  // console.log({ ...updateUserDetails, password: "mypass" });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // console.log(hashPassword);
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      { ...updateUserDetails, password: hashPassword },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({ message: "Update Failed" });
    }
    let userDetails = {};
    (userDetails._id = updateUser._id),
      (userDetails.name = updateUser.name),
      (userDetails.email = updateUser.email);
    // userDetails.password = updateUser.password;
    return res
      .status(200)
      .json({ message: "Update Successfully", data: userDetails });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Error while updating the user", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { email, password, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User Not Found");
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json("Unauthorized user e.g Token is Missing");
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.jwtSecret, async (error, response) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Invalid Token", error: error.message });
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashPassword;
      await user.save();
      return res.status(200).json({ message: "Password Changed" });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while changing password",
      error: error.message,
    });
  }
};
