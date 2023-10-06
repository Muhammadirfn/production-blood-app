const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const registerController = async (req, res) => {
  try {
    // Check if a user with the same email and role already exists.
    const existingUser = await userModel.findOne({ email: req.body.email, role: req.body.role });
    if (existingUser) {
      return res.status(200).send({ message: 'User Already Available' });
    }

    // Hash the user's password before saving it.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    // Create and save the user.
    const user = new userModel(req.body);
    await user.save();

    return res.status(201).send({
      success: true,
      message: 'User Registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'There is an error during registration',
    });
  }
};


const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      });
    }
   //check role
   if (user.role !== req.body.role) {
    return res.status(500).send({
      success: false,
      message: "role dosent match",
    });
  }
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: 'Invalid Credentials'
      });
    }

    // Generate a JWT token and send it along with the user data.
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).send({
      success: true,
      message: 'Login successful',
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Login API error'
    });
  }
};
//GET CURRENT USER
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = {registerController, loginController,currentUserController}