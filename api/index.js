import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected!!!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.listen(3000, () => {
  console.log("server is running on port 3000!!!");
});

// 定义局部(路径)中间件(middleware),即用户访问这个路径时才会触发的middleware操作(在response回给用户之前的任何操作都属于middleware操作)

app.use("/api/auth", authRouter);

// 错误处理中间件,无论访问哪个路径出现错误时,只要那里调用了带有err 的 next函数,该函数就会
//带着err参数来到这里,由这里对err 进行处理.

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
