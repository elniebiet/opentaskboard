import React, { useState } from "react";
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";

const _sticky_note = (props) => {
    const [note_text, _set_note_text] = useState(props.text);
    const [is_editing, _set_is_editing] = useState(true);

    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();
        
    const STKNOTE_PERCENTAGE    = 0.15;
    const STKNOTE_MIN_WIDTH     = 150; //pixels

    let stknote_width = STKNOTE_PERCENTAGE * props.win_width;
    stknote_width = ( stknote_width < STKNOTE_MIN_WIDTH ) ? STKNOTE_MIN_WIDTH : stknote_width;
    const font_size = 0.08 * stknote_width;

    const _handle_note_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.note_update_func(clientX, clientY);
    };

    const _handle_note_drag_start = () => {
        _activate_note(true);
    }

    const _activate_note = (editing_note) => {
        _set_is_editing(editing_note);
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
    };

    const _deactivate_note = (e) => {
        _set_is_editing(false);
        _set_z_index(z_index - 1);
    };

    return (
        <Draggable onStart={_handle_note_drag_start} onStop={_handle_note_drag_over}>
            <div
                style={{
                    width: stknote_width + 'px',
                    minHeight: stknote_width + 'px',
                    backgroundColor: SELECTED_COLOR_THEME,
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                    cursor: "grab",
                    position: "absolute",
                    left: props.x_pos + 'px',
                    top: props.y_pos + 'px',
                    zIndex: z_index,
                }}
            >
                {is_editing ? (
                    <textarea
                        value={note_text}
                        onChange={(e) => _set_note_text(e.target.value)}
                        style={{
                            marginTop: (0.15 * stknote_width) + 'px',
                            width: stknote_width + 'px',
                            height: (stknote_width - (0.15 * stknote_width)) + 'px',
                            border: "none",
                            background: "transparent",
                            resize: "none",
                            fontSize: font_size + 'px',
                        }}
                        onBlur={_deactivate_note}
                        placeholder="Enter note here..."
                    />
                ) : (
                    <p 
                        style={{
                            marginTop: (0.15 * stknote_width) + 'px',
                            width: stknote_width + 'px',
                            height: (stknote_width - (0.15 * stknote_width)) + 'px',
                            border: "none",
                            background: "transparent",
                            resize: "none",
                            fontSize: font_size + 'px',
                        }}
                        onClick={() => _activate_note(true)}
                    >
                        {note_text}
                    </p>
                )}
                <div
                    style={{
                        position: "absolute",
                        top: (0.01 * stknote_width) + 'px',
                        right: (0.02 * stknote_width) + 'px',
                        background: SELECTED_COLOR_THEME,
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                    }}
                >
                    <IconButton aria-label="delete" size="small" onClick={() => props.on_delete(props.id)}>
                        <DeleteIcon fontSize="small" color="success" />
                    </IconButton>
                </div>
            </div>
        </Draggable>
    );
};

export default _sticky_note;
