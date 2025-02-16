import React, { useState } from "react";
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";
import { _colour_picker_round } from "../../common/components/colour_picker";

//TODO: FIX BUG WITH NOTE COLOURS, REMOVE THIS COMMENT WHEN DONE
const _sticky_note = (props) => {
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
        props.tb_item_loc_update_func(clientX, clientY);
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

    const _update_note_text = (updated_text) => { 
        props.note_update_func(props.id, updated_text, props.colour);
    };

    const _update_note_colour = (updated_hex_colour_val) => {
        console.log("updating colour : " + updated_hex_colour_val);
        props.note_update_func(props.id, props.text, updated_hex_colour_val);
    };

    return (
        <Draggable onStart={_handle_note_drag_start} onStop={_handle_note_drag_over}>
            <div
                style={{
                    width: stknote_width + 'px',
                    minHeight: stknote_width + 'px',
                    backgroundColor: props.colour,
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
                        value={props.text}
                        onChange={(e) => _update_note_text(e.target.value)}
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
                        placeholder="note..."
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
                        {props.text}
                    </p>
                )}

                <div>
                    <div
                        style={{
                            position: "absolute",
                            top: (0.01 * stknote_width * 4) + 'px',
                            right: (0.02 * stknote_width * 10) + 'px',
                        }}
                    >
                        <_colour_picker_round id={props.id} width={20} height={20} colour={"#ff0000"} update_colour_func={_update_note_colour}/>
                    </div>

                    <div
                        style={{
                            position: "absolute",
                            top: (0.01 * stknote_width) + 'px',
                            right: (0.02 * stknote_width) + 'px',
                            background: props.colour,
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
            </div>
        </Draggable>
    );
};

export default _sticky_note;
