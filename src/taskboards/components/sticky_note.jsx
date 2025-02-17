import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";
import { _colour_picker_round } from "../../common/components/colour_picker";
import { _get_complement_colour } from "../../common/utils";

const _sticky_note = (props) => {
    const [is_editing, _set_is_editing] = useState(true);

    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();
    
    const [complement_colour, _set_complement_colour] = useState(_get_complement_colour(props.colour));

    const STKNOTE_PERCENTAGE                = 0.15;
    const STKNOTE_MIN_WIDTH                 = 150; //pixels
    const MENU_BAR_HGT_PERCENTAGE           = 0.10; // 10% of stknote height 
    const FLEXBOX_GAP_PERCENTAGE            = 0.02; // 2% of stknote height
    const FLEXBOX_TXTAREA_HGT_PERCENTAGE    = 0.90; // 90% of stknote height

    let stknote_width = STKNOTE_PERCENTAGE * props.win_width;
    stknote_width = ( stknote_width < STKNOTE_MIN_WIDTH ) ? STKNOTE_MIN_WIDTH : stknote_width;
    const font_size = 0.08 * stknote_width;
    let menubar_item_width   = 0.10 * stknote_width; // 10% of stknote width 

    const _handle_note_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.tb_item_loc_update_func(clientX, clientY);
    };

    const _handle_note_drag_start = () => {
        ;
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
        props.note_update_func(props.id, props.text, updated_hex_colour_val);
        _set_complement_colour(_get_complement_colour(updated_hex_colour_val));
    };

    const _colour_picker_btn_clicked = () => { 
        _set_is_editing(false);
    };


    // Effects
    const textarea_ref = useRef(null);
    useEffect(() => {
        if (is_editing && textarea_ref.current) {
            textarea_ref.current.focus();
        }
    }, [is_editing]);


    return (
        <Draggable onStart={_handle_note_drag_start} onStop={_handle_note_drag_over}>
            <div 
                id="stknote_root"
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
                    display: "flex",
                    flexDirection: "column",
                    gap: (FLEXBOX_GAP_PERCENTAGE * stknote_width) + 'px',
                }}
            >
                <div
                    id="stknote_menu_bar" 
                    style={{ 
                        flexBasis: MENU_BAR_HGT_PERCENTAGE * stknote_width + 'px', 
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERCENTAGE * stknote_width) + 'px',
                        justifyContent: "flex-end",
                        background: props.colour,
                    }}
                >
                    <div
                        id="btn_stknote_colour"
                        style={{ 
                            flexBasis: menubar_item_width + 'px', 
                        }}
                    >
                        <_colour_picker_round id={props.id} width={menubar_item_width} height={menubar_item_width} colour={complement_colour} x_pos={props.x_pos - stknote_width} y_pos={props.y_pos - stknote_width} 
                            update_colour_func={_update_note_colour} onclick_func={_colour_picker_btn_clicked}/>
                    </div>
                    <div
                        id="btn_stknote_delete"
                        style={{ 
                            flexBasis: menubar_item_width + 'px',
                            background: props.colour,
                            color: "white",
                            borderRadius: "50%",
                            cursor: "pointer",
                        }}
                    >
                        <IconButton aria-label="delete" size="small" onClick={() => props.on_delete(props.id)}>
                            <DeleteIcon fontSize="small" color="success" />
                        </IconButton>
                    </div>
                </div>
                <div
                    style={{ 
                        flexBasis: FLEXBOX_TXTAREA_HGT_PERCENTAGE * stknote_width + 'px', 
                    }}
                >
                    {is_editing ? (
                        <textarea
                            value={props.text}
                            onChange={(e) => _update_note_text(e.target.value)}
                            style={{
                                marginTop: (FLEXBOX_GAP_PERCENTAGE * stknote_width) + 'px',
                                width: (stknote_width - (0.05 * stknote_width)) + 'px',
                                height: stknote_width + 'px',
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                resize: "none",
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            onBlur={_deactivate_note}
                            placeholder="note..."
                            ref={textarea_ref}
                        />
                    ) : (
                        <p 
                            style={{
                                marginTop: (0.15 * stknote_width) + 'px',
                                width: stknote_width + 'px',
                                height: (stknote_width - (0.15 * stknote_width)) + 'px',
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                resize: "none",
                                fontSize: font_size + 'px',
                                color: complement_colour
                            }}
                            onClick={() => _activate_note(true)}
                        >
                            {props.text}
                        </p>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default _sticky_note;
