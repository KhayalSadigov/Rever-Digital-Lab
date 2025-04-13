import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Base_Url from "../../Constant/base_url";
import ServiceTable from "../../Components/ServiceTable";
import styles from './index.module.scss'
import AddService from "../../Components/ServiceAdd";
import ServiceHeader from "../../Components/ServiceHeader";

function ServicesPage() {
  const store = useContext(DataContext)
  const location = useLocation();
  store.location.setData(location.pathname)
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
    <section className={styles.serviceTable}>
      <AddService />
      <ServiceHeader />
      <ServiceTable />
    </section>
  )
}

export default ServicesPage