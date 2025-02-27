import React, { useState, useRef, useEffect } from "react";
import Box from '@mui/joy/Box';
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";
import { _colour_picker_round } from "../../common/components/colour_picker";
import { _get_complement_colour } from "../../common/utils";
import { Bold } from "lucide-react";
import { _set_global_toolbar_items_active_state } from "../taskboard_definitions";
import { TOOLBAR_ITEMS } from "../../common/globals";
import { _delete_comment, _update_comment_loc, _update_comment_text, _update_comment_colour, _update_comment_win_width_perc } from "../use_comment";
/**
 * Comment component
 */
const _comment = (props) => {    
    const [is_editing, _set_is_editing] = useState(true);
    
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();

    const [complement_colour, _set_complement_colour] = useState(_get_complement_colour(props.colour));

    const [is_resizing, _set_is_resizing] = useState(false);
    
    const [start_resize_loc, _set_start_resize_loc] = useState({ x: 0, y: 0 });
    
    const COMMENT_MIN_WIDTH             = 150;  //pixels
    const FLEXBOX_GAP_PERC              = 0.02; // 2% of comment height
    const MENUBAR_HGT_PERC              = 0.10; // 10% of comment height
    const EMOJIS_BAR_HGT_PERC           = 0.10; // 10% of comment height
    const FONT_SIZE_PERC                = 0.08; // 8% of comment width
    const MENUBAR_ITEM_WIDTH_PERC       = 0.10; // 10% of comment width
    const STKNOTE_TXTAREA_PADDG_PERC    = 0.05; // 5% of comment width
    const STKNOTE_PARAGR_PADDG_PERC     = 0.15; // 15% of comment width

    let comment_width = props.win_width_perc * props.win_width;
    comment_width = ( comment_width < COMMENT_MIN_WIDTH ) ? COMMENT_MIN_WIDTH : comment_width;

    const font_size = FONT_SIZE_PERC * comment_width;
    let menubar_item_width   = MENUBAR_ITEM_WIDTH_PERC * comment_width;

    const _handle_comment_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.tb_item_loc_update_func(clientX, clientY);
        _update_comment_loc(props.id, clientX, clientY);
    };

    const _handle_comment_drag_start = () => {
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
    }

    const _activate_comment = (editing_comment) => {
        _set_is_editing(editing_comment);
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
    };
    
    const _deactivate_comment = () => {
        _set_is_editing(false);
        _set_z_index(z_index - 1);
    };

    const _add_emoji = (emoji) => {
        let txt = props.text + emoji;
        _update_text(txt);
    };
    
    const _update_text = (updated_text) => {
        _update_comment_text(props.id, updated_text);
        props.taskboard_rerender_func();
    };

    const _update_colour = (updated_hex_colour_val) => {
        _update_comment_colour(props.id, updated_hex_colour_val);
        _set_complement_colour(_get_complement_colour(updated_hex_colour_val));
        props.taskboard_rerender_func();
    };

    const _update_win_width_perc = (updated_win_width_perc) => {
        _update_comment_win_width_perc(props.id, updated_win_width_perc);
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
        let new_width = comment_width + (new_x - start_resize_loc.x);
        let new_win_width_perc =  new_width/props.win_width;
        _update_win_width_perc(new_win_width_perc);
    };


    const _show_extended_emoji_list = () => {
        // TODO: Show emoji list
        console.log("display extended emoji list.");
    };

    const _delete = () => {
        _delete_comment(props.id);
        props.taskboard_rerender_func();
    };

    /********************* Effects block begin ***********************/
    // text area focus on editing
    const textarea_ref = useRef(null);
    useEffect(() => {
        if (is_editing && textarea_ref.current) {
            textarea_ref.current.focus();
        }
    }, [is_editing]);

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
            onStart={_handle_comment_drag_start} 
            onStop={_handle_comment_drag_over}
            cancel=".resizer" // Prevent dragging when clicking on the resizer 
        >
                        
            <div
                id="comment_root"
                style={{
                    width: comment_width + 'px',
                    minHeight: comment_width + 'px',
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
                    gap: (FLEXBOX_GAP_PERC * comment_width) + 'px',
                }}
                onClick={(e) => {_set_global_toolbar_items_active_state(TOOLBAR_ITEMS.TBI_COMMENT, true, true)}}
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
                    id="comment_menubar"
                    style={{
                        flexBasis: MENUBAR_HGT_PERC * comment_width + 'px',
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERC * comment_width) + 'px',
                        justifyContent: "flex-end",
                        background: props.colour,
                    }}
                >
                    <div
                        id="btn_comment_colour"
                        style={{
                            flexBasis: menubar_item_width + 'px',
                            height: MENUBAR_HGT_PERC * comment_width + 'px',
                            width: menubar_item_width + 'px',
                            color: complement_colour 
                        }}
                    >
                        <_colour_picker_round id={props.id} width={menubar_item_width} height={menubar_item_width} colour={complement_colour} x_pos={props.x_pos - comment_width} y_pos={props.y_pos - comment_width} 
                            update_colour_func={_update_colour} onclick_func={_colour_picker_btn_clicked}/>
                    </div>
                    <div
                        id="btn_comment_delete"
                        style={{
                            flexBasis: menubar_item_width + 'px',
                            background: props.colour,
                            borderRadius: "50%",
                            cursor: "pointer",
                            height: MENUBAR_HGT_PERC * comment_width + 'px',
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
                    id="comment_emojis"
                    style={{
                        flexBasis: EMOJIS_BAR_HGT_PERC * comment_width + 'px',
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERC * comment_width) + 'px',
                        background: props.colour,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 0, flex: 1 }}>
                        <IconButton  
                            style={{
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            variant="outlined" 
                            onClick={() => _add_emoji('👍')}
                        >
                        👍
                        </IconButton>
                        <IconButton 
                            style={{
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            variant="outlined"  
                            onClick={() => _add_emoji('🏖')}
                        >
                        🏖
                        </IconButton>
                        <IconButton 
                            style={{
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            variant="outlined" 
                            onClick={() => _add_emoji('😍')}
                        >
                        😍
                        </IconButton>
                        <IconButton 
                            style={{
                                fontSize: font_size * 1.5 + 'px',
                                color: complement_colour,
                                fontWeight: Bold,
                            }}
                            variant="outlined" 
                            onClick={() => _show_extended_emoji_list()}
                        >
                        +
                        </IconButton>
                    </Box>
                </div>
                <div id="comment_text_area">
                    {is_editing ? (
                        <textarea
                            placeholder="comment…"
                            value={props.text}
                            onChange={(event) => _update_text(event.target.value)}
                            minrows={2}
                            maxrows={4}
                            onBlur={_deactivate_comment}
                            style={{
                                marginTop: (FLEXBOX_GAP_PERC * comment_width) + 'px',
                                width: (comment_width - (STKNOTE_TXTAREA_PADDG_PERC * comment_width)) + 'px',
                                height: comment_width + 'px',
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                resize: "none",
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            ref={textarea_ref}
                        />
                    ) : (
                        <p 
                            style={{
                                marginTop: (0.15 * comment_width) + 'px',
                                width: comment_width + 'px',
                                height: (comment_width - (STKNOTE_PARAGR_PADDG_PERC * comment_width)) + 'px',
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                resize: "none",
                                fontSize: font_size + 'px',
                                color: complement_colour,
                            }}
                            onClick={() => _activate_comment(true)}
                        >
                                {props.text}
                        </p>
                    )}
                </div>
            </div>
        </Draggable>
    );
};

export default _comment;