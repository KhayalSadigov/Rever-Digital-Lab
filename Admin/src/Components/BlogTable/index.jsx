import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useContext, useState } from "react";
import axios from "axios";
import Base_Url from "../../Constant/base_url";
import styles from "./index.module.scss";
import Button from "@mui/material/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { DataContext } from "../../Context/dataContext";
import Swal from "sweetalert2";
import EditService from "../ServiceEdit";

export default function BlogTable() {
  const store = useContext(DataContext);
  const [id, setId] = useState(null);
  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#015F83",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(Base_Url + `/api/blogs/${id}`)
          .then(() => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successful!",
              showConfirmButton: false,
              timer: 1500,
            });
            store.blogs.setFiltered(
              store.blogs.data.filter((e) => {
                return e.id != id;
              })
            );
          })
          .catch((e) => {
            Swal.fire({
              title: `${e.message}`,
              icon: "error",
              confirmButtonText: "ok",
            });
          });
      }
    });
  }
  return (
    <>
      <EditService id={id} setId={setId} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">id</TableCell>
              <TableCell align="center">Cover</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell sx={{ width: "300px" }} align="center">
                Content
              </TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.blogs.filteredData &&
              store.blogs.filteredData?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">
                    <img className={styles.img} src={row.cover} alt="" />
                  </TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">
                    {row.content.slice(0, 150) + "..."}
                  </TableCell>
                  <TableCell align="center">{row.categoryName}</TableCell>
                  <TableCell align="center">{row.owner}</TableCell>
                  <TableCell align="center">
                    <div className={styles.btns}>
                      <Tooltip
                        title="Edit service"
                        placement="top"
                        onClick={() => {
                          setId(row.id);
                          store.serviceEdit.setData(true);
                        }}
                      >
                        <Button variant="contained" className={styles.btn}>
                          <BorderColorIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete service" placement="top">
                        <Button
                          variant="contained"
                          onClick={() => {
                            handleDelete(row.id);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
