// index.js
const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 5000;
app.use(express.json());

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/v1", mainRouter);
