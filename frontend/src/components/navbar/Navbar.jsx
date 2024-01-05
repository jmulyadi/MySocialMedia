import "./navbar.scss";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import MoonIcon from "@mui/icons-material/DarkModeOutlined";
import BoxesIcon from "@mui/icons-material/WidgetsOutlined";
import SunIcon from "@mui/icons-material/Brightness5Outlined";
import BellIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import PersonIcon from "@mui/icons-material/PersonAddAltOutlined";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { login, currentUser } = useContext(AuthContext);
  const [logout, setLogout] = useState(false);
  const userButtonRef = useRef(null);
  const navigate = useNavigate();

  const toggleLogout = () => {
    setLogout(!logout);
  };
  const handleClickOutside = (event) => {
    if (
      userButtonRef.current &&
      !userButtonRef.current.contains(event.target) &&
      !event.target.classList.contains("logout-option")
    ) {
      setLogout(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/auth/logout");
    navigate("/login");
  };
const handleProfile = () =>{
    navigate("/profile/" + currentUser.id)
}
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socially</span>
        </Link>
        <HomeIcon />
        {darkMode ? (
          <SunIcon onClick={toggle} />
        ) : (
          <MoonIcon onClick={toggle} />
        )}
        <BoxesIcon />
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="right">
        <PersonIcon />
        <EmailIcon />
        <BellIcon />
        <div className="user">
          <button ref={userButtonRef} onClick={toggleLogout}>
            <img src={currentUser.profilePic} alt=""></img>
            <span>{currentUser.name}</span>
          </button>
          {logout && (
            <div className="dropdown">
              <div className="logout-option" onClick={handleLogout}>
                Logout
              </div>
              <hr />
              <div className="profile-option" onClick={handleProfile}>
                Profile
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
