import { Outlet } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import Header from "../Layout/Header";
import ProfileBar from "../Layout/ProfileBar";
import LockScreen from "../Layout/LockScreen";


function MainRout() {
  return (
    <>
      <LockScreen />
      <ProfileBar />
      <div style={{ display: 'flex', width: '100vw' }}>
        <SideBar />
        <div style={{ display: "flex", flexDirection: 'column', width: '100%' }}>
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainRout;
