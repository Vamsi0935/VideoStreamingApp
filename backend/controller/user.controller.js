const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model.js");

const registerUser = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
        note: "User with this email does not exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      "vamsikrishnad",
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
