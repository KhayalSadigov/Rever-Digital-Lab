/* eslint-disable no-unused-vars */
import styles from './index.module.scss'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react'
import Base_Url from '../../Constant/base_url';


function ProfileCard({ id, shared }) {
    const [services, setServices] = useState(null)
    const [blogs, setBlogs] = useState(null)
    const [portfolio, setPortfolio] = useState(null)

    useEffect(() => {
        axios.get(Base_Url + `/api/users/${id}/services`).then((res) => {
            setServices(res.data)
        })
        axios.get(Base_Url + `/api/users/${id}/blogs`).then((res) => {
            setBlogs(res.data)
        })
        axios.get(Base_Url + `/api/users/${id}/portfolio`).then((res) => {
            setPortfolio(res.data)
        })
    }, [id])


    if (shared == 3)
        return (
            <div className={styles.cardList}>
                {
                    portfolio && portfolio.length != 0 ? portfolio && portfolio.map((e, i) => {
                        return (
                            <div key={i} className={styles.card}>
                                <div className={styles.photo}>
                                    <img src={e.cover} alt="" />
                                </div>
                                <div className={styles.text}>
                                    <p>{e.title}</p>
                                </div>
                            </div>
                        )
                    }) : <p className={styles.noData}>No Portfolio</p>
                }
            </div>
        )
    if (shared == 2)
        return (
            <div className={styles.cardList}>
                {
                    blogs && blogs.length != 0 ? blogs && blogs.map((e, i) => {
                        return (
                            <div key={i} className={styles.card}>
                                <div className={styles.photo}>
                                    <img src={e.cover} alt="" />
                                </div>
                                <div className={styles.text}>
                                    <p>{e.title}</p>
                                </div>
                            </div>
                        )
                    }) : <p className={styles.noData}>No Blogs</p>
                }
            </div>
        )
    if (shared == 1)
        return (
            <div className={styles.cardList}>
                {
                    services && services.length != 0 ? services && services.map((e, i) => {
                        return (
                            <div key={i} className={styles.card}>
                                <div className={styles.photo}>
                                    <img src={e.cover} alt="" />
                                </div>
                                <div className={styles.text}>
                                    <p>{e.title}</p>
                                </div>
                            </div>
                        )
                    }) : <p className={styles.noData}>No Services</p>
                }
            </div>
        );
}

ProfileCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    shared: PropTypes.oneOfType([PropTypes.number]).isRequired,
};

export default ProfileCard;
