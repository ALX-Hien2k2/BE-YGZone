const express = require("express");
const userRouter = require("./userRoute");
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);

module.exports = rootRouter;