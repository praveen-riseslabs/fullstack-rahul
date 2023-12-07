const User = require("../models/Users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { failureResponse, successResponse } = require ("./utils");
const { default: mongoose } = require("mongoose");
var nodemailer = require("nodemailer");

const saltRounds = 10;

const secret = process.env.JWT_SECRET;


const createUser = async (req, res) => {
  try {
    const { fullname, username, email, phonenumber, password, confirmPassword, gender } = req.body;

    // Check if the user with the provided email exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password and confirm password do not match" });
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user using the User model
    await User.create({
      fullname,
      username,
      email,
      phonenumber,
      password: encryptedPassword,
      gender,
    });

    res.status(201).json({ status: "ok", message: "User created successfully" });

  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to create user", error });
  }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    res.json({ status: "ok", data: token });
  } catch (error) {
    res.status(500).json({ error: "Error during login", details: error.message });
  }
};
      




const changePassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: "User does not exist" });
    }

    const secret = JWT_SECRET + user.password;
    const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: "5m",
    });

    const link = `http://localhost:5000/reset-password/${user._id}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com", // Update with your Gmail email address
        pass: "your-password", // Update with your Gmail password
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ status: "Failed to send email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: "Email sent successfully", link });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error during password reset", details: error.message });
  }
};


  
module.exports = {
    login,
    createUser,
    getAllUsers,
    changePassword,
  };