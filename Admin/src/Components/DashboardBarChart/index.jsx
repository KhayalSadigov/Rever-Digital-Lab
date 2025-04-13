import styles from './index.module.scss'
import ArrayLabel from "../../Services/chartArray";
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Base_Url from '../../Constant/base_url';

function DashBoardBarChart() {
    const [view, setView] = useState([])
    useEffect(() => {
        axios.get(Base_Url + '/api/stats/view/all').then((res) => {
            setView(res.data)
        })
    })
    return (
        <div className={styles.PieChart}>
            <div className={styles.content}>
                <BarChart
                    xAxis={[{ scaleType: "band", data: (ArrayLabel(view))?.name }]}
                    series={[
                        {
                            data: (ArrayLabel(view))?.value,
                            color: "#015F83",
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
    )
}

export default DashBoardBarChart