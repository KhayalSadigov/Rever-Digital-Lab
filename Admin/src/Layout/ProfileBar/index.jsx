import { useContext } from 'react'
import styles from './index.module.scss'
import { DataContext } from '../../Context/dataContext'
import Button from '@mui/material/Button';
function ProfileBar() {
    const store = useContext(DataContext)

    return (
        <>
            <div className={styles.bar} style={store.profileBar.data ? {} : { display: 'none' }} onClick={() => {
                store.profileBar.setData(!store.profileBar.data)
            }}>

            </div>
            <div style={store.profileBar.data ? {} : { right: '-300px' }} className={styles.nav}>

                <Button className={styles.close} variant="contained" color="error" onClick={() => {
                    store.profileBar.setData(!store.profileBar.data)
                }}>Close</Button>
            </div>
        </>
    )
}

export default ProfileBar