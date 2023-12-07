const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const {
  login,
  changePassword,
  createUser,
  getAllUsers,
} = require("../controllers/userController");
const authenticate = require("../middleware/auth");

// login
router.post("/login", login);
router.post("/register", createUser);
router.get("/", authenticate, getAllUsers);
router.post("/change", authenticate, changePassword);

// verify user
router.get("/verify", authenticate, (req, res) => {
  res.status(200).json({ success: true, message: "verified", user: req.user });
});

module.exports = router;
