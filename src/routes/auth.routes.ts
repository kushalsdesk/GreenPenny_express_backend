import express, { type Router } from "express";
import { loginUser, signUpUser } from "../controllers/auth.controller.js";

const router: Router = express.Router();

// route for creating user with Email/Password
router.post("/signup", signUpUser);
//route for login user with Email/Password
router.post("/login", loginUser);

export default router;
