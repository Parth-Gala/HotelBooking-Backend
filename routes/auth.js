import express from "express";
import { register, login } from "../controllers/auth.js";
import passport from "../utils/passport.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { 
    failureRedirect: "/login", 
    successRedirect: "http://localhost:3001/",
}),);

export default router;