const jwt = require("jsonwebtoken");
const usersValidation = require("../Validations/users.validation");

const userMiddlewares = {
    post: async (req, res, next) => {
        try {
            // Token kontrolü
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ error: "Access Denied. No token provided." });
            }
            req.user = jwt.verify(token, process.env.SECRET_KEY);

            // Validation kontrolü
            const { error } = usersValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details });
            }
            next(); // Her şey başarılı, bir sonraki middleware'e geç
        } catch {
            return res.status(403).json({ error: "Invalid token" });
        }
    },

    patch: async (req, res, next) => {
        try {
            // Token kontrolü
            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                return res.status(403).json({ error: "Access Denied. No token provided." });
            }
            req.user = jwt.verify(token, process.env.SECRET_KEY);

            // Validation kontrolü
            const { error } = usersValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details });
            }

            next(); // Her şey başarılı, bir sonraki middleware'e geç
        } catch {
            return res.status(403).json({ error: "Invalid token" });
        }
    }
};

module.exports = userMiddlewares;
