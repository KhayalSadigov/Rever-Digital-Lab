import { useContext, useRef, useState } from 'react'
import styles from './index.module.scss'
import { DataContext } from '../../Context/dataContext'
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import IosShareIcon from '@mui/icons-material/IosShare';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Tooltip } from '@mui/material';
function AddService() {
  const fileInputRef = useRef(null)
  const store = useContext(DataContext)
  const [base64, setBase64] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(selectedFile)
    reader.onloadend = () => {
      setBase64(reader.result)
    }
  }
  function handleReset() {
    setBase64(null)
    setTitle(null)
    setDesc(null)
  }
  return (
    <>
      <div onClick={() => { store.serviceAdd.setData(false) }}
        style={store.serviceAdd.data ? {} : { display: 'none' }}
        className={styles.glass}>
      </div>

      <div style={store.serviceAdd.data ? {} : { height: "0", padding: '0' }} className={styles.modal}>
        <form className={styles.form} onSubmit={(e) => {
          e.preventDefault()
          console.log("Base64:", base64)
        }}>
          <div className={styles.image}>
            <label htmlFor="image" className={styles.imageInp}>{base64 ? (
              (<img src={base64} alt='image'></img>)
            ) : (<p className={styles.imageText}><ImageIcon />Select service cover</p>)}</label>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              name="image"
              id="image"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => { setBase64(null); fileInputRef.current.value = "" }}
              style={base64 ? {} : { backgroundColor: 'grey' }}
              className={styles.delImage}
              >
                X
            </button>
          </div>
          <input type="text" placeholder='Service title' className={styles.input} />
          <textarea name="" id="" placeholder='Service description'></textarea>
          <div className={styles.btns}>
            <Button className={styles.btn} color='error' variant="contained" type='reset' onClick={() => { store.serviceAdd.setData(false) }}>
              <Tooltip title="Share" placement='top'>
                <CancelPresentationIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} color='warning' variant="contained" onClick={() => { handleReset() }} >
              <Tooltip title="Reset" placement='top'>
                <RestartAltIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} variant="contained">
              <Tooltip title="Close" placement='top'>
                <IosShareIcon />
              </Tooltip>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddService
