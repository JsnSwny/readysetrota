import React, { Fragment } from "react";
import { useSelector } from "react-redux";

const PositionField = (props) => {
  const { departments, position, positions, setPosition, many } = props;
  let errors = useSelector((state) => state.errors.msg);
  return (
    <Fragment>
      {departments.map(
        (dep) =>
          positions.filter((pos) => pos.department.id == dep.id).length > 0 && (
            <Fragment key={dep.id}>
              <strong>{dep.name}</strong>
              <div className="flex-container--wrap">
                {positions.map(
                  (pos) =>
                    pos.department.id == dep.id && (
                      <p
                        key={pos.id}
                        onClick={() => {
                          !many &&
                          position.some(
                            (item) =>
                              item.id != pos.id &&
                              item.department.id == pos.department.id
                          )
                            ? setPosition([
                                ...position.filter(
                                  (item) =>
                                    item.department.id != pos.department.id
                                ),
                                pos,
                              ])
                            : position.some((item) => item.id == pos.id)
                            ? setPosition(
                                position.filter((item) => item.id != pos.id)
                              )
                            : setPosition([...position, pos]);
                        }}
                        className={`btn-toggle--sm ${
                          position.some((item) => item.id == pos.id)
                            ? "active"
                            : ""
                        } ${
                          !many &&
                          position.some(
                            (item) =>
                              item.id != pos.id &&
                              item.department.id == pos.department.id
                          )
                            ? "disabled"
                            : ""
                        }`}
                      >
                        {pos.name}
                      </p>
                    )
                )}
              </div>
            </Fragment>
          )
      )}
      <p className="error">{errors.positions}</p>
    </Fragment>
  );
};

export default PositionField;
