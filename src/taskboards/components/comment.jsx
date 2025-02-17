import React, { useState, useRef, useEffect } from "react";
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";
import { _colour_picker_round } from "../../common/components/colour_picker";
import { _get_complement_colour } from "../../common/utils";

const _comment = (props) => {    
    const [is_editing, _set_is_editing] = useState(true);
    
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();

    const [complement_colour, _set_complement_colour] = useState(_get_complement_colour(props.colour));
    
    const COMMENT_PERCENTAGE            = 0.15;
    const COMMENT_MIN_WIDTH             = 150;  //pixels
    const FLEXBOX_GAP_PERCENTAGE        = 0.02; // 2% of comment height
    const MENU_BAR_HGT_PERCENTAGE       = 0.10; // 10% of comment height
    const EMOJIS_BAR_HGT_PERCENTAGE     = 0.10; // 10% of comment height
    const FONT_SIZE_PERC                = 0.08; // 8% of comment width
    const MENUBAR_ITEM_WIDTH_PERC       = 0.10; // 10% of comment width
    const STKNOTE_TXTAREA_PADDG_PERC    = 0.05; // 5% of comment width
    const STKNOTE_PARAGR_PADDG_PERC     = 0.15; // 15% of comment width

    let comment_width = COMMENT_PERCENTAGE * props.win_width;
    comment_width = ( comment_width < COMMENT_MIN_WIDTH ) ? COMMENT_MIN_WIDTH : comment_width;

    const font_size = FONT_SIZE_PERC * comment_width;
    let menubar_item_width   = MENUBAR_ITEM_WIDTH_PERC * comment_width;

    const _handle_comment_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.tb_item_loc_update_func(clientX, clientY);
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
        _update_comment(txt);
    };
    
    const _update_comment = (updated_text) => {
        props.comment_update_func(props.id, updated_text, props.colour);
    };

    const _update_comment_colour = (updated_hex_colour_val) => {
        props.comment_update_func(props.id, props.text, updated_hex_colour_val);
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
        <Draggable onStart={_handle_comment_drag_start} onStop={_handle_comment_drag_over}>
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
                    gap: (FLEXBOX_GAP_PERCENTAGE * comment_width) + 'px',
                }}
            >
                <div 
                    id="comment_menubar"
                    style={{
                        flexBasis: MENU_BAR_HGT_PERCENTAGE * comment_width + 'px',
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERCENTAGE * comment_width) + 'px',
                        justifyContent: "flex-end",
                        background: props.colour,
                    }}
                >
                    <div
                        id="btn_comment_colour"
                        style={{
                            flexBasis: menubar_item_width + 'px', 
                        }}
                    >
                        <_colour_picker_round id={props.id} width={menubar_item_width} height={menubar_item_width} colour={complement_colour} x_pos={props.x_pos - comment_width} y_pos={props.y_pos - comment_width} 
                            update_colour_func={_update_comment_colour} onclick_func={_colour_picker_btn_clicked}/>
                    </div>
                    <div
                        style={{
                            flexBasis: menubar_item_width + 'px', 
                        }}
                    >
                        <IconButton aria-label="delete" size="small" onClick={() => props.on_delete(props.id)}>
                            <DeleteIcon fontSize="small" color="success" />
                        </IconButton>
                    </div>
                </div>
                
                <div
                    id="comment_emojis"
                    style={{
                        flexBasis: EMOJIS_BAR_HGT_PERCENTAGE * comment_width + 'px',
                        display: "flex",
                        flexDirection: "row",
                        gap: (FLEXBOX_GAP_PERCENTAGE * comment_width) + 'px',
                        background: props.colour,
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
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
                    </Box>
                </div>
                <div id="comment_text_area">
                    {is_editing ? (
                        <textarea
                            placeholder="comment…"
                            value={props.text}
                            onChange={(event) => _update_comment(event.target.value)}
                            minrows={2}
                            maxrows={4}
                            onBlur={_deactivate_comment}
                            style={{
                                marginTop: (FLEXBOX_GAP_PERCENTAGE * comment_width) + 'px',
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