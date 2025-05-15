import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import Base_Url from "../Constant/base_url";

export const DataContext = createContext();

function DataProvider({ children }) {
  const [sidebar, setSideBar] = useState(false);
  const [profileBar, setProfileBar] = useState(false);
  const [serviceAdd, setServiceAdd] = useState(false);
  const [serviceEdit, setServiceEdit] = useState(false);
  const [services, setServices] = useState(null);
  const [filteredServices, setFilteredServices] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [blogEdit, setBlogEdit] = useState(false);
  const [blogAdd, setBlogAdd] = useState(false);
  const [lock, setLock] = useState(false);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, blogsRes, categoryRes] = await Promise.all([
          axios.get(`${Base_Url}/api/services`),
          axios.get(`${Base_Url}/api/blogs`),
          axios.get(`${Base_Url}/api/categories`),
        ]);
        setServices(servicesRes.data);
        setFilteredServices(servicesRes.data);
        setBlogs(blogsRes.data);
        setFilteredBlogs(blogsRes.data);
        setCategories(categoryRes.data);
        console.log(categories);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  const store = {
    user: { data: user, setData: setUser },
    sidebar: { data: sidebar, setData: setSideBar },
    profileBar: { data: profileBar, setData: setProfileBar },
    services: {
      data: services,
      setData: setServices,
      filteredData: filteredServices,
      setFiltered: setFilteredServices,
    },
    serviceAdd: { data: serviceAdd, setData: setServiceAdd },
    serviceEdit: { data: serviceEdit, setData: setServiceEdit },
    blogs: {
      data: blogs,
      setData: setBlogs,
      filteredData: filteredBlogs,
      setFiltered: setFilteredBlogs,
    },
    blogEdit: { data: blogEdit, setData: setBlogEdit },
    blogAdd: { data: blogAdd, setData: setBlogAdd },
    location: { data: location, setData: setLocation },
    lockScreen: { data: lock, setData: setLock },
    categories: {
      data: categories,
      setData: setCategories,
    },
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
