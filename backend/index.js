import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import PostsRoutes from "./routes/PostsRoutes.js";
import multer from "multer";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  // console.log(file);
  res.status(200).json(file.filename);
});

app.use("/auth", authRoutes);

app.use("/", categoriesRoutes);

app.use("/posts", PostsRoutes);

app.listen(PORT, () => {
  console.log(`Connected at ${PORT}`);
});
