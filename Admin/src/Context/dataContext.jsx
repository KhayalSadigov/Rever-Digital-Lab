import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const DataContext = createContext("");

function DataProvider({ children }) {

  const [sidebar, setSideBar] = useState(false)
  const [profileBar, setProfileBar] = useState(false)
  const [serviceAdd, setServiceAdd] = useState(false)
  const [location, setLocation] = useState("")
  const [user, setUser] = useState(null)
  
  let store = {
    user: {
      data: user,
      setData: setUser
    },
    sidebar: {
      data: sidebar,
      setData: setSideBar
    },
    profileBar: {
      data: profileBar,
      setData: setProfileBar
    },
    serviceAdd : {
      data: serviceAdd,
      setData: setServiceAdd
    },
    location: {
      data: location,
      setData: setLocation
    }
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
