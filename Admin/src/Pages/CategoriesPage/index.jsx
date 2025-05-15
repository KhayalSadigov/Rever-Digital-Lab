import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import Base_Url from "../../Constant/base_url";
import axios from "axios";

function CategoriesPage() {
  const store = useContext(DataContext)
  const location = useLocation();
  useEffect(() => {
    store.location.setData(location.pathname)
    axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
      if (!store.user.data) {
        axios.get(Base_Url + `/api/users/${localStorage.getItem('reverId')}`).then((res) => {
          store.user.setData(res.data)
        })
      }
    }).catch(() => {
      window.location.replace('/')
    })

  }, [])
  return (
    <div>CategoriesPage</div>
  )
}

export default CategoriesPage