import styles from './index.module.scss';
// import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../../Context/dataContext';
import SearchIcon from '@mui/icons-material/Search';
function Header() {
  const location = useLocation();
  const store = useContext(DataContext)

  return (
    <div style={location.pathname == '/' ? { display: 'none' } : {}} className={styles.header}>
      <div className={styles.logo}>
        <img src="./public/images/LogoNewEra.jpg" alt="" />
      </div>
      <div className={styles.search}>

        <input type="text" placeholder="search" />
        <SearchIcon className={styles.icon} />
      </div>
      <div className={styles.profile} onClick={() => {
        store.profileBar.setData(!store.profileBar.data)
      }}  >
        {store.user.data ? <div className={styles.profileImage}><img src={store.user.data.userProfile} alt="" /></div> : <AccountCircleIcon className={styles.icon} />}
        <div className={styles.title}>
          <span className={styles.name}>{store.user.data?.username}</span>
          <span className={styles.role}>{store.user.data?.userRole}</span>
        </div>
      </div>
    </div>
  )
}

export default Header