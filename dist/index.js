import express, {} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import { Account } from "node-appwrite";
import { adminClient } from "./libs/appwrite.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
const startServer = async () => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`);
    });
};
//Health Route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is Up and Running" });
});
app.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;
    const account = new Account(adminClient);
    try {
        const session = await account.createEmailPasswordSession({
            email,
            password,
        });
        res.cookie(`a_session${process.env.EXPRESS_APPWRITE_PROJECT_KEY}`, session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(session.expire),
            path: "/",
        });
        res
            .status(200)
            .json({ success: true, message: "Auth with Email-Password is done" });
    }
    catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});
startServer();
//# sourceMappingURL=index.js.map