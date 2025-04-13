import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import Base_Url from '../../Constant/base_url';

function DashBoardPieChart() {
    const [blogCount, setBlogCount] = useState([])
    function valueFormatter(item) { return `${item.value}%` }

    useEffect(() => {
        axios.get(Base_Url + '/api/stats/blogCount/category').then((res) => {
            setBlogCount(res.data)
        })
    })
    return (
        <div className={styles.PieChart}>
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
                    height={300}
                    width={600}
                />
            </div>
        </div>
    )
}

export default DashBoardPieChart