import React, { useState } from "react";
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { _get_max_z_index, _use_max_z_index } from "../../common/globals";

const _comment = (props) => {
    const [comment_text, _set_comment_text] = useState(props.text);
    const _add_emoji = (emoji) => () => _set_comment_text(`${comment_text}${emoji}`);
    const [is_editing, _set_is_editing] = useState(true);
    
    const [z_index, _set_z_index] = useState(_get_max_z_index());
    _use_max_z_index();

    const COMMENT_PERCENTAGE    = 0.15;
    const COMMENT_MIN_WIDTH     = 150; //pixels

    let comment_width = COMMENT_PERCENTAGE * props.win_width;
    comment_width = ( comment_width < COMMENT_MIN_WIDTH ) ? COMMENT_MIN_WIDTH : comment_width;
    const font_size = 0.08 * comment_width;

    const _handle_comment_drag_over = (e) =>   
    {
        const {clientX, clientY} = e;
        props.comment_update_func(clientX, clientY);
    };

    const _handle_comment_drag_start = () => {
        _activate_comment(true);
    }

    const _activate_comment = (editing_comment) => {
        _set_is_editing(editing_comment);
        _set_z_index(_get_max_z_index());
        _use_max_z_index();
        console.log("editing comment " + editing_comment);
    };
    
    const _deactivate_comment = () => {
        console.log("deactivating comment");
        _set_is_editing(false);
        _set_z_index(z_index - 1);
    };
    
    return (
        <Draggable onStart={_handle_comment_drag_start} onStop={_handle_comment_drag_over}>
            <div
                style={{
                    width: comment_width + 'px',
                    minHeight: comment_width + 'px',
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
                onClick={() => _activate_comment(true)}
                onBlur={_deactivate_comment}
            >
                {is_editing ? (
                    <Textarea
                        placeholder="Type in here…"
                        value={comment_text}
                        onChange={(event) => _set_comment_text(event.target.value)}
                        minRows={2}
                        maxRows={4}
                        startDecorator={
                        <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                            <IconButton variant="outlined" color="neutral" onClick={_add_emoji('👍')}>
                            👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={_add_emoji('🏖')}>
                            🏖
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={_add_emoji('😍')}>
                            😍
                            </IconButton>
                        </Box>
                        }
                        endDecorator={
                        <Typography level="body-xs" sx={{ ml: 'auto' }}>
                            {comment_text.length} char(s)
                        </Typography>
                        }
                        
                        style={{
                        marginTop: (0.15 * comment_width) + 'px',
                        width: comment_width + 'px',
                        height: (comment_width - (0.15 * comment_width)) + 'px',
                        border: "none",
                        background: "transparent",
                        resize: "none",
                        fontSize: font_size + 'px',
                        }}
                    />
                ) : (
                    <p 
                        style={{
                            marginTop: (0.15 * comment_width) + 'px',
                            width: comment_width + 'px',
                            height: (comment_width - (0.15 * comment_width)) + 'px',
                            border: "none",
                            background: "transparent",
                            resize: "none",
                            fontSize: font_size + 'px',
                        }}
                        onClick={() => _activate_comment(true)}
                    >
                            {comment_text}
                    </p>
                )}
                <div
                    style={{
                        position: "absolute",
                        top: (0.01 * comment_width) + 'px',
                        right: (0.02 * comment_width) + 'px',
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

export default _comment;