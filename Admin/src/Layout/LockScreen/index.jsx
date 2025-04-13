import { useContext, useState } from 'react'
import styles from './index.module.scss'
import { DataContext } from '../../Context/dataContext'
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import axios from 'axios';
import Base_Url from '../../Constant/base_url';

export default function LockScreen() {

    const store = useContext(DataContext)
    const [icon, setIcon] = useState(false)
    const [pass, setPass] = useState("")
    const [error, setError] = useState("")
    const handlePassword = (e) => {
        setPass(e.target.value)
    }

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#015F83",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("reverToken")
                window.location.reload()
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pass.trim().length != 0) {
            let user = {
                username: store.user.data?.username,
                password: pass
            }
            axios.post(Base_Url + "/login/admin", user).then(() => {
                store.lockScreen.setData(false)
                setPass("")
                setError("")
            }).catch(() => {
                setError("Password is wrong!")
            })
        }
        else {
            setError("Password is required!")
        }
    }


    return <div className={styles.Lock} style={store.lockScreen.data ? {} : { top: '-100%' }}>
        <div className={styles.glass}>
            <div></div>
        </div>
        <div className={styles.unLock}>
            <div className={styles.user}>
                <div className={styles.photo}>
                    <img src={store.user.data?.userProfile} alt="" />
                </div>
                <div className={styles.text}>
                    <p className={styles.name}>{store.user.data?.username}</p>
                </div>
            </div>
            <form className={styles.form} onSubmit={(e) => { handleSubmit(e) }}>
                <TextField value={pass} onChange={(e) => { handlePassword(e) }} type={icon ? "text" : "password"} id="pass" className='pass' label="Password" variant="outlined" />
                <VisibilityIcon style={icon ? { color: '#015f83' } : {}} onClick={() => { setIcon(!icon) }} className={styles.icon} />
            </form>
            <p className={styles.error}>{error}</p>
            <div className={styles.banner}>
                <span></span>
                <p onClick={handleLogOut}>Log out</p>
                <span></span>
            </div>
        </div>
    </div>
}