import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import PostsRoutes from "./routes/PostsRoutes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use("/", categoriesRoutes);

app.use("/posts", PostsRoutes);

app.listen(PORT, () => {
  console.log("Connected");
});
