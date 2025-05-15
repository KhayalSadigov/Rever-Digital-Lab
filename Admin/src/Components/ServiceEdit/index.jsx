import { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { DataContext } from "../../Context/dataContext";
import Button from "@mui/material/Button";
import ImageIcon from "@mui/icons-material/Image";
import IosShareIcon from "@mui/icons-material/IosShare";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Base_Url from "../../Constant/base_url";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

function EditService({ id, setId }) {
  const fileInputRef = useRef(null);
  const store = useContext(DataContext);
  const [data, setData] = useState(null);
  const [base64, setBase64] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (id)
      axios.get(Base_Url + `/api/services/${id}`).then((res) => {
        setData(res.data);
        setDesc(res.data.description);
        setTitle(res.data.title);
        setBase64(res.data.cover);
      });
  }, [id]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      setBase64(reader.result);
    };
  };

  function handleReset() {
    setBase64(null);
    setTitle(null);
    setDesc(null);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handDescChange(e) {
    setDesc(e.target.value);
  }

  function submitForm(e) {
    setLoader(true);
    e.preventDefault();
    let newData = {
      title: title,
      description: desc,
      cover: base64,
      owner: data.owner,
      ownerId: data.ownerId,
    };
    axios
      .patch(Base_Url + `/api/services/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("reverToken")}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#015F83",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes!",
        }).then((result) => {
          if (result.isConfirmed) {
            setLoader(false);
            setId(null);
            handleReset();
            let index = store.services.filteredData.findIndex(
              (e) => e.id == id
            );
            let newArr = [...store.services.filteredData];
            newArr[index] = { ...newData, id: id };
            console.log(newData);
            store.services.setFiltered(newArr);
            store.serviceEdit.setData(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      })
      .catch((e) => {
        Swal.fire({
          title: `${e.message}`,
          icon: "error",
          confirmButtonText: "ok",
        });
      });
  }
  return (
    <>
      <div
        onClick={() => {
          store.serviceEdit.setData(false);
        }}
        style={store.serviceEdit.data ? {} : { display: "none" }}
        className={styles.glass}
      ></div>

      <div
        style={store.serviceEdit.data ? {} : { height: "0", padding: "0" }}
        className={styles.modal}
      >
        <form
          className={styles.form}
          onSubmit={(e) => {
            submitForm(e);
          }}
        >
          <div className={styles.image}>
            <label htmlFor="image" className={styles.imageInp}>
              {base64 ? (
                <img src={base64} alt="image"></img>
              ) : (
                <p className={styles.imageText}>
                  <ImageIcon />
                  Select service cover
                </p>
              )}
            </label>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              name="image"
              id="image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <button
              onClick={() => {
                setBase64(null);
                fileInputRef.current.value = "";
              }}
              style={base64 ? {} : { backgroundColor: "grey" }}
              className={styles.delImage}
            >
              X
            </button>
          </div>
          <input
            type="text"
            value={title || ""}
            placeholder="Service title"
            onChange={(e) => {
              handleTitleChange(e);
            }}
            className={styles.input}
          />
          <textarea
            name=""
            id=""
            value={desc || ""}
            placeholder="Service description"
            onChange={(e) => {
              handDescChange(e);
            }}
          ></textarea>
          <div className={styles.btns}>
            <Button
              className={styles.btn}
              color="error"
              variant="contained"
              onClick={() => {
                setId(null), store.serviceEdit.setData(false);
              }}
            >
              <Tooltip title="Close" placement="top">
                <CancelPresentationIcon />
              </Tooltip>
            </Button>
            <Button
              className={styles.btn}
              color="warning"
              type="reset"
              variant="contained"
              onClick={() => {
                handleReset();
              }}
            >
              <Tooltip title="Reset" placement="top">
                <RestartAltIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} variant="contained" type="submit">
              <Tooltip title="Share" placement="top">
                {loader ? "load" : <IosShareIcon />}
              </Tooltip>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

EditService.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setId: PropTypes.func.isRequired,
};
export default EditService;
