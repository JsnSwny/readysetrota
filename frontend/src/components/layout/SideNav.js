import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import NavLink from "./NavLink";

const SideNav = ({sidebarOpen, setSidebarOpen}) => {
    const dispatch = useDispatch();

    let current = useSelector(
        (state) => state.employees.current
    );

    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let sites = useSelector((state) => state.employees.sites);
    let user = useSelector((state) => state.auth.user);
    let width = useSelector((state) => state.responsive.width);

    const location = useLocation();

    const [userName, setUserName] = useState("");

    const isSiteAdmin = (user_id) => {
        return sites.find(site => site.id == current.site) ? (sites.find(site => site.id == current.site).admins.includes(user_id) || user.business) : false;
    }


    useEffect(() => {
        if(user) {
            user.business ?
                setUserName(user.business.name) : setUserName(`${user.email}`);
        }
    }, [user]);

    const toggleNav = () => {
        width < 1000 && setSidebarOpen(!sidebarOpen)
    }

    const sidenavProps = {setSidebarOpen, sidebarOpen};

    if(!isAuthenticated) {
        return (
            <div className={`sidenav ${sidebarOpen ? "open" : ""}`}>
                <i onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                }} class={`fas fa-bars`}></i>
                <div className="sidenav__content">
                    <div className="sidenav__links">
                        <NavLink  toggleNav={toggleNav} link="/" icon="fas fa-home" title="Home" />
                        <NavLink toggleNav={toggleNav} link="/login" icon="fas fa-sign-in-alt" title="Login" />
                        <NavLink toggleNav={toggleNav} link="/register" icon="fas fa-user-plus" title="Register" />
                        <Link onClick={() => {toggleNav()}} className="sidenav__logo--bottom" to="/">
                            <img src="/static/media/logo2-01.svg"></img>
                        </Link>
                    </div>
                </div>
            </div>
            
        )
    } else {
        return (
            <div className={`sidenav ${sidebarOpen ? "open" : ""}`}>
                <i onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                }} class={`fas fa-bars`}></i>
                <div className="sidenav__content">
                    <div className="sidenav__profile-pic flex-container--center-vh">
                        {userName[0]}
                    </div>
                    <p className="sidenav__name">{userName}</p>
                    <div className="sidenav__links">
                        <NavLink toggleNav={toggleNav} link="/" icon="fas fa-home" title="Dashboard" />
                        {isSiteAdmin(user.id) && <NavLink toggleNav={toggleNav} link="/staff-management" icon="fas fa-users-cog" title="Staff Management" />}
                        <NavLink toggleNav={toggleNav}  link="/rota" icon="fas fa-briefcase" title="Rota" />

                        <div className={`sidenav__link-container ${location.pathname == "/profile" ? "current" : ""}`}>
                            <NavLink toggleNav={toggleNav} link="/profile" icon="fas fa-user" title="Profile" />
                            <div className="sidenav__sublinks">
                                <div onClick={() => {
                                        dispatch(logout());
                                    }} 
                                    className={`sidenav__link ${location.pathname == "/logout" ? "current" : ""}`}>
                                    <div className="sidenav__link-text">
                                        <i class="fas fa-sign-out-alt"></i> Logout
                                    </div>
                                </div>
                                <NavLink toggleNav={toggleNav} link="/changepassword" icon="fas fa-lock" title="Change password" />
                            </div>
                        </div>
                        {!user.business && <NavLink toggleNav={toggleNav} link="/join" icon="fas fa-user-plus" title="Join" />}
                        <Link onClick={() => {toggleNav()}} className="sidenav__logo--bottom" to="/">
                            <img src="/static/media/logo2-01.svg"></img>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SideNav;