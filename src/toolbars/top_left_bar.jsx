import * as React from 'react';
import Box from '@mui/material/Box';
import settings_img from '../../res/imgs/settings_100x100.png';
import otb_logo_img from '../../res/imgs/otb_logo/otb_logo_200x72.png';
import blank_profile_img from '../../res/imgs/blank_profile_100x100.png';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';
import { SELECTED_COLOR_THEME } from '../common/components/use_colour_themes';

import _logo from '../common/components/logo';
import _taskboard_profile from '../taskboards/components/taskboard_profile';
import _taskboard_settings from '../taskboards/components/taskboard_settings';
import _taskboard_apps from '../taskboards/components/taskboard_apps';


/**
 * top-right static toolbar component
 *  
 */
const _top_left_bar = (props) => {
    const ITEM_PERCENTAGE = 0.02;       // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = 0.02;       // toolbar container res percentage rtive to window size (3 percent of orig win)
    const ITEM_BR_PERCENTAGE = 0.05;    // toolbar item img border radius percentage
    const LOGO_WIDTH = 0.06;            // logo width percentage of window size (6 percent of orig win)
    
    let item_width = (ITEM_PERCENTAGE * props.win_width);
    let item_height = item_width;
    let item_br = (ITEM_BR_PERCENTAGE * props.win_width);

    let root_width = (ROOT_PERCENTAGE * props.win_width);
    let root_height = root_width;

    let logo_width = (LOGO_WIDTH * props.win_width);
    let logo_height = ITEM_PERCENTAGE * props.win_width;

    let profile_image = blank_profile_img; // default profile image
        
    /**************************** Toolbar Stylings begin ***************************/
    let toolbar_styling_top = {
        position: 'fixed', 
        top: 0,
        left: 0,
        backgroundColor: SELECTED_COLOR_THEME,
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

    const _theme_changed = (new_theme) => {
        props.taskboard_rerender_func();
    }

    return (
        <div>
            <div id="top_right_static_toolbar_root" style={toolbar_styling_top}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"}>
                    <_logo logo_width={logo_width} logo_height={logo_height} img_src={otb_logo_img} 
                        win_width={props.win_width} img_alt_txt={"OpenTaskBoard"}
                    />

                    {/* <_taskboard_profile trigger_width={item_width} trigger_height={item_height} img_src={profile_image} 
                        win_width={props.win_width} img_alt_txt={"Profile"} taskboard_rerender_func={props.taskboard_rerender_func} 
                        request_taskboard_state_func={props.request_taskboard_state}    
                    /> */}

                    {/* Settings dropdown */}
                    {/* <_taskboard_settings trigger_width={item_width} trigger_height={item_height} img_src={settings_img} 
                        win_width={props.win_width} img_alt_txt={"Settings"} taskboard_rerender_func={props.taskboard_rerender_func} 
                        request_taskboard_state_func={props.request_taskboard_state}
                        on_theme_change={_theme_changed}    
                    /> */}

                    {/* Apps dropdown */}
                    {/* <_taskboard_apps /> */}
                    
                </Box>
            </div>            
        </div>
    );
};

export default _top_left_bar;