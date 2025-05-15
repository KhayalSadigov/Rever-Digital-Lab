const jwt = require("jsonwebtoken");
const blogsValidation = require("../Validations/blogs.validation");

const blogMiddlewares = {
  post: async (req, res, next) => {
    // console.log(req.body);
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        console.log("no")
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      const { error } = blogsValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details });
      }

      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },

  patch: async (req, res, next) => {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res
          .status(403)
          .json({ error: "Access Denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;

      const { error } = blogsValidation.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details });
      }

      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  },
};

module.exports = blogMiddlewares;
