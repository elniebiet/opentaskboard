import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import settings_img from '../../res/imgs/settings_100x100.png';
import history_img from '../../res/imgs/history_100x100.png';
import blank_profile_img from '../../res/imgs/blank_profile_100x100.png';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { TOP_RIGHT_STATIC_TOOLBAR_ITEMS } from './toolbar_globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';
import { SELECTED_COLOR_THEME } from '../common/components/use_colour_themes';
import _user_profile from '../common/user_profile';
import _settings from '../common/settings';
import _taskboard_history from '../taskboards/components/taskboard_history';
import _taskboard_apps from '../taskboards/components/taskboard_apps';


/**
 * top-right static toolbar component
 *  
 */
const _top_right_static_toolbar = (props) => {

    const item_width    = "2.25rem"; // toolbar item res
    const item_height   = "2.25rem"; 
    const item_br       = "5.625rem";
    const root_width    = "2.25rem";
    const root_height   = "2.25rem";

    let profile_image = blank_profile_img; // default profile image
        
    /**************************** Toolbar Stylings begin ***************************/
    let toolbar_styling_top = {
        position: 'fixed', 
        top: 0,
        right: 0,
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

    const _re_render_func = (new_theme) => {
        props.taskboard_rerender_func();
    }

    return (
        <div>
            <div id="top_right_static_toolbar_root" style={toolbar_styling_top}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"}>
                    <_taskboard_history trigger_width={item_width} trigger_height={item_height} img_src={history_img} 
                        win_width={props.win_width} img_alt_txt={"History"} taskboard_rerender_func={props.taskboard_rerender_func} 
                        request_taskboard_state_func={props.request_taskboard_state_func}
                    />

                    <_user_profile trigger_width={item_width} trigger_height={item_height} img_src={profile_image} />

                    {/* Settings modal */}
                    <_settings trigger_width={item_width} trigger_height={item_height} img_src={settings_img} 
                        win_width={props.win_width} img_alt_txt={"Settings"} taskboard_rerender_func={props.taskboard_rerender_func} 
                        request_taskboard_state_func={props.request_taskboard_state_func}
                        re_render_func={_re_render_func}    
                    />

                    {/* Apps dropdown */}
                    <_taskboard_apps />
                    
                </Box>
            </div>            
        </div>
    );
};

export default _top_right_static_toolbar;