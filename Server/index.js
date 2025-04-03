const express = require("express");
const app = express();
const blogRouter = require("./Routes/blogs.routes");
const usersRouter = require("./Routes/users.routes");
const categoryRouter = require("./Routes/categories.routes");
const serviceRouter = require("./Routes/services.routes");
const bodyParser = require("body-parser");

const cors = require("cors");
const statRouter = require("./Routes/stats.routes");
const portfolioRouter = require("./Routes/portfolio.routes");
// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json()); // JSON verilerini ayrıştır
app.use(bodyParser.urlencoded({ extended: true }));
// API Endpoints
app.use(blogRouter);
app.use(usersRouter);
app.use(categoryRouter);
app.use(serviceRouter);
app.use(statRouter);
app.use(portfolioRouter);

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is done: http://localhost:${PORT}`);
});
