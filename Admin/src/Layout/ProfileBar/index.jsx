import { useContext } from 'react'
import styles from './index.module.scss'
import { DataContext } from '../../Context/dataContext'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function ProfileBar() {

    const store = useContext(DataContext)

    let handleLogOut = () => {
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

    const handleCloseProfile = () => {
        store.profileBar.setData(!store.profileBar.data)
    }

    const handleLockScreen = () => {
        store.lockScreen.setData(!store.lockScreen.data)
        store.profileBar.setData(!store.profileBar.data)
    }

    return (
        <>
            <div className={styles.bar} style={store.profileBar.data ? {} : { display: 'none' }} onClick={() => {
                store.profileBar.setData(!store.profileBar.data)
            }}>

            </div>
            <div style={store.profileBar.data ? {} : { right: '-300px' }} className={styles.nav}>

                <div className={styles.user}>
                    <div className={styles.data}>
                        <div className={styles.photo}>
                            <img src={store.user.data?.userProfile} alt="" />

                        </div>
                        <div className={styles.text}>
                            <div className={styles.name}>{store.user.data?.username}</div>
                            <div className={styles.role}>{store.user.data?.userRole}</div>
                        </div>
                    </div>
                    <div className={styles.btns}>
                        <Button className={styles.editBtn} variant="contained" ><DriveFileRenameOutlineIcon fontSize='small' />Edit profile</Button>
                        <div className={styles.outBtns}>
                            <Button className={styles.lockBtn} variant="contained" color="warning" onClick={handleLockScreen}><LockIcon fontSize='small' />Lock screen</Button>
                            <Button className={styles.logBtn} variant="contained" color="error" onClick={handleLogOut}><LogoutIcon fontSize='small' />Log out</Button>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <Button className={styles.close} variant="contained" onClick={handleCloseProfile}><ArrowLeftIcon />Back</Button>
                </div>
            </div>
        </>
    )
}

export default ProfileBar