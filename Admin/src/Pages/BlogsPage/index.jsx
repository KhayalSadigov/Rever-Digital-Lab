import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../Context/dataContext";
import Base_Url from "../../Constant/base_url";
import axios from "axios";
import styles from "./index.module.scss";
import BlogTable from "../../Components/BlogTable";
import BlogHeader from "../../Components/BlogHeader";
import AddBlog from "../../Components/BlogAdd";
function BlogsPage() {
  const store = useContext(DataContext);
  const location = useLocation();
  useEffect(() => {
    store.location.setData(location.pathname);
    axios
      .post(Base_Url + "/login/admin/check", {
        token: localStorage.getItem("reverToken"),
      })
      .then(() => {
        if (!store.user.data) {
          axios
            .get(Base_Url + `/api/users/${localStorage.getItem("reverId")}`)
            .then((res) => {
              store.user.setData(res.data);
            });
        }
      })
      .catch(() => {
        window.location.replace("/");
      });
  }, []);
  return (
    <div className={styles.blogTable}>
      <AddBlog />
      <BlogHeader />
      <BlogTable />
    </div>
  );
}

export default BlogsPage;
