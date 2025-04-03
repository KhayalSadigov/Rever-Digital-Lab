import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Base_Url from "../../Constant/base_url";
import { DataContext } from "../../Context/dataContext";
import { useLocation } from "react-router-dom";
import styles from './index.module.scss';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ArrayLabel from "../../Services/chartArray";
function DashBoardPage() {
    // PieChart
    function valueFormatter(item) { return `${item.value}%` }
    // ===================

    const [view, setView] = useState([])
    const [blogCount, setBlogCount] = useState([])
    const [totalBlog, setTotalBlog] = useState({})
    const [totalService, setTotalService] = useState({})
    const [totalPortfolio, setTotalPortfolio] = useState({})

    const [monthView, setMonthView] = useState({})
    const store = useContext(DataContext)
    const location = useLocation();
    store.location.setData(location.pathname)

    useEffect(() => {
        store.location.setData(location.pathname)
        axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
        }).catch(() => {
            window.location.replace('/')
        })
        if (!store.user.data) {
            axios.get(Base_Url + `/api/users/${localStorage.getItem('reverId')}`).then((res) => {
                store.user.setData(res.data)
            })
        }
        axios.get(Base_Url + '/api/stats/view/all').then((res) => {
            setView(res.data)
        })
        axios.get(Base_Url + '/api/stats/blogCount/category').then((res) => {
            setBlogCount(res.data)
        })
        axios.get(Base_Url + '/api/stats/blogCount').then((res) => {
            setTotalBlog(res.data)
        })
        axios.get(Base_Url + '/api/stats/serviceCount').then((res) => {
            setTotalService(res.data)
        })
        axios.get(Base_Url + '/api/stats/portfolioCount').then((res) => {
            setTotalPortfolio(res.data)
        })
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        axios.get(Base_Url + `/api/stats/view/${months[(new Date()).getMonth()]}`).then((res) => {
            setMonthView(res.data)
        })

    }, [])
    return (
        <section className={styles.dashboard}>
            <div className={styles.top}>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.cardImage}>
                            <RemoveRedEyeIcon className={styles.icon} />
                        </div>
                        <div className={styles.head}>
                            <h2>{monthView?.totalViews}</h2>
                            <span>Months review</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.cardImage}>
                            <NewspaperIcon className={styles.icon} />
                        </div>
                        <div className={styles.head}>
                            <h2>{totalBlog.totalBlogs}</h2>
                            <span>Active blog</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.cardImage}>
                            <SummarizeIcon className={styles.icon} />
                        </div>
                        <div className={styles.head}>
                            <h2>{totalPortfolio.totalPortfolios}</h2>
                            <span>Real Project</span>
                        </div>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.cardImage}>
                            <MiscellaneousServicesIcon className={styles.icon} />
                        </div>
                        <div className={styles.head}>
                            <h2>{totalService.totalServices}</h2>
                            <span>Software services</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.cardStat}>
                    <div className={styles.content}>
                        <BarChart
                            xAxis={[{ scaleType: "band", data: (ArrayLabel(view))?.name }]}
                            series={[
                                {
                                    data: (ArrayLabel(view))?.value,
                                    color: "#3A5AA5",
                                }
                            ]}
                            barLabel="value"
                            sx={{
                                "& .MuiBarLabel-root": {
                                    fill: "#ffffff", // Bar üstündəki yazının rəngi (ağ)
                                    fontSize: 14,
                                    fontWeight: "bold",
                                }
                            }}
                        />

                    </div>
                </div>
                <div className={styles.cardCategory}>
                    <div className={styles.content}>
                        <PieChart
                            series={[
                                {
                                    data: blogCount,
                                    highlightScope: { fade: 'global', highlight: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                    valueFormatter,
                                },
                            ]}
                            className={styles.PieChart}
                            height={200}
                            width={400}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashBoardPage