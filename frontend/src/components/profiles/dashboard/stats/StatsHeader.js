import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const StatsHeader = ({setStartDate, title, setEndDate, startDate, endDate, setBeforeDate, setAfterDate, currentFilter, setCurrentFilter, type}) => {

    const [pickerOpen, setPickerOpen] = useState(false);
    let user = useSelector((state) => state.auth.user);

    useEffect(() => {
        console.log("test")
        setPickerOpen(false);
    }, [currentFilter])

    return (
        <div className="stats__banner">
            <div className="stats__banner-container">
                <div>
                    <div className="stats__wrapper">

                    <p className="dashboard__block-title">{title}</p>
                        <i onClick={setBeforeDate} className="fas fa-chevron-left"></i>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                        />
                        -
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                        />
                            <i onClick={setAfterDate} className="fas fa-chevron-right"></i>
                        </div>
                    <div className="stats__picker">
                        {type == "business" && (
                            <Fragment>
                                <p onClick={() => setPickerOpen(!pickerOpen)} className="stats__picker-selected">{currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)} <i className="fas fa-sort-down"></i></p>
                            
                                <div className={`stats__dropper ${pickerOpen ? "open" : ""}`}>
                                    {user.business && <p className={`${currentFilter == "business" ? "active" : ""}`} onClick={() => setCurrentFilter("business")}>Business</p>}
                                    <p className={`${currentFilter == "site" ? "active" : ""}`} onClick={() => setCurrentFilter("site")}>Site</p>
                                    <p className={`${currentFilter == "department" ? "active" : ""}`} onClick={() => setCurrentFilter("department")}>Department</p>
                                </div>
                            </Fragment>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}   

export default StatsHeader;