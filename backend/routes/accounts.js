const express = require("express");
const router = express.Router();
const { Account } = require("../db");
const { verifyToken } = require("../middleware");
const mongoose = require("mongoose");

router.get("/balance", verifyToken, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }
  res.json({
    message: "Account balance fetched successfully",
    balance: account.balance,
  });
});

router.post("/transfer", verifyToken, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  let { amount, to } = req.body;
  let myAmount = parseInt(amount);

  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );

  if (!account || account.balance < myAmount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -myAmount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: myAmount } }
  ).session(session);

  await session.commitTransaction();
  res.json({
    success:true,
    message: "Transfer successful",
    receiver: toAccount.username,
  });
});
module.exports = router;
