const db = require("../Config/db");

const blogsController = {
  getAll: async (req, res) => {
    const query = `
      SELECT blogs.*, categories.title AS categoryName 
      FROM blogs 
      LEFT JOIN categories ON blogs.categoryId = categories.id
    `;

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res.status(200).send(result);
    });
  },

  getOne: async (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT blogs.*, categories.title AS categoryName 
      FROM blogs 
      LEFT JOIN categories ON blogs.categoryId = categories.id
      WHERE blogs.id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send({ error: err.message });

      if (results.length === 0) {
        return res.status(404).send({ message: "Blog not found" });
      }

      return res.status(200).send(results[0]);
    });
  },

  post: async (req, res) => {
    const { title, content, createDate, likes, categoryId , cover } = req.body;
    const values = [title, content, createDate, likes, categoryId ,cover];

    const query =
      "INSERT INTO blogs (title, content, createDate, likes, categoryId , cover) VALUES (?, ?, ?, ?, ? , ?)";

    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res.status(200).send({
        message: "Successfully added!",
        blogId: results.insertId,
      });
    });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM blogs WHERE id=?";

    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send({ message: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Blog not found" });
      }

      return res.status(200).send({
        message: `Successfully deleted blog with ID ${id}`,
      });
    });
  },

  patch: async (req, res) => {
    const id = req.params.id;
    const { title, content, createDate, likes, categoryId , cover } = req.body;

    if (!title && !content && !createDate && !likes && !categoryId)
      return res.status(400).send("At least one field is required");

    const updates = [];
    const values = [];

    if (title) {
      updates.push("title = ?");
      values.push(title);
    }
    if (content) {
      updates.push("content = ?");
      values.push(content);
    }
    if (createDate) {
      updates.push("createDate = ?");
      values.push(createDate);
    }
    if (likes) {
      updates.push("likes = ?");
      values.push(likes);
    }
    if (categoryId) {
      updates.push("categoryId = ?");
      values.push(categoryId);
    }
    if (cover) {
      updates.push("cover = ?");
      values.push(cover);
    }

    values.push(id);

    const query = `UPDATE blogs SET ${updates.join(", ")} WHERE id = ?`;

    db.query(query, values, (err, results) => {
      if (err) return res.status(500).send({ error: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Blog not found" });
      }

      return res.status(200).send({ message: "Blog updated successfully!" });
    });
  },
};

module.exports = blogsController;
