import { db } from "../db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ? or username = ?";
  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exist!");
    if (req.body.username === "admin" || req.body.email === "admin@mail.com")
      return res.status(409).json("User already exist!");

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`email`, `username`, `password`) VALUES (?)";

    const values = [req.body.email, req.body.username, hash];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(`User ${req.body.username} created`);
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json("Information not found!");
    const isPasswordCorrect = bcryptjs.compare(
      req.body.password,
      data[0].password
    );
    // console.log(req.body.password, data[0].password);
    if (!isPasswordCorrect)
      return res.status(400).json("Incorrect authentication information");
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);
    const { password, ...other } = data[0];
    res
      .cookie("access_cookie", token, { httpOnly: true })
      .status(200)
      .json(other);
  });
};
