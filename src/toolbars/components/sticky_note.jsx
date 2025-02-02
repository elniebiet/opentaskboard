import React, { useState } from "react";
import Draggable from "react-draggable";

const _sticky_note = (props) => {
    const [note_text, _set_note_text] = useState(props.text);
    const [is_editing, _set_is_editing] = useState(false);
    
    const STKNOTE_PERCENTAGE = 0.15;
    const STKNOTE_MIN_WIDTH = 150; //pixels

    let stknote_width = STKNOTE_PERCENTAGE * props.win_width;
    stknote_width = ( stknote_width < STKNOTE_MIN_WIDTH ) ? STKNOTE_MIN_WIDTH : stknote_width;
    stknote_width += 'px';

    const _handle_note_drag = (e) => 
    {
        const {clientX, clientY} = e;
        props.note_update_func(clientX, clientY);
    };

    return (
        <Draggable onDrag={_handle_note_drag}>
            <div
                style={{
                width: stknote_width,
                minHeight: stknote_width,
                backgroundColor: "#FFEB3B",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                cursor: "grab",
                position: "absolute",
                left: props.x_pos + 'px',
                top: props.y_pos + 'px',
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
                    onClick={() => props.on_delete(props.id)}
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
