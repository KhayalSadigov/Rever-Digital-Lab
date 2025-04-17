import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import Base_Url from "../Constant/base_url";

export const DataContext = createContext("");

function DataProvider({ children }) {
  const [sidebar, setSideBar] = useState(false);
  const [profileBar, setProfileBar] = useState(false);
  const [serviceAdd, setServiceAdd] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(false);
  const [services, setServices] = useState(null);
  const [filteredServices, setFilteredServices] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);

  const [lock, setLock] = useState(false);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(Base_Url + "/api/services").then((res) => {
      setServices(res.data);
      setFilteredServices(res.data);
    });
    axios.get(Base_Url + "/api/blogs").then((res) => {
      setBlogs(res.data);
      setFilteredBlogs(res.data);
    });
  }, []);

  let store = {
    user: {
      data: user,
      setData: setUser,
    },
    sidebar: {
      data: sidebar,
      setData: setSideBar,
    },
    profileBar: {
      data: profileBar,
      setData: setProfileBar,
    },
    services: {
      data: services,
      setData: setServices,
      filteredData: filteredServices,
      setFiltered: setFilteredServices,
    },
    serviceAdd: {
      data: serviceAdd,
      setData: setServiceAdd,
    },
    serviceEdit: {
      data: serviceEdit,
      setData: setServiceEdit,
    },

    blogs: {
      data: blogs,
      setData: setBlogs,
      filteredData: filteredBlogs,
      setFiltered: setFilteredBlogs,
    },
    // ===================
    location: {
      data: location,
      setData: setLocation,
    },
    lockScreen: {
      data: lock,
      setData: setLock,
    },
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
