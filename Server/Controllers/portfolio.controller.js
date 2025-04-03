const db = require("../Config/db");

const portfolioController = {
  // Tüm portfolyoları getiren controller
  getAll: async (req, res) => {
    const query = `
      SELECT * FROM portfolio
    `;

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res.status(200).send(result);
    });
  },

  // Tek bir portfolyoyu getiren controller
  getOne: async (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT * FROM portfolio WHERE id = ?
    `;

    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send({ error: err.message });

      if (results.length === 0) {
        return res.status(404).send({ message: "Portfolio not found" });
      }

      return res.status(200).send(results[0]);
    });
  },

  // Yeni bir portfolyo ekleyen controller
  post: async (req, res) => {
    const { title, description, cover, src } = req.body;
    const values = [title, description, cover, src];

    const query =
      "INSERT INTO portfolio (title, description, cover, src) VALUES (?, ?, ?, ?)";

    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res.status(200).send({
        message: "Successfully added!",
        portfolioId: results.insertId,
      });
    });
  },

  // Portfolyoyu silen controller
  delete: async (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM portfolio WHERE id = ?";

    db.query(query, [id], (err, results) => {
      if (err) return res.status(500).send({ message: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Portfolio not found" });
      }

      return res.status(200).send({
        message: `Successfully deleted portfolio with ID ${id}`,
      });
    });
  },

  // Mevcut portfolyoyu güncelleyen controller
  patch: async (req, res) => {
    const id = req.params.id;
    const { title, description, cover, src } = req.body;

    if (!title && !description && !cover && !src)
      return res.status(400).send("At least one field is required");

    const updates = [];
    const values = [];

    if (title) {
      updates.push("title = ?");
      values.push(title);
    }
    if (description) {
      updates.push("description = ?");
      values.push(description);
    }
    if (cover) {
      updates.push("cover = ?");
      values.push(cover);
    }
    if (src) {
      updates.push("src = ?");
      values.push(src);
    }

    values.push(id);

    const query = `UPDATE portfolio SET ${updates.join(", ")} WHERE id = ?`;

    db.query(query, values, (err, results) => {
      if (err) return res.status(500).send({ error: err.message });

      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Portfolio not found" });
      }

      return res
        .status(200)
        .send({ message: "Portfolio updated successfully!" });
    });
  },
};

module.exports = portfolioController;
