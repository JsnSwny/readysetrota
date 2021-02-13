import React from "react";
import { useSelector } from "react-redux";
import { Item } from "semantic-ui-react";

const TrafficItem = ({title, condition, trafficSite, setTrafficSite}) => {
    let sites = useSelector((state) => state.employees.sites);
    let trafficIndex = sites.indexOf(trafficSite);
    
    return(
        <div className="box">
            {title}
            {condition ? <i className="fas fa-times box__icon-center"></i> : <i className="fas fa-check box__icon-center"></i>}
            <ul className="box__cycle">
                {trafficIndex != 0 ? <li onClick={() => setTrafficSite(sites[trafficIndex - 1])}>{sites[trafficIndex - 1].name}</li> : <li></li>}
                <li className="selected">{trafficSite.name}</li>
                {trafficIndex != sites.length - 1 ? <li onClick={() => setTrafficSite(sites[trafficIndex+1])}>{sites[trafficIndex+1].name}</li> : <li></li>}           
            </ul>
        </div>
    )
}

export default TrafficItem;