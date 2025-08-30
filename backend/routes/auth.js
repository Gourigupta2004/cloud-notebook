// all necessary imports
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

// Use env secret in prod, fallback to your current string
const JWT_SECRET = process.env.JWT_SECRET || "Harryisagoodb$oy";

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;

    // Validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // Check existing user
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry a user with this email already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // Payload & token
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;
      return res.status(201).json({ success, authToken });
    } catch (error) {
      // Duplicate email race-condition (unique index) or other DB errors
      if (error?.code === 11000) {
        return res
          .status(400)
          .json({ success: false, error: "Email already registered" });
      }
      console.error("POST /api/auth/createuser error:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
        stack: error?.stack,
      });
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct credentials" });
      }

      const payload = { user: { id: user.id } };
      const authToken = jwt.sign(payload, JWT_SECRET);

      success = true;
      return res.json({ success, authToken });
    } catch (error) {
      console.error("POST /api/auth/login error:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
        stack: error?.stack,
      });
      return res
        .status(500)
        .json({ success: false, error: "Internal server error" });
    }
  }
);

// Route 3: Get logged-in user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    return res.json(user);
  } catch (error) {
    console.error("POST /api/auth/getuser error:", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
    });
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
