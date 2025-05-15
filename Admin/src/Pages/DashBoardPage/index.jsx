import axios from "axios";
import { useContext, useEffect } from "react";
import Base_Url from "../../Constant/base_url";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import styles from './index.module.scss';

import DashboardStat from "../../Components/DashboardStat";
import DashBoardBarChart from "../../Components/DashboardBarChart";
import DashBoardPieChart from "../../Components/DahsboardPieChart";

function DashBoardPage() {

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
        <section className={styles.dashboard}>
            <DashboardStat />
            <div className={styles.bottom}>
                <DashBoardBarChart />
                <DashBoardPieChart />
            </div>
        </section>
    )
}

export default DashBoardPage