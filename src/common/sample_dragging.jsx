import React, { useState } from "react";

const _drag_clone = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setIsDragging(true);

    // Set initial position for the ghost element
    const { clientX, clientY } = e;
    setDragPosition({ x: clientX, y: clientY });

    // Prevent the browser's default drag image
    e.dataTransfer.setDragImage(new Image(), 0, 0);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      // Update ghost element's position
      const { clientX, clientY } = e;
      setDragPosition({ x: clientX, y: clientY });
    }
  };

  const handleDragEnd = (e) => {
    setIsDragging(false);
    const { clientX, clientY } = e;
    console.log("final position: " + clientX + ", " + clientY);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent the default "red stop circle" cursor
    const { clientX, clientY } = e;
    console.log("current position: " + clientX + ", " + clientY);
  };

  return (
    <div
      onDragOver={handleDragOver} // Apply to the parent container
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Original Element */}
      <div
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "#1976d2",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          borderRadius: "8px",
        }}
      >
        Drag Me
      </div>

      {/* Ghost Element */}
      {isDragging && (
        <div
          style={{
            position: "fixed",
            top: dragPosition.y,
            left: dragPosition.x,
            width: "100px",
            height: "100px",
            backgroundColor: "#1976d2",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            pointerEvents: "none", // Ensures the ghost is not interactive // default "auto"
            opacity: 0.7, // Makes it slightly transparent
            transform: "translate(-50%, -50%)", // Centers the ghost under the cursor
          }}
        >
          Dragging...
        </div>
      )}
    </div>
  );
};

export default _drag_clone;
