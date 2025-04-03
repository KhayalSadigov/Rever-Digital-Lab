import { useLocation } from "react-router-dom";
import styles from './index.module.scss'
import { useContext } from "react";
import { DataContext } from "../../Context/dataContext";
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

function SideBar() {
    const navigate = useNavigate();

    const location = useLocation();
    const store = useContext(DataContext)
    return (
        <div style={location.pathname == '/' ? { display: 'none' } : {}} className={styles.sideBar}>
            <div className={styles.content} style={store.sidebar.data ? {} : { width: "60px" }}>
                <div className={styles.navigation}>
                    <div className={styles.toggleBtn}>
                        <MenuIcon fontSize="large" onClick={() => {
                            store.sidebar.setData(!store.sidebar.data)
                        }} className={styles.toggleIcon} />
                        <span className={styles.toggleText} >
                            RDL | Admin
                        </span>
                    </div>
                    <Tooltip title="Dashboard" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/dashboard')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/dashboard" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <DashboardIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Dashboard
                            </span>
                        </div>
                    </Tooltip>

                    <Tooltip title="Services" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/services')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/services" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <SettingsSuggestIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text}>
                                Services
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Blogs" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/blogs')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/blogs" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <BookIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Blogs
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Categories" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/categories')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/categories" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <CategoryIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Categories
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Portfolio" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/portfolio')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/portfolio" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <WebStoriesIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Portfolio
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Users" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/users')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/users" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <GroupIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Users
                            </span>
                        </div>
                    </Tooltip>
                    <Tooltip title="Messages" placement="right">
                        <div className={styles.Btn} onClick={() => {
                            navigate('/messages')
                            store.sidebar.setData(false)

                        }} style={store.location.data == "/messages" ? { backgroundColor: "white", color: "#3a5aa5" } : {}}>
                            <MessageIcon fontSize="large" className={styles.icon} />
                            <span className={styles.text} >
                                Messages
                            </span>
                        </div>
                    </Tooltip>
                </div>
                <Tooltip title="Log out" placement="top">
                    <div className={styles.logOut} onClick={() => {
                        Swal.fire({
                            title: "Are you sure?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.removeItem("reverToken")
                                window.location.reload()
                            }
                        });
                    }}>
                        <LogoutIcon fontSize="large" className={styles.icon} />
                        <span className={styles.text}>
                            Log out
                        </span>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default SideBar