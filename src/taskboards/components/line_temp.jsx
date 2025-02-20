import React, { useState } from "react";
import Draggable from "react-draggable";

/////////// TEMPORARY LINE //////////////////////////
//////// DELECT THIS FILE WHEN DONE /////////////////
const DraggableArrow = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable position={position} onDrag={handleDrag}>
      <svg
        width="100"
        height="50"
        viewBox="0 0 100 50"
        style={{ cursor: "grab", position: "absolute", top: 0, left: 0 }}
      >
        {/* Arrow Line */}
        <line x1="10" y1="25" x2="90" y2="25" stroke="black" strokeWidth="4" />
        
        {/* Arrowhead */}
        <polygon points="90,20 100,25 90,30" fill="black" />
      </svg>
    </Draggable>
  );
};

export default DraggableArrow;
