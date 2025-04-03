const jwt = require("jsonwebtoken");
const portfolioValidation = require("../Validations/portfolio.validation");

const portfolioMiddlewares = {
  post: async (req, res, next) => {
    try {
      // Token kontrolü
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });
      }

      // Token doğrulama
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      // Veri doğrulama
      const { error } = portfolioValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details });
      }

      // Middleware'den geçiş
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },

  patch: async (req, res, next) => {
    try {
      // Token kontrolü
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });
      }

      // Token doğrulama
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      // Veri doğrulama
      const { error } = portfolioValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details });
      }

      // Middleware'den geçiş
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },
};

module.exports = portfolioMiddlewares;
