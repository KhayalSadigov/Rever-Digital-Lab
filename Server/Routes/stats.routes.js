const express = require("express");
const endpoints = require("../Constants/endpoints");
const statsController = require("../Controllers/stats.controller");

const statRouter = express.Router();

statRouter.get(endpoints.stats.getViewAll, statsController.getViewAll);
statRouter.get(endpoints.stats.getViewMonth, statsController.getViewMonth);
statRouter.get(endpoints.stats.incrementView, statsController.incrementView);
statRouter.get(endpoints.stats.portfolioCount, statsController.getTotalPortfolioCount);
statRouter.get(
  endpoints.stats.blogCountForCategory,
  statsController.getBlogCountForEachCategory
);
statRouter.get(endpoints.stats.blogCount, statsController.getTotalBlogCount);
statRouter.get(
  endpoints.stats.serviceCount,
  statsController.getTotalServiceCount
);

module.exports = statRouter;
