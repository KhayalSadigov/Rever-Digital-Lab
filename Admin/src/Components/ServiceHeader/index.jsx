import styles from './index.module.scss';
import { useContext } from 'react';
import { DataContext } from '../../Context/dataContext';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

function ServiceHeader() {
    const store = useContext(DataContext);

    function handleFilter(key) {
        store.services.setFiltered([...store.services.data.filter((e) => {
            return e.title.toLocaleLowerCase().trim().includes(key.toLocaleLowerCase().trim())
        })])
    }
    return (
        <div className={styles.head}>
            <h3>Services</h3>
            <div className={styles.search}>
                <input type="text" placeholder="Search" onChange={(e) => {
                    handleFilter(e.target.value)
                }} />
                <SearchIcon className={styles.icon} />
            </div>
            <Button variant="contained" onClick={() => { store.serviceAdd.setData(true) }} className={styles.addBtn}>+ Add</Button>
        </div>
    )
}

export default ServiceHeader