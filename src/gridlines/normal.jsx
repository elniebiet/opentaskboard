import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import { SELECTED_COLOR_THEME } from "../common/globals";

const _gridlines_normal = (props) => {
  const container_style = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    backgroundColor: SELECTED_COLOR_THEME,
    zIndex: props.z_index,
  };

  const grid_lines = [];

  // generate vertical lines
  for (let x = 0; x < window.innerWidth; x += props.grid_size) {
    grid_lines.push(
        <div
            key={`v-${x/100}`}
            style={{
            position: "absolute",
            top: 0,
            left: x,
            width: 1,
            height: "100%",
            backgroundColor: props.line_color,
            zIndex: props.z_index,
            }}
        >
        </div>
    );
  }

  // generate horizontal lines
  for (let y = 0; y < window.innerHeight; y += props.grid_size) {
    grid_lines.push(
        <div
            key={`h-${y/100}`}
            style={{
            position: "absolute",
            left: 0,
            top: y,
            width: "100%",
            height: 1,
            backgroundColor: props.line_color,
            zIndex: props.z_index,
            }}
        >
        </div>
    );
  }

  return <div style={container_style}>{grid_lines}</div>;
};

export default _gridlines_normal;
