import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";
import { _colour_picker_round } from "../../common/components/colour_picker";
import { _get_complement_colour } from "../../common/utils";
import { _set_global_toolbar_items_active_state } from "../taskboard_definitions";
import { TOOLBAR_ITEMS } from "../../common/globals";
import { _delete_note, _update_note_loc, _update_note_text, _update_note_colour, _update_note_win_width_perc } from "../use_note";

/**
 * Sticky note component
 */
const _sticky_note = (props) => {

    const [is_editing, _set_is_editing] = useState(true);

    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();
    
    const [complement_colour, _set_complement_colour] = useState(_get_complement_colour(props.colour));

    const [is_resizing, _set_is_resizing] = useState(false);

    const [start_resize_loc, _set_start_resize_loc] = useState({ x: 0, y: 0 });

    const stk_location_ref = useRef(null);

    const STKNOTE_MIN_WIDTH                 = 150;  //pixels
    const MENUBAR_HGT_PERC                  = 0.10; // 10% of stknote height 
    const FLEXBOX_GAP_PERC                  = 0.02; // 2% of stknote height
    const FLEXBOX_TXTAREA_HGT_PERC          = 0.90; // 90% of stknote height
    const FONT_SIZE_PERC                    = 0.08; // 8% of stknote width
    const MENUBAR_ITEM_WIDTH_PERC           = 0.10; // 10% of stknote width
    const STKNOTE_TXTAREA_PADDG_PERC        = 0.05; // 5% of stknote width
    const STKNOTE_PARAGR_PADDG_PERC         = 0.15; // 15% of stknote width

    let stknote_width = props.win_width_perc * props.win_width;
    stknote_width = ( stknote_width < STKNOTE_MIN_WIDTH ) ? STKNOTE_MIN_WIDTH : stknote_width;
    const font_size = FONT_SIZE_PERC * stknote_width;
    let menubar_item_width   = MENUBAR_ITEM_WIDTH_PERC * stknote_width;

    const _handle_note_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.tb_item_loc_update_func(clientX, clientY);

        const {x, y} = _get_note_location();
        console.log("note location: " + x + " " + y);
        _update_note_loc(props.id, x, y);
    };

    const _handle_note_drag_start = () => {
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
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

    const _update_text = (updated_text) => { 
        _update_note_text(props.id, updated_text);
        props.taskboard_rerender_func();
    };

    const _update_colour = (updated_hex_colour_val) => {
        _update_note_colour(props.id, updated_hex_colour_val);
        _set_complement_colour(_get_complement_colour(updated_hex_colour_val));
        props.taskboard_rerender_func();
    };

    const _update_win_width_perc = (updated_win_width_perc) => {
        _update_note_win_width_perc(props.id, updated_win_width_perc);
        props.taskboard_rerender_func();
    };

    const _colour_picker_btn_clicked = () => { 
        _set_is_editing(false);
    };

    const _resizing_note_started = (e) => {
        _set_start_resize_loc({x: e.clientX, y: e.clientY});
        _set_is_editing(true);
        _set_is_resizing(true);
    };

    const _resizing_note_ended = (e) => {
        _set_is_resizing(false);
        const new_x = e.clientX;
        let new_width = stknote_width + (new_x - start_resize_loc.x);
        let new_win_width_perc =  new_width/props.win_width;
        _update_win_width_perc(new_win_width_perc);
    };

    const _delete = () => {
        _delete_note(props.id);
        props.taskboard_rerender_func();
    };

    const _get_note_location = () => {
        if (stk_location_ref.current) {
            const rect = stk_location_ref.current.getBoundingClientRect();
            return {x: rect.left, y: rect.top};
        }
        else
        {
            return {x: props.x_pos, y: props.y_pos}
        }
    };

    /********************* Effects block begin ***********************/
    // text area focus on editing
    const textarea_ref = useRef(null);
    useEffect(() => {
            if (is_editing && textarea_ref.current) {
                textarea_ref.current.focus();
            }
        }, [is_editing]
    );

    // mouse up resizing
    useEffect(() => {
        const _mouse_up_resizing = (e) => {
            if(is_resizing)
            {
                _set_is_resizing(false);
                _resizing_note_ended(e);
            }
        };
    
        window.addEventListener('mouseup', _mouse_up_resizing);
        return () => {
          window.removeEventListener('mouseup', _mouse_up_resizing);
        };
      }, [is_resizing]
    );
    /********************* Effects block ends ***********************/


    return (
        <Draggable 
            onStart={_handle_note_drag_start} 
            onStop={_handle_note_drag_over} 
            cancel=".resizer" // Prevent dragging when clicking on the resizer 
        >
            
            <div 
                ref={stk_location_ref}
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
                    gap: (FLEXBOX_GAP_PERC * stknote_width) + 'px',
                }}
                onClick={() => {_set_global_toolbar_items_active_state(TOOLBAR_ITEMS.TBI_STKNOTE, true, true)}}
            >
                {/* Resizer Handle */}
                <div 
                    className="resizer"
                    onMouseDown={_resizing_note_started}
                    style={{
                        width: "10px",
                        height: "10px",
                        background: complement_colour,
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        cursor: "nwse-resize",
                    }}
                />

                <div
                    id="stknote_menu_bar" 
                    style={{ 
                        flexBasis: MENUBAR_HGT_PERC * stknote_width + 'px', 
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERC * stknote_width) + 'px',
                        justifyContent: "flex-end",
                        background: props.colour,
                    }}
                >
                    <div
                        id="btn_stknote_colour"
                        style={{ 
                            flexBasis: menubar_item_width + 'px', 
                            height: MENUBAR_HGT_PERC * stknote_width + 'px',
                            width: menubar_item_width + 'px',
                            color: complement_colour
                        }}
                    >
                        <_colour_picker_round id={props.id} width={menubar_item_width} height={menubar_item_width} colour={complement_colour} x_pos={props.x_pos - stknote_width} y_pos={props.y_pos - stknote_width} 
                            update_colour_func={_update_colour} onclick_func={_colour_picker_btn_clicked}/>
                    </div>
                    <div
                        id="btn_stknote_delete"
                        style={{ 
                            flexBasis: menubar_item_width + 'px',
                            background: props.colour,
                            borderRadius: "50%",
                            cursor: "pointer",
                            height: MENUBAR_HGT_PERC * stknote_width + 'px',
                            width: menubar_item_width + 'px',
                        }}
                    >
                        <button 
                            style={{
                                height: "100%",
                                width: "100%",
                                fontSize: font_size + "px",
                                padding: "0",
                                margin: "0",
                                textAlign: "center",
                                fontWeight: "bold",
                                backgroundColor: props.colour,
                                color: complement_colour,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center", 
                                lineHeight: "1",
                            }}
                            onClick={() => _delete()}
                        >
                            X
                        </button>
                    </div>
                </div>
                <div
                    id="stknote_text_area"
                    style={{ 
                        flexBasis: FLEXBOX_TXTAREA_HGT_PERC * stknote_width + 'px', 
                    }}
                >
                    {is_editing ? (
                        <textarea
                            value={props.text}
                            onChange={(e) => _update_text(e.target.value)}
                            style={{
                                marginTop: (FLEXBOX_GAP_PERC * stknote_width) + 'px',
                                width: (stknote_width - (STKNOTE_TXTAREA_PADDG_PERC * stknote_width)) + 'px',
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
                                height: (stknote_width - (STKNOTE_PARAGR_PADDG_PERC * stknote_width)) + 'px',
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
