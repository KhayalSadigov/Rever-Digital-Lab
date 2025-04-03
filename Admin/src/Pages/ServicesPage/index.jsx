import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Base_Url from "../../Constant/base_url";
import ServiceTable from "../../Components/ServiceTable";
import styles from './index.module.scss'
import Button from '@mui/material/Button';
function ServicesPage() {
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
    <section className={styles.serviceTable}>
      <div className={styles.head}>
        <h3>Services</h3>
        <Button variant="contained" onClick={()=>{store.serviceAdd.setData(true)}} className={styles.addBtn}>+ Add</Button>
      </div>
      <ServiceTable />
    </section>
  )
}

export default ServicesPage