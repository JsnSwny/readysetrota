import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import ShiftList from "./ShiftList";
import EmployeeList from "./EmployeeList";
import HolidayList from "./HolidayList";
import { toast } from "react-toastify";
import AbsenceList from "./AbsenceList";
import SiteOverviewList from "./SiteOverviewList";

const List = () => {
    const dispatch = useDispatch();
    const { type } = useParams();
    const titles = {"shifts": "Shift List", "employees": "Employees List", "holidays": "Holidays List", "absences": "Absence List", "siteOverview": "Site Overview"}
    
    
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const action = (message, action) => {
        if(selected.length == 0) {
            toast.error("You haven't selected any shifts");
            return false;
        } 
        toast.success(message)
        setSelected([])
        setSelectAll(false);
        dispatch(action)
    }

    const filter = (message, action) => {
        toast.success(message)
        setSelected([])
        setSelectAll(false);
        action();
        
    }

    const listProps = {action, selected, setSelected, selectAll, setSelectAll, filter};

    const component = {"shifts": <ShiftList listProps={listProps} />, "employees": <EmployeeList listProps={listProps} />, 
    "holidays": <HolidayList listProps={listProps} />, "absences": <AbsenceList listProps={listProps} />,
    "siteOverview": <SiteOverviewList listProps={listProps} />}

    return (
        <div className="list">
            <h1 className="header underline">{titles[type]}</h1>
            {component[type]}
        </div>
    )
}

export default List;