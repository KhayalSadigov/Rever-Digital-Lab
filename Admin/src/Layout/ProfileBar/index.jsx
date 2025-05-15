import { useContext, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { DataContext } from "../../Context/dataContext";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import Base_Url from "../../Constant/base_url";

function ProfileBar() {
  const store = useContext(DataContext);

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
        localStorage.removeItem("reverToken");
        window.location.reload();
      }
    });
  };

  const handleLockScreen = () => {
    store.lockScreen.setData(!store.lockScreen.data);
    store.profileBar.setData(!store.profileBar.data);
  };

  const [services, setServices] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    axios
      .get(Base_Url + `/api/users/${store.user.data?.id}/services`)
      .then((res) => {
        setServices(res.data);
      });
    axios
      .get(Base_Url + `/api/users/${store.user.data?.id}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      });
    axios
      .get(Base_Url + `/api/users/${store.user.data?.id}/portfolio`)
      .then((res) => {
        setPortfolio(res.data);
      });
  }, [store.user.data?.id]);

  return (
    <>
      <div
        className={styles.bar}
        style={store.profileBar.data ? {} : { display: "none" }}
        onClick={() => {
          store.profileBar.setData(!store.profileBar.data);
        }}
      ></div>
      <div
        style={store.profileBar.data ? {} : { right: "-330px" }}
        className={styles.nav}
      >
        <div className={styles.user}>
          <div className={styles.data}>
            <div className={styles.photo}>
              <img src={store.user.data?.userProfile} alt="" />
            </div>
            <div className={styles.text}>
              <div className={styles.userData}>
                <div className={styles.name}>{store.user.data?.username}</div>
                <div className={styles.email}>{store.user.data?.email}</div>
              </div>
              <div className={styles.role}>{store.user.data?.userRole}</div>
            </div>
          </div>
          <div className={styles.btns}>
            <Button className={styles.editBtn} variant="contained">
              <DriveFileRenameOutlineIcon fontSize="small" />
              Edit profile
            </Button>
            <div className={styles.outBtns}>
              <Button
                className={styles.lockBtn}
                variant="contained"
                color="warning"
                onClick={handleLockScreen}
              >
                <LockIcon fontSize="small" />
                Lock screen
              </Button>
              <Button
                className={styles.logBtn}
                variant="contained"
                color="error"
                onClick={handleLogOut}
              >
                <LogoutIcon fontSize="small" />
                Log out
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.hr}></div>
        <h1 className={styles.shareCount}>
          <div className={styles.btn}>{services?.length} Services</div>
          <div className={styles.btn}>{blogs?.length} Blogs</div>
          <div className={styles.btn}>{portfolio?.length} Portfolio</div>
        </h1>
      </div>
    </>
  );
}

export default ProfileBar;
