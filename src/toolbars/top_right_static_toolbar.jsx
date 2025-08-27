import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { height, styled } from '@mui/system';
import settings_img from '../../res/imgs/settings_100x100.png';
import history_img from '../../res/imgs/history_100x100.png';
import blank_profile_img from '../../res/imgs/blank_profile_100x100.png';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { TOP_RIGHT_STATIC_TOOLBAR_ITEMS } from './toolbar_globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';
import _user_profile from '../common/user_profile';
import _settings from '../common/settings';
import _taskboard_history from '../taskboards/components/taskboard_history';
import _taskboard_apps from '../taskboards/components/taskboard_apps';
import { _get_selected_color_theme } from '../common/components/global_settings';


/**
 * top-right static toolbar component
 *  
 */
const _top_right_static_toolbar = (props) => {

    let profile_image = blank_profile_img; // default profile image

    const OVERALL_TOOLBAR_WIDTH_PERC = 0.10;     // % of the window width
    const OVERALL_TOOLBAR_HEIGHT_PERC = 0.05;  // % of the window height

    const overall_toolbar_width = OVERALL_TOOLBAR_WIDTH_PERC * props.win_width;     // width of the toolbar px
    const overall_toolbar_height = OVERALL_TOOLBAR_HEIGHT_PERC * props.win_height;  // Height of the toolbar px

    const item_width = 0.20 * overall_toolbar_width;        // px
    const item_height = 0.8 * overall_toolbar_height;       // px
        
    /**************************** Toolbar Stylings begin ***************************/
    let toolbar_styling_top = {
        position: 'fixed', 
        top: 0,
        right: 0,
        width: overall_toolbar_width + 'px',
        height: overall_toolbar_height + 'px',
        backgroundColor: _get_selected_color_theme().bg_colour,
        color: 'white',
        padding: '5px 10px',
        borderRadius: '0 0 8px 8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        zIndex: _get_toolbar_z_index(),
    };

/**************************** Toolbar Stylings end ****************************/
    const _do_nothing = (param) => 
    {
        console.log("do nothing: param = ", param);
        return;
    }

    const _re_render_func = (new_theme) => {
        props.taskboard_rerender_func();
    }

    return (
        <div>
            <div 
                id="top_right_static_toolbar_root" 
                style={toolbar_styling_top}
            >
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"} justifyContent="flex-end" alignItems="center">
                    <_taskboard_history trigger_width={item_width} trigger_height={item_height} img_src={history_img} 
                        win_width={props.win_width} img_alt_txt={"History"} taskboard_rerender_func={props.taskboard_rerender_func} 
                        request_taskboard_state_func={props.request_taskboard_state_func}
                    />

                    <_user_profile trigger_width={item_width} trigger_height={item_height} img_src={profile_image} />

                    {/* Settings modal */}
                    <_settings trigger_width={item_width} trigger_height={item_height} img_src={settings_img} 
                        win_width={props.win_width} img_alt_txt={"Settings"} request_taskboard_state_func={props.request_taskboard_state_func}
                        re_render_func={_re_render_func}    
                    />

                    {/* Apps dropdown */}
                    <_taskboard_apps trigger_width={item_width} trigger_height={item_height} re_render_func={_re_render_func} />
                    
                </Box>
            </div>            
        </div>
    );
};

export default _top_right_static_toolbar;