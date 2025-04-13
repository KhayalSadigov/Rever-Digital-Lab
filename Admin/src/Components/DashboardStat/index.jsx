import styles from './index.module.scss'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Base_Url from '../../Constant/base_url';

function DashboardStat() {
    const [totalBlog, setTotalBlog] = useState({})
    const [totalService, setTotalService] = useState({})
    const [totalPortfolio, setTotalPortfolio] = useState({})
    const [monthView, setMonthView] = useState({})

    useEffect(() => {
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
        <div className={styles.stats}>
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
    )
}

export default DashboardStat