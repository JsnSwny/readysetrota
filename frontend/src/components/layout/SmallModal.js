import React, { useRef } from "react";
import { useOnClickOutside } from "../../utils/hooks/useOnClickOutside";

const SmallModal = ({ title, open, setOpen, children }) => {
  const ref = useRef();
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div className={`modal-container ${open ? "open" : ""}`}>
      <div ref={ref} className="modal-sm">
        <div className="modal-sm__heading">
          <h3>{title}</h3>
          <i class="fas fa-times" onClick={() => setOpen(false)}></i>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default SmallModal;
