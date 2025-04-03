import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import Base_Url from "../../Constant/base_url";
import axios from "axios";

function PortfolioPage() {
  const store = useContext(DataContext)
  const location = useLocation();
  store.location.setData(location.pathname)
  useEffect(() => {
    store.location.setData(location.pathname)
    axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
    }).catch(() => {
      window.location.replace('/')
    })
    if (store.user.data) {
      axios.get(Base_Url + `/api/users/${localStorage.getItem('reverId')}`).then((res) => {
        store.user.setData(res.data)
      })
    }
  }, [])
  return (
    <div>PortfolioPage</div>
  )
}

export default PortfolioPage