import helmet from "helmet";
import cors from "cors";
import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
