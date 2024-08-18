import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Connected");
});
