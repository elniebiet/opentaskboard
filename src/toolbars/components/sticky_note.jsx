import React, { useState } from "react";
import Draggable from "react-draggable";

const _sticky_note = ({ id, text, on_delete: on_delete_func, x_pos, y_pos }) => {
  const [note_text, _set_note_text] = useState(text);
  const [is_editing, _set_is_editing] = useState(false);

  return (
    <Draggable>
      <div
        style={{
          width: "200px",
          minHeight: "150px",
          backgroundColor: "#FFEB3B",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
          cursor: "grab",
          position: "absolute",
          left: x_pos + 'px',
          top: y_pos + 'px',
        }}
      >
        {is_editing ? (
          <textarea
            autoFocus
            value={note_text}
            onChange={(e) => _set_note_text(e.target.value)}
            onBlur={() => _set_is_editing(false)}
            style={{
              width: "100%",
              height: "100px",
              border: "none",
              background: "transparent",
              resize: "none",
              fontSize: "16px",
            }}
          />
        ) : (
          <p onClick={() => _set_is_editing(true)}>{note_text}</p>
        )}
        <button
          onClick={() => on_delete_func(id)}
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </Draggable>
  );
};

export default _sticky_note;
