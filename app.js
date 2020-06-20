const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

// app.use("/", (req, res, next) => {
//   res.status(200).json({ data: "success" });
// });
app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);
module.exports = app;
