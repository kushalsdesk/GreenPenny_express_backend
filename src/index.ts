import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT! || 8080;

app.use(compression());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

//Health Route
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is Up and Running" });
});

//routes
app.use("/api/v1", authRoutes);

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
};

startServer();
