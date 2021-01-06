import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import NavLink from "./NavLink";

const SideNav = () => {
    const dispatch = useDispatch();

    let current = useSelector(
        (state) => state.employees.current
    );

    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let sites = useSelector((state) => state.employees.sites);
    let user = useSelector((state) => state.auth.user);

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

    if(!isAuthenticated) {
        return (
            <div className="sidenav">
                <div className="sidenav__links">
                    <NavLink link="/" icon="fas fa-home" title="Home" />
                    <NavLink link="/login" icon="fas fa-sign-in-alt" title="Login" />
                    <NavLink link="/register" icon="fas fa-user-plus" title="Register" />
                    <Link className="sidenav__logo--bottom" to="/">
                        <img src="/static/media/logo2-01.svg"></img>
                    </Link>
                </div>
            </div>
            
        )
    } else {
        return (
            <div className="sidenav">
                <div className="sidenav__profile-pic flex-container--center-vh">
                    {userName[0]}
                </div>
                <p className="sidenav__name">{userName}</p>
                <div className="sidenav__links">
                    <NavLink link="/" icon="fas fa-home" title="Dashboard" />
                    {isSiteAdmin(user.id) && <NavLink link="/staff-management" icon="fas fa-users-cog" title="Staff Management" />}
                    <NavLink link="/rota" icon="fas fa-briefcase" title="Rota" />

                    <div className={`sidenav__link-container ${location.pathname == "/profile" ? "current" : ""}`}>
                        <NavLink link="/profile" icon="fas fa-user" title="Profile" />
                        <div className="sidenav__sublinks">
                            <div onClick={() => {
                                    dispatch(logout());
                                }} 
                                className={`sidenav__link ${location.pathname == "/logout" ? "current" : ""}`}>
                                <div className="sidenav__link-text">
                                    <i class="fas fa-sign-out-alt"></i> Logout
                                </div>
                            </div>
                            <NavLink link="/changepassword" icon="fas fa-lock" title="Change password" />
                        </div>
                    </div>
                    {!user.business && <NavLink link="/join" icon="fas fa-user-plus" title="Join" />}
                    <Link className="sidenav__logo--bottom" to="/">
                        <img src="/static/media/logo2-01.svg"></img>
                    </Link>
                </div>
            </div>
        )
    }
}

export default SideNav;