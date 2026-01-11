import express, { Router } from "express";
import type { Response, Request } from "express";
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

router.get("/test", (req: Request, res: Response) => {
  res.json({ success: true, message: "Auth routes loaded successfully" });
});

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/oauth", initiateOAuth);
router.get("/oauth/success", handleOAuthSuccess);
router.get("/oauth/failure", handleOAuthFailure);
router.get("/user", checkCurrentSession);
router.get("/logout", logoutUser);

export default router;
