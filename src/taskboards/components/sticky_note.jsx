import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { _get_max_z_index, _use_max_z_index, SELECTED_COLOR_THEME } from "../../common/globals";
import { _get_complement_colour } from "../../common/utils";
import { _set_global_toolbar_items_active_state } from "../taskboard_globals";
import { TASKBOARD_TOOLBAR_ITEMS } from "../../toolbars/toolbar_globals";
import { _delete_note, _update_note_loc, _update_note_text, _update_note_colour, _update_note_win_width_perc,
            _get_note_win_width_perc, _update_note_active_state, _update_note_toolbar_show, _update_note_toolbar_loc,
            _update_note_highlighted } from "../use_note";
import _note_toolbar from "../../toolbars/note_toolbar";
import { _colour_picker_no_button } from "../../common/components/colour_picker";
import { HIGHLIGHT_PARAMS } from "../../common/globals";
import _highlighter from "../../common/components/highlighter";
import { HIGHLIGHT_DRAG_DIRECTION } from "../../common/globals";

/**
 * Sticky note component
 */
const _sticky_note = (props) => {

    const [is_editing, _set_is_editing] = useState(false);

    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();
    
    const [complement_colour, _set_complement_colour] = useState(_get_complement_colour(props.colour));

    const stk_root_location_ref = useRef(null);

    const textarea_ref = useRef(null);

    const [root_div_position, _set_root_div_position] = useState({x: props.x_pos, y: props.y_pos});

    const [prevent_note_deactivation, _set_prevent_note_deactivation] = useState(false); 

    const STKNOTE_MIN_WIDTH                 = 150;  //pixels
    const MENUBAR_HGT_PERC                  = 0.10; // 10% of stknote height 
    const FLEXBOX_GAP_PERC                  = 0.02; // 2% of stknote height
    const FLEXBOX_TXTAREA_HGT_PERC          = 0.90; // 90% of stknote height
    const FONT_SIZE_PERC                    = 0.08; // 8% of stknote width
    const MENUBAR_ITEM_WIDTH_PERC           = 0.10; // 10% of stknote width
    const STKNOTE_TXTAREA_PADDG_PERC        = 0.05; // 5% of stknote width
    const STKNOTE_PARAGR_PADDG_PERC         = 0.15; // 15% of stknote width
    const TOOLBAR_NOTE_GAP_TOP_PERC         = 0.4;  // percentage of stknote width 
    const TOOLBAR_NOTE_GAP_LEFT_PERC        = 0.01; // percentage of stknote width

    let stknote_width = props.win_width_perc * props.win_width;
    stknote_width = ( stknote_width < STKNOTE_MIN_WIDTH ) ? STKNOTE_MIN_WIDTH : stknote_width;
    const font_size = FONT_SIZE_PERC * stknote_width;
    let menubar_item_width   = MENUBAR_ITEM_WIDTH_PERC * stknote_width;
    let toolbar_note_gap_top_px = TOOLBAR_NOTE_GAP_TOP_PERC * stknote_width;
    let toolbar_note_gap_left_px = TOOLBAR_NOTE_GAP_LEFT_PERC * stknote_width; 

    const _handle_note_drag_over = (e) =>   
    {
        const {x, y} = _get_note_location_top_left();
        props.tb_item_loc_update_func(x, y);    // last taskboard item moved location update
        _update_note_loc(props.id, x, y);
        props.taskboard_rerender_func();
    };

    const _handle_note_drag_start = () => {
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
    }

    const _activate_note = (editing_note) => {
        _set_is_editing(editing_note);
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
        _update_note_active_state(props.id, true);
        _update_note_highlighted(props.id, true);
        _update_note_toolbar_loc(props.id, 300, 300);
        _update_note_toolbar_show(props.id, true);
        props.taskboard_rerender_func();
    };

    const _deactivate_note = (e) => {
        e.preventDefault();
        if(prevent_note_deactivation === false)
        {
            _set_is_editing(false);
            _set_z_index(z_index - 1);
            _update_note_active_state(props.id, false);
            _update_note_highlighted(props.id, false);
            _update_note_toolbar_show(props.id, false);
            props.taskboard_rerender_func();
        }
        else
        {
            _set_prevent_note_deactivation(false);
            textarea_ref.current.focus();
        }
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

    const _delete = () => {
        _update_note_toolbar_show(props.id, false);
        _delete_note(props.id);
        props.taskboard_rerender_func();
    };

    const _get_note_location_top_left = () => {
        if (stk_root_location_ref.current) {
            const rect = stk_root_location_ref.current.getBoundingClientRect();
            return {x: rect.left, y: rect.top};
        }
        else
        {
            return {x: props.x_pos, y: props.y_pos}
        }
    };

    const _toolbar_item_clicked_notif = (item_clicked) => {
        _set_prevent_note_deactivation(true);
        props.taskboard_rerender_func();
    };

    const _highlighter_mouse_down = (drag_direction) => {
        _set_prevent_note_deactivation(true);
        props.taskboard_rerender_func();

        switch(drag_direction)
        {
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
            {
                _set_is_editing(true);                
                break;
            }
            default:
            {
                break;
            }
         }
    };

    // TODO: implement update for on mouse drag - not only on mouse up
    const _highlighter_mouse_drag = (drag_direction, percentage_width_increase, percentage_height_increase) => {
        _set_prevent_note_deactivation(true);
        props.taskboard_rerender_func();
        
        switch(drag_direction)
        {
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
            {
                break;
            }
            default:
            {
                break;
            }
         }
    };

    const _highlighter_mouse_up = (drag_direction, percentage_width_increase, percentage_height_increase) => {
        _set_prevent_note_deactivation(true);
        props.taskboard_rerender_func();

        switch(drag_direction)
        {
            case HIGHLIGHT_DRAG_DIRECTION.BOTTOM_RIGHT:
            {
                let current_width_perc = _get_note_win_width_perc(props.id);
                let increase = (percentage_width_increase / 100) * current_width_perc;
                console.log("current width perc: " + current_width_perc + " percentage increase: " + increase);
                let new_win_width_perc = current_width_perc + increase;
                _update_note_win_width_perc(props.id, new_win_width_perc);
                props.taskboard_rerender_func();

                break;
            }
            case HIGHLIGHT_DRAG_DIRECTION.TOP_LEFT:
            {
                // calculate new width and height
                let current_width_perc = _get_note_win_width_perc(props.id);
                let increase = (percentage_width_increase / 100) * current_width_perc;
                let new_win_width_perc = current_width_perc + increase;
                _update_note_win_width_perc(props.id, new_win_width_perc);

                // calculate new top left position
                let current_root_div_pos = root_div_position;
                let new_x_pos = current_root_div_pos.x - (percentage_width_increase / 100) * stknote_width;
                let new_y_pos = current_root_div_pos.y - (percentage_height_increase / 100) * stknote_width;
                _set_root_div_position({x: new_x_pos, y: new_y_pos});
                _update_note_loc(props.id, new_x_pos, new_y_pos);
                props.taskboard_rerender_func();

                break;
            }
            default:
            {
                break;
            }
         }
    };

    // current toolbar top left position
    const {x, y} = _get_note_location_top_left();

    // toolbar position
    let toolbar_x_pos = x + toolbar_note_gap_left_px;
    let toolbar_y_pos = y - toolbar_note_gap_top_px;

    /********************* Effects block begin ***********************/
    // text area focus on editing
    useEffect(() => {
            if (is_editing && textarea_ref.current) {
                textarea_ref.current.focus();
                textarea_ref.current.setSelectionRange(0, props.text.length); // highlight text
            }
        }, [is_editing]
    );
    /********************* Effects block ends ***********************/

    const _do_nothing = () => {
        ;
    };

    return (
        <div>
            {/* display note toolbar */}
            <div>
                {(props.show_toolbar === true) ? (
                    <_note_toolbar note_id={props.id} win_width={props.win_width} win_height={props.win_height} x_pos={toolbar_x_pos} y_pos={toolbar_y_pos}
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state={props.request_taskboard_state} note_toolbar_item_clicked={_toolbar_item_clicked_notif}
                    note_colour_picker_btn_clicked_func={_colour_picker_btn_clicked} note_update_colour_func={_update_colour} note_bg_colour={props.colour}
                    />) : (<div></div>)
                }
            </div>
            {/* display highlighter */}
            <div>
                {(props.highlighted === true) ? (
                    <_highlighter gap={HIGHLIGHT_PARAMS.highlight_gap} line_width={HIGHLIGHT_PARAMS.highlight_line_width} item_top_left_pos={{x: x, y: y}} item_width={stknote_width + (FLEXBOX_GAP_PERC * stknote_width * 4)} 
                        item_height={stknote_width + (FLEXBOX_GAP_PERC * stknote_width * 4)} z_index={z_index} highlighter_mouse_down={_highlighter_mouse_down} highlighter_mouse_drag={_highlighter_mouse_drag}
                        highlighter_mouse_up={_highlighter_mouse_up} />
                    ) : (<div></div>)}
            </div>
            <div>
                <Draggable 
                    onStart={_handle_note_drag_start} 
                    onStop={_handle_note_drag_over} 
                    cancel=".resizer" // Prevent dragging when clicking on the resizer 
                >
                        <div 
                            ref={stk_root_location_ref}
                            id="stknote_root"
                            style={{
                                width: stknote_width + 'px',
                                height: stknote_width + 'px',
                                backgroundColor: props.colour,
                                padding: "10px",
                                borderRadius: "8px",
                                boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
                                cursor: "grab",
                                position: "absolute",
                                left: root_div_position.x + 'px',
                                top: root_div_position.y + 'px',
                                zIndex: z_index,
                                display: "flex",
                                flexDirection: "column",
                                gap: (FLEXBOX_GAP_PERC * stknote_width) + 'px',
                            }}
                            onClick={() => {_set_global_toolbar_items_active_state(TASKBOARD_TOOLBAR_ITEMS.TBI_STKNOTE, true, true)}}
                        >
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
            </div>
        </div>
    );
};

export default _sticky_note;
