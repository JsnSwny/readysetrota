import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const BasicList = ({getAction, items, attributes}) => {
    return (
        <table>
            <tr>
                <th><input type="checkbox"></input></th>
                {Object.keys(attributes).map(item => (
                    <Fragment>
                        <th>{item}</th>
                    </Fragment>
                ))}
            </tr>
            {items.map((item) => (
                <tr>
                    <td><input type="checkbox"></input></td>
                    {Object.values(attributes).map(attr => (           
                    <Fragment>
                        <td>{item[attr]}</td>
                    </Fragment>
                ))}
                </tr>
            ))}
            
        </table>
    )
}

export default BasicList;