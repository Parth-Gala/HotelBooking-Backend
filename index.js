import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";
import session from "express-session";
import aiplannerRoute from "./routes/aiplanner.js";
import cors from "cors";
// import OAuth2Strategy from "passport-google-oauth2";

const app = express();
dotenv.config();
app.use(cors());

const port = process.env.PORT ;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb Disconnected!");
});

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "sfslfi982934usfs9f2okjwf",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/aiplanner", aiplannerRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage =
    err.message || "Something went wrong! Please try again later.";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  connect();
  console.log(`Connected to Server on port ${port}`);
});
