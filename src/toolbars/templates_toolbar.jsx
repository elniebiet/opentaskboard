import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import pointer_img from '../../res/imgs/img_pointer100x100.png';
import sticky_notes_img from '../../res/imgs/img_stk_100x100.png';
import comment_img from '../../res/imgs/img_comment_100x100.png'; 
import board_marker_img from '../../res/imgs/img_board_marker_100x100.png'; 
import board_marker_img_32 from '../../res/imgs/img_board_marker_32x32.png'; 
import eraser_img from '../../res/imgs/img_eraser_100x100.png'; 
import eraser_img_32 from '../../res/imgs/img_eraser_32x32.png'; 
import shapes_img from '../../res/imgs/img_shapes_100x100.png'; 
import fill_img from '../../res/imgs/img_fill2_100x100.png'; 
import { useState, useEffect } from 'react';
import { TOOLBAR_ITEMS } from '../common/globals';
import { TOOLBAR_ITEM_TYPE } from '../common/globals';
import zIndex from '@mui/material/styles/zIndex';
import { SELECTED_COLOR_THEME } from '../common/globals';
import { SPRINT_TEMPLATE_TB_LOC } from './toolbar_defines';
 
const _add_toolbar_item = (props) => 
{
    let w = props.tb_root_width + 'px';
    let h = props.tb_root_height + 'px';

    const _square_fab = styled(Fab)({
        borderRadius: props.tb_item_br + 'px', 
        width: w,       
        height: h,      
        backgroundColor: '#ffffff', 
        '&:hover': { 
            backgroundColor: '#115293', 
        },
    });

    /************************* dragging block begins *********************************/
    const [is_dragging, _set_is_dragging] = useState(false);

    const _handle_drag_start = (e) => {
        _set_is_dragging(true);
        const { clientX, clientY } = e;
        e.dataTransfer.setDragImage(new Image(), 0, 0); // prevent the browser's default drag image
        props.drag_update_func(props.item_index, true, clientX, clientY); 
    };

    const _handle_drag = (e) => {
        if (is_dragging) {
            const { clientX, clientY } = e; // update ghost element's position
            props.drag_update_func(props.item_index, true, clientX, clientY);
            if(props.item_index === TOOLBAR_ITEMS.TBI_STKNOTE)
            {
                props.item_loc_update_func(clientX, clientY);
            } 
        }
    };

    const _handle_drag_end = (e) => {
        _set_is_dragging(false);
        const { clientX, clientY } = e;
        props.drag_update_func(props.item_index, false, clientX, clientY); 
        
        // toolbar-item specific actions
        switch(props.item_index)
        {
            case TOOLBAR_ITEMS.TBI_STKNOTE:
            {
                props.item_loc_update_func(clientX, clientY);
                props.on_stk_click(false, clientX, clientY);
                break;
            }
            case TOOLBAR_ITEMS.TBI_COMMENT:
            {
                props.item_loc_update_func(clientX, clientY);
                props.on_comment_click(false, clientX, clientY);
                break;
            }
            default:
            {
                break;
            }
        }
    };
    
    /* onMouseUp functions only in component where it was created, we need the global */
    useEffect(() => {
        if (is_dragging) 
        {
          document.addEventListener("mouseup", _handle_drag_end);
        }
    
        return () => {
          document.removeEventListener("mouseup", _handle_drag_end);
        };
    }, [is_dragging]);

    /* onMouseMove functions only in component where it was created, we need the global */
    useEffect(() => {
        if (is_dragging) 
        {
          document.addEventListener("mousemove", _handle_drag);
        }
    
        return () => {
          document.removeEventListener("mousemove", _handle_drag);
        };
    }, [is_dragging]);

    /*************************** dragging block ends *********************************/
    const _handle_tb_item_click = (e) =>
    {
        _on_tb_item_click(e, props.item_index);
    };

    const _on_tb_item_click = (e, tb_item_idx) => {
        switch(tb_item_idx)
        {
            case TOOLBAR_ITEMS.TBI_STKNOTE:
            {
                props.on_stk_click(true);
                break;
            }
            case TOOLBAR_ITEMS.TBI_MARKER:
            {
                props.on_marker_click();
                break;    
            }
            case TOOLBAR_ITEMS.TBI_CURSOR:
            {
                let cursor_type = 'default';
                props.on_pointer_click(cursor_type);
                break;   
            }          
            case TOOLBAR_ITEMS.TBI_FILL:  
            {
                props.on_fill_click();
                break;
            }
            case TOOLBAR_ITEMS.TBI_ERASER:             
            {
                let cursor_type = `url(${eraser_img_32}) 10 10, auto`;
                props.on_eraser_click(cursor_type);
                break;    
            }            
            case TOOLBAR_ITEMS.TBI_SHAPE:    
            {
                const { clientX, clientY } = e;
                props.on_shapes_click(clientX, clientY);
                break;
            }
            case TOOLBAR_ITEMS.TBI_COMMENT:
            {
                props.on_comment_click(true);
                break;    
            }                       
            default:
            {
                break;
            }
        }
    };

    return (
            <div id="main_tb_item">
                <_square_fab>
                    <img 
                        draggable
                        onDragStart={_handle_drag_start}
                        src={props.img_src}
                        alt={props.img_alt_txt} 
                        style={{ width: props.tb_item_width, height: props.tb_item_height }}
                        onClick={_handle_tb_item_click} 
                    />
                </_square_fab>
            </div>
    );
};

/**************************** Toolbar Stylings begin ***************************/
let toolbar_styling_top = {
    position: 'fixed', 
    top: SPRINT_TEMPLATE_TB_LOC.top + '%', 
    left: SPRINT_TEMPLATE_TB_LOC.left + '%', 
    transform: 'translateX(-50%)', // Offset the div by half its width
    backgroundColor: SELECTED_COLOR_THEME,
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

let toolbar_styling_left = {
    position: 'fixed',
    top: SPRINT_TEMPLATE_TB_LOC.left + '%', 
    left: SPRINT_TEMPLATE_TB_LOC.top + '%', 
    transform: 'translateY(-50%)',
    backgroundColor: SELECTED_COLOR_THEME, 
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 8px 8px 0',
    boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
};
/**************************** Toolbar Stylings end ****************************/

const _templates_toolbar = (props) => {
    let location = props.pos; // ideally top or left

    // default: left, vertical toolbar
    let flex_dir = "column";
    let toolbar_styling = toolbar_styling_left;

    const ITEM_PERCENTAGE = 0.03; // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = 0.03; // toolbar container res percentage rtive to window size (3 percent of orig win)
    const ITEM_BR_PERCENTAGE = 0.006; // toolbar item img border radius percentage

    let item_width = (ITEM_PERCENTAGE * props.win_width);
    let item_height = item_width;
    let item_br = (ITEM_BR_PERCENTAGE * props.win_width);

    let root_width = (ROOT_PERCENTAGE * props.win_width);
    let root_height = root_width;
        
    if(location == "top")
    {
        flex_dir = "row";
        toolbar_styling = toolbar_styling_top;
    }
    else if(location == "left")
    {
        flex_dir = "column";
        toolbar_styling = toolbar_styling_left;
    }
    
    const [is_dragging_tb_item, _set_is_dragging_tb_item] = useState({item_index: 0, is_dragging: false, x: 0, y: 0 });

    const update_dragged_item_info = (item_idx, item_is_dragging, pos_x, pos_y) => 
    {
        _set_is_dragging_tb_item({item_index: item_idx, is_dragging: item_is_dragging, x: pos_x, y: pos_y});
        console.log("called " + is_dragging_tb_item.item_index, is_dragging_tb_item.is_dragging, is_dragging_tb_item.x, is_dragging_tb_item.y);
    };
    
    const _on_drag_hover_display = (props_1) =>
    {
        let hoover_tb_styling = {
            position: 'fixed', 
            top: props_1.y_pos, 
            left: props_1.x_pos, 
            width: props_1.tb_hover_w * 2,
            height: props_1.tb_hover_h * 2,
            opacity: 0.5, // Makes it slightly transparent
            zIndex: props.z_index,
            cursor: 'pointer',
        };

        return (
            <div > 
                <img 
                    src={props_1.tb_img} 
                    alt="" 
                    style={hoover_tb_styling}
                /> 
                <h4 style={hoover_tb_styling}>{props_1.tb_title}</h4>
            </div>
        );
    };

    const _do_nothing = () => 
    {
        return;
    }

    return (
        <div>
            <div id="sprint_planning_template_root" style={toolbar_styling}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={flex_dir}>
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_CURSOR} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={pointer_img} img_alt_txt={"Cursor"} 
                    on_pointer_click={props.select_cursor_func}  tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_STKNOTE} tbi_type={TOOLBAR_ITEM_TYPE.DRAGGABLE_CLICKABLE} img_src={sticky_notes_img} img_alt_txt={"Sticky Note"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    on_stk_click={props.add_note_func} item_loc_update_func={props.set_tb_item_loc_func} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_COMMENT} tbi_type={TOOLBAR_ITEMS.DRAGGABLE_CLICKABLE} img_src={comment_img} img_alt_txt={"Comment"} 
                    on_comment_click={props.add_comment_func} item_loc_update_func={props.set_tb_item_loc_func} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_MARKER} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={board_marker_img} img_alt_txt={"Marker"} 
                    on_marker_click={props.marker_draw_func} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_SHAPE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={shapes_img} img_alt_txt={"Shape"} 
                    on_shapes_click={props.shapes_selected_func} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_FILL} tbi_type={TOOLBAR_ITEM_TYPE.DRAGGABLE_CLICKABLE} img_src={fill_img} img_alt_txt={"Fill"} 
                    on_fill_click={props.add_fill_func} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                    <_add_toolbar_item item_index={TOOLBAR_ITEMS.TBI_ERASER} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={eraser_img} img_alt_txt={"Eraser"} 
                    on_eraser_click={props.select_cursor_func} tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} />
                </Box>
            </div>
            
            
            {/* Draggable Items begin */}
            
            { (is_dragging_tb_item.is_dragging) && (is_dragging_tb_item.item_index === TOOLBAR_ITEMS.TBI_STKNOTE) && (
                <_on_drag_hover_display tb_img={sticky_notes_img} tb_title={"Sticky Note"} tb_hover_w={item_width} tb_hover_h={item_height} x_pos={is_dragging_tb_item.x} y_pos={is_dragging_tb_item.y} />
            )}

            { (is_dragging_tb_item.is_dragging) && (is_dragging_tb_item.item_index === TOOLBAR_ITEMS.TBI_COMMENT) && (
                <_on_drag_hover_display tb_img={comment_img} tb_title={"Comment"} tb_hover_w={item_width} tb_hover_h={item_height} x_pos={is_dragging_tb_item.x} y_pos={is_dragging_tb_item.y} />
            )}

            {/* Draggable Items end */}
            
        </div>
    );
};

export default _templates_toolbar;