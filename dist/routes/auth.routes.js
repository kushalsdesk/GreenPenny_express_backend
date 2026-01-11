import express, { Router } from "express";
import { checkCurrentSession, handleOAuthFailure, handleOAuthSuccess, initiateOAuth, loginUser, logoutUser, signUpUser, } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/test", (req, res) => {
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
//# sourceMappingURL=auth.routes.js.map