const db = require("../Config/db");
const moment = require("moment");
const statsController = {
  getViewAll: async (req, res) => {
    const query = "Select * From view";

    db.query(query, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(result);
    });
  },
  getViewMonth: async (req, res) => {
    try {
      let { month } = req.params; // URL-dən ay parametrini alırıq
      month = month.toLocaleLowerCase();
      month = month.charAt(0).toUpperCase() + month.slice(1);
      const query = `SELECT SUM(view) AS totalViews FROM view WHERE month = ?`;

      db.query(query, [month], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }

        // Nəticə boşdursa, 0 qaytarırıq
        const totalViews = results[0].totalViews || 0;

        res.json({ month, totalViews });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
  incrementView: async (req, res) => {
    try {
      const currentMonth = moment().format("MMMM"); // Cari ay (January, February və s.)
      const currentYear = moment().format("YYYY"); // Cari il (2024 və s.)

      const allMonths = moment.months(); // ["January", "February", ..., "December"]

      // Bütün ayları yoxla
      for (const month of allMonths) {
        const [existingRows] = await db
          .promise()
          .query("SELECT * FROM view WHERE month = ? AND year = ?", [
            month,
            currentYear,
          ]);

        if (existingRows.length === 0) {
          // Əgər həmin ay bazada yoxdursa, 0 view ilə əlavə et
          await db
            .promise()
            .query("INSERT INTO view (month, year, view) VALUES (?, ?, ?)", [
              month,
              currentYear,
              0,
            ]);
        }
      }

      // Cari ayın view sayını artır
      await db
        .promise()
        .query("UPDATE view SET view = view + 1 WHERE month = ? AND year = ?", [
          currentMonth,
          currentYear,
        ]);

      res.status(200).json({ message: "View count updated successfully!" });
    } catch (error) {
      console.error("Error updating views:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getBlogCountForEachCategory: async (req, res) => {
    try {
      const query = `
        SELECT c.id AS id, c.title AS label, COUNT(b.id) AS value
        FROM categories c
        LEFT JOIN blogs b ON c.id = b.categoryId
        GROUP BY c.id, c.title
        ORDER BY value DESC;
      `;

      db.query(query, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res.json(results);
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
  getTotalBlogCount: async (req, res) => {
    try {
      const query = `SELECT COUNT(*) AS totalBlogs FROM blogs`;

      db.query(query, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res.json({ totalBlogs: results[0].totalBlogs });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
  getTotalServiceCount: async (req, res) => {
    try {
      const query = `SELECT COUNT(*) AS totalServices FROM services`;

      db.query(query, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Database error", details: err });
        }
        res.json({ totalServices: results[0].totalServices });
      });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  },
  getTotalPortfolioCount: async (req, res) => {
    const query = "SELECT COUNT(*) AS total FROM portfolio";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      return res.status(200).send({ totalPortfolios: result[0].total });
    });
  },
};

module.exports = statsController;
