const express = require("express");
const app = express();
const blogRouter = require("./Routes/blogs.routes");
const usersRouter = require("./Routes/users.routes");
const categoryRouter = require("./Routes/categories.routes");
const serviceRouter = require("./Routes/services.routes");
const statRouter = require("./Routes/stats.routes");
const portfolioRouter = require("./Routes/portfolio.routes");
const bodyParser = require("body-parser");
const cors = require("cors");

// Middleware
app.use(cors());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Endpoints
app.use(blogRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(serviceRouter);
app.use(statRouter);
app.use(portfolioRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is done: http://localhost:${PORT}`);
});
