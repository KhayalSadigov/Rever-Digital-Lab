import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DataContext } from "../../Context/dataContext";
import Base_Url from "../../Constant/base_url";
import axios from "axios";

function BlogsPage() {
    const store = useContext(DataContext)
    const location = useLocation();
    store.location.setData(location.pathname)
    useEffect(() => {
        store.location.setData(location.pathname)
        axios.post(Base_Url + "/login/admin/check", { token: localStorage.getItem("reverToken") }).then(() => {
            if (!store.user.data) {
                axios.get(Base_Url + `/api/users/${localStorage.getItem('reverId')}`).then((res) => {
                    store.user.setData(res.data)
                })
            }
        }).catch(() => {
            window.location.replace('/')
        })

    }, [])
    return (
        <div>BlogsPage</div>
    )
}

export default BlogsPage