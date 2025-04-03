const jwt = require("jsonwebtoken");
const servicesValidation = require("./../Validations/services.validation");

const servicesMiddleware = {
  post: (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token)
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });

      req.user = jwt.verify(token, process.env.SECRET_KEY);

      const { error } = servicesValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details });

      next();
    } catch {
      return res.status(403).json({ error: "Invalid token" });
    }
  },

  patch: (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token)
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });

      req.user = jwt.verify(token, process.env.SECRET_KEY);

      const { error } = servicesValidation.validate(req.body);
      if (error) return res.status(400).json({ message: error.details });

      next();
    } catch {
      return res.status(403).json({ error: "Invalid token" });
    }
  },
};

module.exports = servicesMiddleware;
