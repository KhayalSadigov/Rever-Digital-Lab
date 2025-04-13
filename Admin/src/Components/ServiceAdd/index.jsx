import { useContext, useRef, useState } from 'react'
import styles from './index.module.scss'
import { DataContext } from '../../Context/dataContext'
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import IosShareIcon from '@mui/icons-material/IosShare';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Tooltip } from '@mui/material';
import axios from "axios";
import Base_Url from '../../Constant/base_url';
import Swal from 'sweetalert2';
function AddService() {
  const fileInputRef = useRef(null)
  const store = useContext(DataContext)
  const [base64, setBase64] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [error, setError] = useState(null)
  const [loader, setLoader] = useState(false)
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
    setError(null)
  }
  function handleTitleChange(e) {
    setTitle(e.target.value)
  }
  function handDescChange(e) {
    setDesc(e.target.value)
  }
  function submitForm(e) {
    setLoader(true)
    e.preventDefault();
    if (!title)
      setError("Title is required!")
    else if (!desc)
      setError("Title is required!")
    else if (!base64)
      setError("Title is required!")
    else {
      let newData = { title: title, description: desc, cover: base64, owner: store.user.data.username, ownerId: store.user.data.id }
      axios.post(Base_Url + "/api/services", newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('reverToken')}`,
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log(res.data)
        setLoader(false)
        newData.id = res.data.id
        store.services.setFiltered([...store.services.filteredData, newData])
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successful!",
          showConfirmButton: false,
          timer: 1500
        })
        handleReset()
      }).catch((e) => {
        handleReset()
        Swal.fire({
          title: `${e.message}`,
          icon: "error",
          confirmButtonText: "ok",
        })
      })
    }
  }
  return (
    <>
      <div onClick={() => { store.serviceAdd.setData(false) }}
        style={store.serviceAdd.data ? {} : { display: 'none' }}
        className={styles.glass}>
      </div>

      <div style={store.serviceAdd.data ? {} : { height: "0", padding: '0' }} className={styles.modal}>
        <form className={styles.form} onSubmit={(e) => { submitForm(e) }}>
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
          <input type="text" value={title || ""} placeholder='Service title' onChange={(e) => { handleTitleChange(e) }} className={styles.input} />
          <textarea name="" id="" value={desc || ""} placeholder='Service description' onChange={(e) => { handDescChange(e) }}></textarea>
          <p className={styles.error}>{error}</p>
          <div className={styles.btns}>
            <Button className={styles.btn} color='error' variant="contained" onClick={() => { store.serviceAdd.setData(false) }}>
              <Tooltip title="Close" placement='top'>
                <CancelPresentationIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} color='warning' type='reset' variant="contained" onClick={() => { handleReset() }} >
              <Tooltip title="Reset" placement='top'>
                <RestartAltIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} variant="contained" type='submit'>
              <Tooltip title="Share" placement='top' >
                {loader ? "load" : <IosShareIcon />}
              </Tooltip>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddService
