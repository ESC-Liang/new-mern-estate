import  Express  from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () =>{console.log("Connected!!!");
}).
catch((err) => {console.log(err);})
;


const app= Express();
app.listen(3000, () => {
    console.log("server is running on port 3000!!!");
});

app.use("api/user", userRouter);