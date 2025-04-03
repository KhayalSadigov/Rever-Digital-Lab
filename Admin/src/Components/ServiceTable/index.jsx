import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Base_Url from '../../Constant/base_url';
import styles from "./index.module.scss"
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

export default function ServiceTable() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(Base_Url + "/api/services").then((res) => {
            setData(res.data)
        })
    }, [])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">id</TableCell>
                        <TableCell align="center">Cover</TableCell>
                        <TableCell align="center">Title</TableCell>
                        <TableCell sx={{ width: "300px" }} align="center">Description</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                {row.id}
                            </TableCell>
                            <TableCell align="center">
                                <img className={styles.img} src={row.cover} alt="" />
                            </TableCell>
                            <TableCell align="center">{row.title}</TableCell>
                            <TableCell align="center">{row.description.slice(0, 150) + "..."}</TableCell>
                            <TableCell align="center">
                                <div className={styles.btns}>
                                    <Tooltip title="See service" placement='top'><Button variant="contained"><RemoveRedEyeIcon /></Button></Tooltip>
                                    <Tooltip title="Edit service" placement='top'><Button variant="contained" color='warning' ><BorderColorIcon /></Button></Tooltip>
                                    <Tooltip title="Delete service" placement='top'><Button variant="contained" color='error'><DeleteIcon /></Button></Tooltip>
                                </div>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

