import helmet from "helmet";
import cors from "cors";
import express from "express";
import "dotenv/config";

import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { formRouter } from "./routes/formRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const isProd = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(
  cors({
    origin: isProd ? [process.env.FRONTEND_URL || ""] : "*",
    methods: ["GET", "POST", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  }),
);

app.use("/api/forms", formRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
