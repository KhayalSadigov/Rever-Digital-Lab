const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./../Config/db");

const usersController = {
  getAll: async (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.send(results);
    });
  },

  getOne: async (req, res) => {
    const userId = req.params.id;
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).send({ error: err.message });
      if (results.length === 0)
        return res.status(404).send({ message: "User not found" });

      res.status(200).send(results[0]);
    });
  },

  post: async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        userProfile,
        userRole = "moderator",
      } = req.body; // default role is 'moderator'
      const hashedPassword = await bcrypt.hash(password, 10);

      const query =
        "INSERT INTO users (username, email, password, userProfile, userRole) VALUES (?, ?, ?, ?, ?)";
      db.query(
        query,
        [username, email, hashedPassword, userProfile, userRole],
        (err, result) => {
          if (err) {
            return res.status(500).send({ error: err.message });
          }
          res.send({
            message: "Successfully created!",
            userId: result.insertId,
          });
        }
      );
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },

  delete: (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });

      res
        .status(200)
        .send({ message: `User with ID ${id} deleted successfully` });
    });
  },

  patch: async (req, res) => {
    const userId = req.params.id;
    const { username, email, userRole } = req.body;

    if (!username && !email && !userRole) {
      return res.status(400).send({
        error: "At least one field (username, email, or userRole) is required",
      });
    }

    const updates = [];
    const values = [];

    if (username) {
      updates.push("username = ?");
      values.push(username);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }
    if (userRole) {
      updates.push("userRole = ?");
      values.push(userRole);
    }

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    values.push(userId);

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });

      res
        .status(200)
        .send({ message: `User with ID ${userId} updated successfully` });
    });
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], async (err, results) => {
      if (err) return res.status(500).send({ error: err.message });

      if (results.length === 0) {
        return res.status(404).send({ error: "User not found" });
      }

      const user = results[0];

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username, userRole: user.userRole },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      res.status(200).send({ message: "Login successful", token, id: user.id });
    });
  },

  loginCheck: async (req, res) => {
    try {
      const { token } = req.body;
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      res.status(200).send({ message: "Success" });
    } catch (error) {
      res.status(400).send({ messsage: "invalid token" });
    }
  },

  getServices: async (req, res) => {
    const ownerId = req.params.id;

    const query = "SELECT * FROM services WHERE ownerId = ?";

    db.query(query, [ownerId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(200).json(results);
    });
  },

  getBlogs: (req, res) => {
    const ownerId = req.params.id;

    const query = `
      SELECT blogs.*, categories.title AS categoryName 
      FROM blogs 
      LEFT JOIN categories ON blogs.categoryId = categories.id
      WHERE blogs.ownerId = ?
    `;

    db.query(query, [ownerId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },

  getPortfolio: (req, res) => {
    const ownerId = req.params.id;

    const query = `SELECT * FROM portfolio WHERE ownerId = ?`;

    db.query(query, [ownerId], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    });
  },
};

module.exports = usersController;
