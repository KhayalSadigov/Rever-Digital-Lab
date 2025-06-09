import { useContext, useRef, useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";

function AddBlog({id,setId}) {
  const fileInputRef = useRef(null);
  const store = useContext(DataContext);
  const [data, setData] = useState({});
  const [base64, setBase64] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("salam");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(id)
    if (id)
      axios.get(Base_Url + `/api/blogs/${id}`).then((res) => {
        setData(res.data);
        setDesc(res.data.content);
        setTitle(res.data.title);
        setBase64(res.data.cover);
        setCategoryId(res.data.categoryId)
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
    setTitle("");
    setDesc("");
    setCategoryId("");
    setError(null);
  }

  function submitForm(e) {
    e.preventDefault();
    setLoader(true);
    if (!title) setError("Title is required!");
    else if (!desc) setError("Description is required!");
    else if (!base64) setError("Image is required!");
    else if (!categoryId) setError("Category is required!");
    else {
      setError(null);
      let newData = {
        title: title,
        content: desc,
        cover: base64,
        owner: store.user.data.username,
        ownerId: store.user.data.id,
        categoryId: categoryId,
        createDate: JSON.stringify(new Date()),
        likes: 0,
      };
      axios
        .patch(`${Base_Url}/api/blogs/${id}`, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("reverToken")}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setLoader(false);
          newData.id = res.data.id;
          store.blogs.setFiltered([...store.blogs.filteredData, newData]);
          Swal.fire("Success", "Blog successfully added!", "success");
          handleReset();
          store.blogEdit.setData(false);
        })
        .catch((err) => {
          setLoader(false);
          Swal.fire("Error", "Failed to add blog", "error");
          console.error(err);
        });
    }
  }

  return (
    <>
      <div
        onClick={() => store.blogEdit.setData(false)}
        style={store.blogEdit.data ? {} : { display: "none" }}
        className={styles.glass}
      ></div>

      <div
        style={store.blogEdit.data ? {} : { height: "0", padding: "0" }}
        className={styles.modal}
      >
        <form className={styles.form} onSubmit={submitForm}>
          <div className={styles.image}>
            <label htmlFor="image1" className={styles.imageInp}>
              {base64 ? (
                <img src={base64} alt="image" className={styles.img} />
              ) : (
                <p className={styles.imageText}>
                  <ImageIcon />
                  Select blog cover
                </p>
              )}
            </label>
            <input
              ref={fileInputRef}
              onChange={handleFileChange}
              id="image1"
              name="image1"
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
              type="button"
            >
              X
            </button>
          </div>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={styles.input}
          >
            <option value="" disabled hidden>
              Select blog category
            </option>
            {store.categories.data &&
              store.categories.data.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
          </select>

          <input
            type="text"
            value={title}
            placeholder="Blog title"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />

          <ReactQuill
            value={desc}
            onChange={setDesc}
            placeholder="Blog description"
            theme="snow"
            className={styles.quill}
          />

          <p className={styles.error}>{error}</p>

          <div className={styles.btns}>
            <Button
              className={styles.btn}
              color="error"
              variant="contained"
              onClick={() => store.blogAdd.setData(false)}
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
              onClick={handleReset}
            >
              <Tooltip title="Reset" placement="top">
                <RestartAltIcon />
              </Tooltip>
            </Button>
            <Button className={styles.btn} variant="contained" type="submit">
              <Tooltip title="Share" placement="top">
                {loader ? "Loading..." : <IosShareIcon />}
              </Tooltip>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddBlog;
