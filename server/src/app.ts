import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRouter } from "./routes/user.routes";
import { authRouter } from "./routes/auth.routes";
import { authenticateToken } from "./middlewares/auth";

const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://127.0.0.1:4200",
      "http://localhost:8090",
      "http://127.0.0.1:8090",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  const paths = ["/health", "/api/auth/login", "/api/auth/signup"];
  if (paths.includes(req.path)) {
    return next();
  }

  authenticateToken(req, res, next);
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).send('OK')
  return;
});
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
