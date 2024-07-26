const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const z = require("zod");
const { User } = require("../db");
const { verifyToken } = require("../middleware");

const UpdateSchema = z.object({
  firstname: z.string().min(2).max(30).optional(),
  lastname: z.string().min(2).max(30).optional(),
  password: z.string().min(6).optional(),
});

router.put("/update", verifyToken, async (req, res) => {
  try {
    const validationResult = await UpdateSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid user data",
        errors: validationResult.error.errors,
      });
    }

    let updateData = validationResult.data;
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const user = await User.findOneAndUpdate({ _id: req.userId }, updateData, {
      new: true,
      runValidators: true,
    }).select("-password"); // Excluding password from the returned user object

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: user,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res
        .status(400)
        .json({ message: "Invalid user data", errors: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Update failed" });
    }
  }
});

router.get("/bulk", verifyToken, async (req, res) => {
  try {
    const name = req.query.filter || "";
    const users = await User.find({
      username: {$regex:name, $options: "i"}
    });
    res.status(200).json({
      message: "Users fetched successfully",
      users: users.map((user) => ({
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "bulk fetch failed" });
  }
});
module.exports = router;
