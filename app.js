const express = require("express");
const globalErrorController = require("./controllers/globalErrorController");
const AppError = require("./utils/appError");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use((req,res,next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
//   next();
// })

const covidRoutes = require("./routers/covidRouter");

app.use("/api/v1", covidRoutes);

// app.use("/", (req, res, next) => {
//   res.status(200).json({ data: "success" });
// });
app.use("*", (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl}`));
});

app.use(globalErrorController);
module.exports = app;
