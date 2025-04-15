const endpoints = {
  users: {
    getAll: "/api/users",
    getOne: "/api/users/:id",
    getBlogs: "/api/users/:id/blogs",
    getServices: "/api/users/:id/services",
    getPortfolio: "/api/users/:id/portfolio",
    post: "/api/users",
    delete: "/api/users/:id",
    patch: "/api/users/:id",
    login: "/login/admin",
    loginCheck: "/login/admin/check",
  },

  blogs: {
    getAll: "/api/blogs",
    getOne: "/api/blogs/:id",
    post: "/api/blogs",
    delete: "/api/blogs/:id",
    patch: "/api/blogs/:id",
  },
  categories: {
    getAll: "/api/categories",
    getOne: "/api/categories/:id",
    post: "/api/categories",
    delete: "/api/categories/:id",
    patch: "/api/categories/:id",
  },
  services: {
    getAll: "/api/services",
    getOne: "/api/services/:id",
    post: "/api/services",
    delete: "/api/services/:id",
    patch: "/api/services/:id",
  },
  portfolio: {
    getAll: "/api/portfolio",
    getOne: "/api/portfolio/:id",
    post: "/api/portfolio",
    delete: "/api/portfolio/:id",
    patch: "/api/portfolio/:id",
  },
  stats: {
    getViewAll: "/api/stats/view/all",
    getViewMonth: "/api/stats/view/:month",
    incrementView: "/api/stats/view/count/increment",
    blogCountForCategory: "/api/stats/blogCount/category",
    blogCount: "/api/stats/blogCount",
    serviceCount: "/api/stats/serviceCount",
    portfolioCount: "/api/stats/portfolioCount",
  },
};

module.exports = endpoints;
