import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { TASKBOARD_TOOLBAR_ITEM } from './toolbar_globals';
import { TOOLBAR_ITEM_TYPE } from '../common/globals';
import { SHAPES_TOOLBAR_ITEM_TYPE } from './toolbar_globals';
import { TASKBOARD_DEFAULT_SHAPES_TB_LOC } from './toolbar_globals';
import { TASKBOARD_DEFAULT_TB_SIZE } from './toolbar_globals';
import { TASKBOARD_STATES } from '../taskboards/taskboard_globals';
import { _get_subtoolbar_z_index } from '../common/globals';
import { _get_selected_color_theme } from '../common/components/global_settings';

import line_img from '../../res/imgs/shapes_sub_toolbar/img_line_100x100.png';
import arrow_img from '../../res/imgs/shapes_sub_toolbar/img_arrow_100x100.png';
import circle_img from '../../res/imgs/shapes_sub_toolbar/img_circle_100x100.png';
import rect_img from '../../res/imgs/shapes_sub_toolbar/img_rect_100x100.png';
import filleted_rect_img from '../../res/imgs/shapes_sub_toolbar/img_filleted_rect_100x100.png';
import triangle_img from '../../res/imgs/shapes_sub_toolbar/img_triangle_100x100.png';
import right_angle_img from '../../res/imgs/shapes_sub_toolbar/img_right_angle_100x100.png';
import left_angle_img from '../../res/imgs/shapes_sub_toolbar/img_left_angle_100x100.png';
import zIndex from '@mui/material/styles/zIndex';

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
        }
    };

    const _handle_drag_end = (e) => {
        _set_is_dragging(false);
        const { clientX, clientY } = e;
        props.drag_update_func(props.item_index, false, clientX, clientY); 

        // toolbar-item specific actions
        switch(props.item_index)
        {
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
            {
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
        props.shapes_tb_item_clicked(e, props.item_index); // tb item clicked
        _on_tb_item_click(e, props.item_index);        

        // trigger re-render
        props.taskboard_rerender_func();

        // request taskboard state
        props.request_taskboard_state_func(TASKBOARD_STATES.TBS_WAITING_DRAW_SHAPE);
    };

    const _on_tb_item_click = (e, tb_item_idx) => {
        switch(tb_item_idx)
        {
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE:
            {
                break;
            }
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW:
            {
                break;
            }
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE:
            {
                break;    
            }
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT:
            {
                break;   
            }          
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT:  
            {
                break;
            }
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE:             
            {
                break;    
            }            
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE:    
            {
                break;
            }
            case SHAPES_TOOLBAR_ITEM_TYPE.STBI_LEFT_TRIANGLE:    
            {
                break;
            }                       
            default:
            {
                break;
            }
        }
    };

    if(props.tbi_type === TOOLBAR_ITEM_TYPE.CLICKABLE)
    {
        return (
                <div id="main_tb_item" onMouseDown={_handle_tb_item_click} >
                    <_square_fab>
                        <img 
                            draggable
                            onDragStart={_handle_drag_start}
                            src={props.img_src}
                            title={props.img_alt_txt}
                            alt={props.img_alt_txt} 
                            style={{ width: props.tb_item_width, height: props.tb_item_height }}
                        />
                    </_square_fab>
                </div>
        );
    }
    else
    {
        return (
            <div id="main_tb_item" onClick={_handle_tb_item_click} >
                <_square_fab>
                    <img 
                        draggable
                        onDragStart={_handle_drag_start}
                        src={props.img_src}
                        title={props.img_alt_txt}
                        alt={props.img_alt_txt} 
                        style={{ width: props.tb_item_width, height: props.tb_item_height }}
                    />
                </_square_fab>
            </div>
        );
    }
};

/**************************** Toolbar Stylings begin ***************************/
let toolbar_styling_top = {
    position: 'fixed', 
    top: TASKBOARD_DEFAULT_SHAPES_TB_LOC.top + '%', 
    left: TASKBOARD_DEFAULT_SHAPES_TB_LOC.left + '%', 
    transform: 'translateX(-50%)', // Offset the div by half its width
    backgroundColor: _get_selected_color_theme().bg_colour,
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 0 8px 8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: _get_subtoolbar_z_index(),
};

let toolbar_styling_left = {
    position: 'fixed',
    top: (TASKBOARD_DEFAULT_SHAPES_TB_LOC.left - 10 + '%'), 
    left: TASKBOARD_DEFAULT_SHAPES_TB_LOC.top + '%', 
    transform: 'translateY(-50%)',
    backgroundColor: _get_selected_color_theme().bg_colour, 
    color: 'white',
    padding: '5px 10px',
    borderRadius: '0 8px 8px 0',
    boxShadow: '2px 0 6px rgba(0, 0, 0, 0.1)',
    zIndex: _get_subtoolbar_z_index(),
};
/**************************** Toolbar Stylings end ****************************/

/**
 * shapes sub toolbar component
 */
const _shapes_sub_toolbar = (props) => {
    let location = props.pos; // ideally top or left

    // default: left, vertical toolbar
    let flex_dir = "column";
    let toolbar_styling = toolbar_styling_left;

    const ITEM_PERCENTAGE = TASKBOARD_DEFAULT_TB_SIZE; // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = TASKBOARD_DEFAULT_TB_SIZE; // toolbar container res percentage rtive to window size (3 percent of orig win)
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
            top: props_1.y1_pos, 
            left: props_1.x1_pos, 
            width: props_1.tb_hover_w * 2,
            height: props_1.tb_hover_h * 2,
            opacity: 0.5, // Makes it slightly transparent
            zIndex: _get_subtoolbar_z_index(),
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
            <div id="shapes_subtoolbar_root" style={toolbar_styling}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={flex_dir}>
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_LINE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={line_img} img_alt_txt={"Line"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_ARROW} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={arrow_img} img_alt_txt={"Arrow"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_CIRCLE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={circle_img} img_alt_txt={"Circle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_RECT} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={rect_img} img_alt_txt={"Rectangle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_FILLETED_RECT} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={filleted_rect_img} img_alt_txt={"Filleted Rectangle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_TRIANGLE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={triangle_img} img_alt_txt={"Triangle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_LEFT_TRIANGLE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={left_angle_img} img_alt_txt={"Left angle triangle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                    <_add_toolbar_item shapes_tb_item_clicked={props.shapes_tb_item_clicked_func} item_index={SHAPES_TOOLBAR_ITEM_TYPE.STBI_RIGHT_TRIANGLE} tbi_type={TOOLBAR_ITEM_TYPE.CLICKABLE} img_src={right_angle_img} img_alt_txt={"Right angle triangle"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} drag_update_func={update_dragged_item_info} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state_func}
                    />
                </Box>
            </div>
        </div>
    );
};

export default _shapes_sub_toolbar;