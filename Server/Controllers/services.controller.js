const db = require("../Config/db");

const servicesController = {
  getAll: (req, res) => {
    db.query("SELECT * FROM services", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  },

  getOne: (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM services WHERE id = ?", [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Service not found" });
      res.json(results[0]);
    });
  },

  post: (req, res) => {
    const { title, description, cover } = req.body;
    db.query(
      "INSERT INTO services (title, description, cover) VALUES (?, ?, ?)",
      [title, description, cover],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({
            message: "Service created successfully",
            id: result.insertId,
          });
      }
    );
  },

  patch: (req, res) => {
    const { id } = req.params;
    const { title, description, cover } = req.body;
    db.query(
      "UPDATE services SET title = ?, description = ?, cover = ? WHERE id = ?",
      [title, description, cover, id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Service updated successfully" });
      }
    );
  },

  delete: (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM services WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Service deleted successfully" });
    });
  },
};

module.exports = servicesController;
