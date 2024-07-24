const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../db");

const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const signupSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email().optional(),
  number: z.string().min(10).max(10),
  password: z.string().min(6),
  firstname: z.string().min(2).max(20),
  lastname: z.string().min(2).max(20),
});
router.post("/signup", async (req, res) => {
  try {
    const validatedData = await signupSchema.parseAsync(req.body);
    const existingUser = await User.findOne({
      $or: [
        { username: validatedData.username },
        { email: validatedData.email },
        { number: validatedData.number },
      ],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedData.password, salt);

    const newUser = new User({
      ...validatedData,
      password: hashedPassword,
    });

    await newUser.save();

    const newAccount = new Account({
      balance: Math.floor(1 + Math.random() * 10000),
      userId: newUser._id,
    });

    await newAccount.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid user data", errors: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
});

const loginSchema = z.object({
  number: z.string().min(10).max(10).optional(),
  username: z.string().min(2).max(30),
  password: z.string().min(6),
});
router.post("/login", async (req, res) => {
  try {
    const validatedData = await loginSchema.parseAsync(req.body);
    const user = await User.findOne({
      $or: [
        { username: validatedData.username },
        { number: validatedData.number },
      ],
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(validatedData.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "10d",
    });
    res.status(200).json({
      message: "Login successful",
      token: token,
      userId: user._id,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid user data", errors: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
});

module.exports = router;
