import React from "react";
import { useSelector, useDispatch } from "react-redux";

const NavPicker = ({items, current, name, action, navOpen, setNavOpen}) => {

    const dispatch = useDispatch();
    return (
        <div className={`sidenav__link-container pink ${navOpen == name ? "open" : ""}`}>
            <div className="sidenav__link">
                <div className="no-link">
                    <div className="sidenav__link-text">
                        <i className="fas fa-sitemap"></i> 
                        <div>
                            <p>{name}</p>
                            <small>{items.length > 0 && (items.find(item => item.id == current).name)}</small>
                        </div>
                    </div>
                    </div>
                    <i onClick={() => setNavOpen(`${navOpen != name ? name: ""}`)} className="fas fa-chevron-down"></i>

                </div>
            
            
            <div className="sidenav__sublinks">
                {items.map(item => (
                    <div key={item.id} onClick={() => current != item.id && dispatch(action(item.id))} className={`sidenav__link-container ${current == item.id ? "current" : ""}`}>
                        <div className={`sidenav__link no-link`}>
                            <div className="sidenav__link-text">
                                {item.name}
                            </div>
                        </div>
                    </div>
                ))}
                    
            </div>
        </div>
    )
}

export default NavPicker;