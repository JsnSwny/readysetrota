import React from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
    const { link, icon, title, setSidebarOpen, sidebarOpen } = props
    return (
        <div className={`sidenav__link-container ${location.pathname == link ? "current" : ""}`}>
            <Link onClick={() => {setSidebarOpen(!sidebarOpen)}} to={link}>
                <div className="sidenav__link">
                    <div className="sidenav__link-text">
                        <i class={icon}></i> {title}
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default NavLink;