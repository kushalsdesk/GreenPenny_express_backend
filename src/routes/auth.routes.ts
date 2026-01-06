import express, { Router } from "express";
import {
  checkCurrentSession,
  handleOAuthFailure,
  handleOAuthSuccess,
  initiateOAuth,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const router: Router = express.Router();

// route for  user with Email/Password
router.post("/signup", signUpUser);
router.post("/login", loginUser);

//route for user with OAuth
router.get("/oauth", initiateOAuth);
router.get("/oauth/success", handleOAuthSuccess);
router.get("/oauth/failure", handleOAuthFailure);

//Check current session
router.get("/me", checkCurrentSession);

router.get("/logout", logoutUser);

export default router;
