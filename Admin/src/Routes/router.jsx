import { createBrowserRouter } from "react-router-dom";
import MainRout from "../Pages/MainRout";
import LoginPage from "../Pages/LoginPage";
import DashBoardPage from "../Pages/DashBoardPage";
import BlogsPage from "../Pages/BlogsPage";
import CategoriesPage from "../Pages/CategoriesPage";
import PortfolioPage from "../Pages/PortfolioPage";
import UsersPage from "../Pages/UsersPage";
import MessagesPage from "../Pages/MessagesPage";
import ServicesPage from "../Pages/ServicesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "dashboard",
        element: <DashBoardPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },

    ],
  },
]);

export default router;
