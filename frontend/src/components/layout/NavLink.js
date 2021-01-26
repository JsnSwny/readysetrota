import React from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
    const { link, icon, title, setSidebarOpen, sidebarOpen, toggleNav, disabled, dropdown, dropdownAction } = props
    return (
        <div className={`sidenav__link-container ${location.pathname == link ? "current" : ""} ${disabled ? "disabled" : ""}`}>
            <div className="sidenav__link">
            <Link onClick={() => {toggleNav()}} to={link}>
                
                    <div className="sidenav__link-text">
                        <i className={icon}></i> {title} 
                    </div>
                
            </Link>
            {dropdown && <i onClick={dropdownAction} class="fas fa-chevron-down"></i>}
            </div>
            
        </div>
    )
}
export default NavLink;