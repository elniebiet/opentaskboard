import React, { useState } from "react";
import Box from '@mui/joy/Box';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import Draggable from "react-draggable";
import { SELECTED_COLOR_THEME } from "../../common/globals";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const _comment = (props) => {
    const [comment_text, _set_comment_text] = useState(props.text);
    const _add_emoji = (emoji) => () => _set_comment_text(`${comment_text}${emoji}`);
    const [is_editing, _set_is_editing] = useState(true);
    
    const COMMENT_PERCENTAGE    = 0.15;
    const COMMENT_MIN_WIDTH     = 150; //pixels

    let comment_width = COMMENT_PERCENTAGE * props.win_width;
    comment_width = ( comment_width < COMMENT_MIN_WIDTH ) ? COMMENT_MIN_WIDTH : comment_width;
    const font_size = 0.08 * comment_width;

    const _handle_comment_drag = (e) =>   
    {
        const {clientX, clientY} = e;
        props.comment_update_func(clientX, clientY);
    };

    return (
        <Draggable onStop={_handle_comment_drag}>
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
                }}
            >
                {is_editing ? (
                    <Textarea
                        placeholder="Type in here…"
                        value={comment_text}
                        onChange={(event) => _set_comment_text(event.target.value)}
                        // onBlur={() => _set_is_editing(false)}
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
                        onClick={() => _set_is_editing(true)}
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