import { db } from "../db.js";

export const write = (req, res) => {
  // console.log("backend: ", req.body);
  const { title, userId, body, created_at, img } = req.body.formData;
  const categoriesId = req.body.categoriesId;

  const postQuery =
    "INSERT INTO posts (user_id, title, body, created_at, image) VALUES(?, ?, ?, ?, ?)";
  const postValues = [userId, title, body, created_at, img];
  // console.log("New: ", created_at);
  db.beginTransaction((err) => {
    if (err) return res.status(500).json("Failed to start transaction");

    db.query(postQuery, postValues, (err, postResult, fields) => {
      if (err) {
        db.rollback(() => {
          return res.status(500).json("Failed to insert post");
        });
        return;
      }
      // console.log("backend: ", postResult);
      const postId = postResult.insertId;

      const categoryQuery =
        "INSERT INTO posts_categories (post_id, category_id) VALUES (?)";
      const categoryValues = categoriesId.map((categoryId) => [
        postId,
        categoryId,
      ]);

      // console.log("Category values to insert:", categoryValues);

      db.query(categoryQuery, categoryValues, (err, categoryResult, fields) => {
        if (err) {
          db.rollback(() => {
            // console.error(
            //   "Error inserting posts_categories:",
            //   err
            //   // categoryResult
            // );
            return res.status(500).json("Failed to insert posts_categories");
          });
          return;
        }

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              return res.status(500).json("Failed to commit transaction");
            });
            return;
          }

          return res.status(200).json("Post created successfully");
        });
      });
    });
  });
};
