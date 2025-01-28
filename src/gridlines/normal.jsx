import React from "react";

const _gridlines_normal = ({ grid_size: grid_size = 100, line_color: line_color = "#E6E6E6" }) => {
  const container_style = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  };

  const grid_lines = [];

  // generate vertical lines
  for (let x = 0; x < window.innerWidth; x += grid_size) {
    grid_lines.push(
        <div
            key={`v-${x/100}`}
            style={{
            position: "absolute",
            top: 0,
            left: x,
            width: 1,
            height: "100%",
            backgroundColor: line_color,
            }}
        >
        </div>
    );
  }

  // generate horizontal lines
  for (let y = 0; y < window.innerHeight; y += grid_size) {
    grid_lines.push(
        <div
            key={`h-${y/100}`}
            style={{
            position: "absolute",
            left: 0,
            top: y,
            width: "100%",
            height: 1,
            backgroundColor: line_color,
            }}
        >
        </div>
    );
  }

  return <div style={container_style}>{grid_lines}</div>;
};

export default _gridlines_normal;
