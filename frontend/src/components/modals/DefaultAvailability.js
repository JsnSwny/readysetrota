import React, { useState, Fragment } from "react";
import DropButton from "../lists/DropButton";

const DefaultAvailability = ({currentSelector, setCurrentSelector, startTime, setStartTime, endTime, setEndTime, availability, setAvailability}) => {
    let minutes = ["00", "15", "30", "45"];
    let hours = [];
    for (let i = 0; i < 24; i++) {
        if (
        i.toString().length == 1
            ? minutes.map((minute) => hours.push("0" + i.toString() + ":" + minute))
            : minutes.map((minute) => hours.push(i.toString() + ":" + minute))
        );
    }


    const resetAction = {name: 'Reset', action: () => setCurrentSelector("unselected")};
    const availableAction = {name: 'Available', action: () => setCurrentSelector("available")};
    const partialAction = {name: 'Partial', action: () => setCurrentSelector("partial")};
    const unavailableAction = {name: 'Unavailable', action: () => setCurrentSelector("unavailable")};
    const holidayAction = {name: 'Holiday', action: () => setCurrentSelector("holiday")};

    const actionNames = {"unselected": "Reset", "available": "Available", "partial": "Partial", "unavailable": "Unavailable", "holiday": "Holiday"}

    

    const days = { 1: "M", 2: "T", 3: "W", 4: "T", 5: "F", 6: "S", 7: "S" };
    return (
        <Fragment>
                <DropButton title={actionNames[currentSelector]} actions={[resetAction, availableAction, partialAction, unavailableAction, holidayAction]} />

                <div
                className="dashboard__dates"
                style={{ marginBottom: "60px" }}
                >
                {[...Array(7)].map((e, i) => (
                    <div key={i} className="dashboard__dates-item">
                    <p
                        onClick={() => {
                        if (
                            currentSelector == "partial" &&
                            !(startTime && endTime)
                        ) {
                            toast.warning(
                            "You must set a start and end time when creating a partial availability!"
                            );
                        } else {
                            let obj = {}
                            setAvailability(availability.map(item, idx => idx == i ? obj : item))
                        }
                        }}
                        className={`${currentSelector} current-${availability[i].name}`}
                    >
                        {days[i + 1]}
                    </p>
                    </div>
                ))}
                </div>
                </Fragment>
    )
}

export default DefaultAvailability;