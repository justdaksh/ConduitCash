const express = require("express");
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const accountRouter = require('./accounts');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router;