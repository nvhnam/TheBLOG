import { db } from "../db.js";

export const getCategories = (req, res) => {
  const q = "SELECT * FROM categories";

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    // console.log("backend: ", data);
    return res.status(200).json(data);
  });
};
