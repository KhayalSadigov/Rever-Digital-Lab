import styles from "./index.module.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import Base_Url from "../../Constant/base_url";
import CircularProgress from '@mui/material/CircularProgress';
import showSuccessMessage from "../../Services/alert";
import Swal from "sweetalert2";


function LoginPage() {
  useEffect(() => {
    axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
      window.location.replace('dashboard')
    }).catch(() => {
    })
  }, [])

  const [icon, setIcon] = useState(false)
  const [loader, setLoader] = useState(false)
  const [errorMes, setError] = useState("")
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      setLoader(true)
      axios.post(Base_Url + '/login/admin', values).then((res) => {
        localStorage.setItem('reverToken', res.data.token)
        localStorage.setItem('reverId', res.data.id)
        formik.resetForm()
        setLoader(false)
        setError("")
        showSuccessMessage()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successful login!",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
            window.location.replace('dashboard')
          })
        });
      }).catch(() => {
        setError("Username or password are wrong")
        Swal.fire({
          title: "Login failed!",
          icon: "error",
          confirmButtonText: "ok",
        }).then(() => {
          setLoader(false)
          formik.resetForm()
        });
      })
    },
  });
  return (
    <section className={styles.login}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="./../images/LogoNewEra.png" alt="" />
        </div>
        <form onSubmit={formik.handleSubmit} className={styles.loginForm}>
          <div className={styles.input}>
            <TextField required name="username" onChange={formik.handleChange} value={formik.values.username} className={styles.loginInput} label="Username" variant="outlined" />
          </div>
          <div className={styles.input}>
            
            <TextField required name="password" onChange={formik.handleChange} value={formik.values.password} className={styles.loginInput} label="Password" type={icon ? "" : "password"} variant="outlined" />
            <RemoveRedEyeIcon onClick={() => {
              setIcon(!icon)
            }} className={styles.eyeIcons} style={icon ? { color: "3a5aa5" } : {}} />
          </div>
          <Button variant="contained" className={styles.loginBtn} type="submit">{loader ? <CircularProgress className={styles.loaderIcon} size={20} /> : "Login"}</Button>
          <p className={styles.error}>{errorMes}</p>
        </form>
        <div className={styles.badge}>
          <p></p>
          <span>Login to your account</span>
          <p></p>
        </div>

      </div>
      <div className={styles.right}>
        <img src="./../images/cover.jpg" alt="" />
        <div className={styles.glass}>
          <h1>Welcome</h1>
          <p className={styles.badge}></p>
          <p>Rever Digital Lab | Admin Panel</p>
        </div>
      </div>
    </section>
  )
}

export default LoginPage