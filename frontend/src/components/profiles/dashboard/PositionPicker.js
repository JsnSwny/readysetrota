import React, { useEffect, useRef, useCallback, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from "react-redux";
import update from 'immutability-helper';
import { updatePositionIndex } from "../../../actions/employees";
import { toast } from "react-toastify";
import { TouchBackend } from "react-dnd-touch-backend";

const MovableItem = ({position, props, index, movePosition}) => {
  let employees = useSelector((state) => state.employees.employees);
  let current = useSelector((state) => state.employees.current);
  const { setOpen, setUpdate, setType } = props;
  let positions = useSelector(state => state.employees.positions)

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'position',
    hover(item, monitor) {
        if (!ref.current) {
            return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        movePosition(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'position', id: position.id, index },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }), 
  });

  const opacity = isDragging ? 0.3 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }} className={`dashboard__item--sm`}>
      <p className="title-md bold flex-container--between-center">
        {position.name}{" "}
        <i
          onClick={() => {
            setOpen(true);
            setUpdate(position);
            setType("Position");
          }}
          className="fas fa-edit"
        ></i>
      </p>
      <p className="subtitle-sm" style={{ flex: "0" }}>
        {current.site == 0 && `${position.department.name} - ${position.department.site.name}`}
      </p>
      <p className="subtitle-sm">
        {
          employees.filter((employee) =>
            employee.position.some(
              (item) => item.id == position.id
            )
          ).length
        }{" "}
        employees
      </p>
    </div>
  )
}


const PositionPicker = (props) => {
  const { setOpen, setUpdate, setType } = props;
  const dispatch = useDispatch();
  let positions = useSelector(state => state.employees.positions)
  let loading = useSelector((state) => state.loading);

  const [newPositions, setNewPositions] = useState([]);

  let positionsEqual = positions.some(item => item.order == null) ? false : newPositions.map(item => item.order).toString() == positions.map(item => item.order).toString();

  useEffect(() => {
    setNewPositions(positions.sort((a, b) => (a.order===null)-(b.order===null) ||a.order - b.order))
  }, [positions])

  const movePosition = useCallback((dragIndex, hoverIndex) => {
    const dragPosition = newPositions[dragIndex];
    setNewPositions(update(newPositions, {
        $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragPosition],
        ],
      }));
    }
    
    );

  const isMobile = window.innerWidth < 680;

  return (
    <div className="dashboard__block">
      <div className="dashboard__block-title-container">
        <div className="flex-container--align-center">
          <p className="dashboard__block-title">Positions</p>
          <i
            onClick={() => {
              setOpen(true);
              setUpdate(false);
              setType("Position");
            }}
            className="fas fa-plus"
          ></i>
        </div>   
      </div>
      <small class="helper-text">* Click and drag positions to reorder</small>
      {!positionsEqual && (
        <p className="subtitle-sm" style={{cursor:"pointer"}} onClick={() => {
          dispatch(updatePositionIndex(newPositions))
          toast.success("Position orders updated!")
        }}>
          <i className="fas fa-save"></i> Save Position Order</p>
      )}
      
      {loading.positions && <small className="loading-text">Loading positions...</small>}
      <div className="dashboard__wrapper">
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          {newPositions.map((item, i) => (
            <MovableItem key={item.id} position={item} props={props} index={i} movePosition={movePosition} />
          ))}
        </DndProvider>
      </div>
    </div>
  );
};

export default PositionPicker;
