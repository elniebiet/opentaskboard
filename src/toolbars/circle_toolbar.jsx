import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import unused_colour_img from '../../res/imgs/line_toolbar/colour_100x100.png';
import increase_circle_width_img from '../../res/imgs/line_toolbar/increase_line_width_100x100.png';
import reduce_circle_width_img from '../../res/imgs/line_toolbar/reduce_line_width_100x100.png';
import delete_img from '../../res/imgs/line_toolbar/delete_100x100.png';
import { SELECTED_COLOR_THEME } from '../common/globals';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { CIRCLE_TOOLBAR_ITEMS } from './toolbar_globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';

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

    
    const _handle_tb_item_click = (e) =>
    {
        _on_tb_item_click(e, props.item_index);
    };

    const _on_tb_item_click = (e, tb_item_idx) => {
        // Note: Can get rid of this switch statement if the cases do nothing else
        switch(tb_item_idx)
        {
            case CIRCLE_TOOLBAR_ITEMS.ATBI_COLOUR:
            {
                props.circle_tb_item_clicked_notif(CIRCLE_TOOLBAR_ITEMS.ATBI_COLOUR);
                break;    
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_INCREASE_CIRCLE_WIDTH:
            {
                e.stopPropagation(); // to keep toolbar active
                props.circle_tb_item_clicked_notif(CIRCLE_TOOLBAR_ITEMS.ATBI_INCREASE_CIRCLE_WIDTH);
                break;    
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_DECREASE_CIRCLE_WIDTH:
            {
                e.stopPropagation(); // to keep toolbar active
                props.circle_tb_item_clicked_notif(CIRCLE_TOOLBAR_ITEMS.ATBI_DECREASE_CIRCLE_WIDTH);
                break;    
            }
            case CIRCLE_TOOLBAR_ITEMS.ATBI_DELETE:
            {
                props.circle_tb_item_clicked_notif(CIRCLE_TOOLBAR_ITEMS.ATBI_DELETE);
                break;    
            }
            default:
            {
                break;
            }
        }

        // trigger rerender
        props.taskboard_rerender_func();
    };
    
    const _do_nothing = () => {};

    switch(props.item_index)
    {
        case CIRCLE_TOOLBAR_ITEMS.ATBI_COLOUR:
        {
            return (
                <div id="main_tb_item" onMouseDown={_handle_tb_item_click}>
                        <div 
                            id="circle_colour_picker"
                            title={props.img_alt_txt}
                        >
                            <_colour_picker_no_button id={"circlecp" + props.id} colour={props.circle_bg_colour} width={props.tb_root_width} height={props.tb_root_width} 
                            update_colour_func={props.circle_update_colour_func} onclick_func={_do_nothing} />
                        </div>
                </div>
            );
        }

        default:
        {
            return (
                <div id="main_tb_item" onMouseDown={_handle_tb_item_click}>
                    <_square_fab>
                        <img 
                            src={props.img_src}
                            title={props.img_alt_txt}
                            alt={props.img_alt_txt} 
                            style={{ width: props.tb_item_width, height: props.tb_item_height }}
                        />
                    </_square_fab>
                </div>
            );
        }
    }
};

/**
 * note toolbar component
 *  
 */
const _circle_toolbar = (props) => {
    const ITEM_PERCENTAGE = 0.02;       // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = 0.02;       // toolbar container res percentage rtive to window size (3 percent of orig win)
    const ITEM_BR_PERCENTAGE = 0.006;   // toolbar item img border radius percentage

    let item_width = (ITEM_PERCENTAGE * props.win_width);
    let item_height = item_width;
    let item_br = (ITEM_BR_PERCENTAGE * props.win_width);

    let root_width = (ROOT_PERCENTAGE * props.win_width);
    let root_height = root_width;
        
    /**************************** Toolbar Stylings begin ***************************/
    let toolbar_styling_top = {
        position: 'fixed', 
        top: props.y_pos + 'px',
        left: props.x_pos + 'px',
        backgroundColor: SELECTED_COLOR_THEME,
        color: 'white',
        padding: '5px 10px',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        zIndex: _get_toolbar_z_index(),
    };

/**************************** Toolbar Stylings end ****************************/
    const _do_nothing = () => 
    {
        return;
    }

    return (
        <div>
            <div id="note_toolbar_root" style={toolbar_styling_top}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"}>
                    <_add_toolbar_item item_index={CIRCLE_TOOLBAR_ITEMS.ATBI_INCREASE_CIRCLE_WIDTH} img_src={increase_circle_width_img} img_alt_txt={"Increase Line Width"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    circle_tb_item_clicked_notif={props.circle_toolbar_item_clicked} circle_update_colour_func={props.circle_update_colour_func} 
                    circle_bg_colour={props.circle_bg_colour}
                    />
                    <_add_toolbar_item item_index={CIRCLE_TOOLBAR_ITEMS.ATBI_DECREASE_CIRCLE_WIDTH} img_src={reduce_circle_width_img} img_alt_txt={"Reduce Line Width"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    circle_tb_item_clicked_notif={props.circle_toolbar_item_clicked} circle_update_colour_func={props.circle_update_colour_func} 
                    circle_bg_colour={props.circle_bg_colour}
                    />
                    <_add_toolbar_item item_index={CIRCLE_TOOLBAR_ITEMS.ATBI_COLOUR} img_src={unused_colour_img} img_alt_txt={"Colour"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    circle_tb_item_clicked_notif={props.circle_toolbar_item_clicked} circle_update_colour_func={props.circle_update_colour_func} 
                    circle_bg_colour={props.circle_bg_colour}
                    />
                    <_add_toolbar_item item_index={CIRCLE_TOOLBAR_ITEMS.ATBI_DELETE} img_src={delete_img} img_alt_txt={"Delete"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    circle_tb_item_clicked_notif={props.circle_toolbar_item_clicked}
                    />
                </Box>
            </div>            
        </div>
    );
};

export default _circle_toolbar;