const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();
const { check, validationResult } = require("express-validator");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Wrong eamil").isEmail(),
    check("password", "Min length 6 symbol").isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong data in register"
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "This user has been allready created" });
      }

      const hashPassword = bcrypt.hashSync(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();
      res.status(201).json({ message: "The user has been created" });
    } catch (e) {
      res.status(500).json({ message: "Something Wrong, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("eamil", "Enter Right Email").normalizeEmail().isEmail(),
    check("password", "Enter a password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Wrong data in login"
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "No user find!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Wrong password, Try again" });
      }
      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });
      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something Wrong, try again" });
    }
  }
);

module.exports = router;
