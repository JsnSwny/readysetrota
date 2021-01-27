import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import NavLink from "./NavLink";
import { cancelSubscription } from "../../actions/payments";
import { toast } from "react-toastify";
import { getCustomer } from "../../actions/payments";

const SideNav = ({sidebarOpen, setSidebarOpen, confirmProps}) => {
    const dispatch = useDispatch();


    let business = useSelector((state) => state.employees.business);
    const { setConfirmOpen, setOnConfirm, setMessage } = confirmProps;

    let current = useSelector(
        (state) => state.employees.current
    );

    let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    let sites = useSelector((state) => state.employees.sites);
    let user = useSelector((state) => state.auth.user);
    let width = useSelector((state) => state.responsive.width);
    let subscription = useSelector((state) => state.payments.subscription)
    let employees = useSelector((state) => state.employees.employees)
    let departments = useSelector((state) => state.employees.departments)

    const location = useLocation();

    const [userName, setUserName] = useState("");
    const [navOpen, setNavOpen] = useState("")

    let siteAdmin = useSelector((state) => state.employees.site_admin);

    useEffect(() => {
        if(user) {
            user.business ?
                setUserName(user.business.name) : setUserName(`${user.email}`);
            if(user.profile) {
                dispatch(getCustomer(user.profile.stripe_id))
            }
            
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
                }} className={`fas fa-bars`}></i>
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
                }} className={`fas fa-bars`}></i>
                <div className="sidenav__content">
                    <div className="sidenav__profile-pic flex-container--center-vh">
                        {userName[0]}
                    </div>
                    <p className="sidenav__name">{userName}</p>
                    {user.business && (
                        <Fragment>
                            <small className="flex-container--center">Plan: {user.business.plan == "F" ? "Free" : "Premium"}</small>
                            <small className="flex-container--center">Employees: {business.number_of_employees}/{business.total_employees}</small>
                        </Fragment>
                    )}
                    <div className="sidenav__links">
                        <div className={`sidenav__link-container ${navOpen == 'dashboard' ? "open" : ""}`}>
                            <NavLink toggleNav={toggleNav} link="/" icon="fas fa-home" title="Dashboard" dropdown={siteAdmin && !user.business} dropdownAction={() => setNavOpen(`${navOpen != "dashboard" ? "dashboard" : ""}`)} />
                            <div className="sidenav__sublinks">
                            {siteAdmin && !user.business && <NavLink toggleNav={toggleNav} link="/admin-panel" icon="fas fa-user-shield" title="Admin Panel" />}
                            </div>
                        </div>
                        {siteAdmin && <NavLink toggleNav={toggleNav} link="/staff-management" icon="fas fa-users-cog" title="Staff Management" />}
                        <NavLink toggleNav={toggleNav}  link="/rota" icon="fas fa-briefcase" title="Rota" disabled={employees.length == 0} />

                        {/* <div className={`sidenav__link-container ${location.pathname == "/profile" ? "current" : ""}`}> */}
                        <div className={`sidenav__link-container ${navOpen == 'settings' ? "open" : ""}`}>
                            
                                <div className="sidenav__link">
                                <div className="no-link">
                                    <div className="sidenav__link-text">
                                        <i className='fas fa-cogs'></i> Settings
                                    </div>
                                    </div>
                                    <i onClick={() => setNavOpen(`${navOpen != "settings" ? "settings": ""}`)} className="fas fa-chevron-down"></i>

                                </div>
                            
                            
                            <div className="sidenav__sublinks">
                                <NavLink toggleNav={toggleNav} link="/changepassword" icon="fas fa-lock" title="Change password" />
                                {!user.business && <NavLink toggleNav={toggleNav} link="/join" icon="fas fa-user-plus" title="Join" />}
                                {subscription && !subscription.cancel_at_period_end && user.profile && (
                                    <div className={`sidenav__link-container`}>
                                        <div onClick={() => {
                                            setConfirmOpen(true);
                                            setMessage("Are you sure you want to cancel your premium subscription? (Your premium will continue until)")
                                            setOnConfirm(() => () => {
                                                setConfirmOpen(false)
                                                dispatch(cancelSubscription(user.profile.stripe_id));
                                                toast.success("Your premium subscription has been cancelled")
                                            })
                                            
                                        }} className="sidenav__link">
                                            <div className="sidenav__link-text">
                                                <i className="fas fa-times"></i> Cancel Premium
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {user.business && user.profile && <NavLink toggleNav={toggleNav} link="/premium" icon="fas fa-gem" title="Premium" disabled={user.business.plan == "P"} />}
                        <div onClick={() => {
                                dispatch(logout());
                            }} 
                            className={`sidenav__link no-link ${location.pathname == "/logout" ? "current" : ""}`}>
                            <div className="sidenav__link-text">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </div>
                        </div>
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