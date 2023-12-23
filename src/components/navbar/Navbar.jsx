import "./navbar.scss"
import HomeIcon from '@mui/icons-material/HomeOutlined';
import MoonIcon from '@mui/icons-material/DarkModeOutlined';
import BoxesIcon from '@mui/icons-material/WidgetsOutlined';
import SunIcon from '@mui/icons-material/Brightness5Outlined';
import BellIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PersonIcon from '@mui/icons-material/PersonAddAltOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { Link } from "react-router-dom";
import {useContext} from 'react'
import { DarkModeContext } from "../../context/darkModeContext";
const Navbar = () => {
    const {toggle, darkMode} = useContext(DarkModeContext)

    return(
        <div className = "navbar">
            <div className="left">
                <Link to = "/" style = {{textDecoration:"none"}}> 
                    <span>Socially</span>
                </Link>
                <HomeIcon/>
                {darkMode ? <SunIcon onClick = {toggle}/> : <MoonIcon onClick = {toggle}/>}
                <BoxesIcon/>
                <div className="search">
                    <SearchIcon/>
                    <input type = "text" placeholder="Search"></input>
                </div>
                
            </div>
            <div className="right">
                <PersonIcon/>
                <EmailIcon/>
                <BellIcon/>
                <div className="user">
                    <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt = ""></img>
                    <span>John Doe</span>
                </div>
            </div>
        </div>
    )
}
export default Navbar