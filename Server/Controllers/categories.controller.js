const db = require("../Config/db"); 
const categoriesValidation = require("../Validations/categories.validation");

const categoriesController = {
  getAll: (req, res) => {
    db.query("SELECT * FROM categories", (err, results) => {
      if (err)
        return res.status(500).json({ error: "Database error", details: err });
      res.json(results);
    });
  },

  getOne: (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM categories WHERE id = ?", [id], (err, results) => {
      if (err)
        return res.status(500).json({ error: "Database error", details: err });
      if (results.length === 0)
        return res.status(404).json({ error: "Category not found" });
      res.json(results[0]);
    });
  },

  post: (req, res) => {
    const { error } = categoriesValidation.validate(req.body);
    if (error) return res.status(400).json({ message: error.details });

    const { title, src } = req.body;
    db.query(
      "INSERT INTO categories (title, src) VALUES (?, ?)",
      [title, src],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        res
          .status(201)
          .json({ message: "Category added", id: result.insertId });
      }
    );
  },

  patch: (req, res) => {
    const { id } = req.params;
    const { title, src } = req.body;

    db.query(
      "UPDATE categories SET title = ?, src = ? WHERE id = ?",
      [title, src, id],
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        if (result.affectedRows === 0)
          return res.status(404).json({ error: "Category not found" });
        res.json({ message: "Category updated" });
      }
    );
  },

  delete: (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM categories WHERE id = ?", [id], (err, result) => {
      if (err)
        return res.status(500).json({ error: "Database error", details: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Category not found" });
      res.json({ message: "Category deleted" });
    });
  },
};

module.exports = categoriesController;
