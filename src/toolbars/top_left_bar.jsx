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

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


import _logo from '../common/components/logo';
import _taskboard_apps from '../taskboards/components/taskboard_apps';


/**
 * top-right static toolbar component
 *  
 */
const _top_left_bar = (props) => {

    const OVERALL_TOOLBAR_WIDTH_PERC = 0.3;     // % of the window width
    const OVERALL_TOOLBAR_HEIGHT_PERC = 0.055;  // % of the window height

    const overall_toolbar_width = OVERALL_TOOLBAR_WIDTH_PERC * props.win_width;     // width of the toolbar px
    const overall_toolbar_height = OVERALL_TOOLBAR_HEIGHT_PERC * props.win_height;  // Height of the toolbar px

    const logo_width = 0.25 * overall_toolbar_width;    // px
    const logo_height = 0.8 * overall_toolbar_height;   // px

    const taskboard_dropdown_width = 0.6 * overall_toolbar_width;       // px
    const taskboard_dropdown_height = 0.8 * overall_toolbar_height;     // px
    const taskboard_dropdown_font_size = 0.03 * overall_toolbar_width;  // px

    // Dropdown state
    const [anchorEl, _set_anchor_el] = React.useState(null);
    const open = Boolean(anchorEl);

    const _handle_click = (event) => {
        _set_anchor_el(event.currentTarget);
    };

    const _handle_close = () => {
        _set_anchor_el(null);
    };
        
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
                <Box 
                    sx={{ '& > :not(style)': { m: 0.5 }, 
                        width: overall_toolbar_width + "px",
                        height: overall_toolbar_height + "px",
                    }} 
                    display="flex" 
                    flexDirection={"row"}
                >
                    <_logo logo_width={logo_width} logo_height={logo_height} img_src={otb_logo_img} 
                        win_width={props.win_width} img_alt_txt={"OpenTaskBoard"}
                    />

                    {/* Taskboards dropdown */}
                    <Button
                        variant="outlined"
                        color="inherit"
                        size="small"
                        endIcon={<ArrowDropDownIcon />}
                        onClick={_handle_click}
                        sx={{
                            ml: 2,
                            color: SELECTED_COLOR_THEME.text_colour,
                            borderColor: 'white',
                            background: SELECTED_COLOR_THEME.bg_colour,
                            width: taskboard_dropdown_width + "px",
                            height: taskboard_dropdown_height + "px",
                            fontWeight: 'bold',
                            fontSize: taskboard_dropdown_font_size + "px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            '&:hover': { backgroundColor: SELECTED_COLOR_THEME.bg_colour, borderColor: 'white' },
                        }}
                    >
                        {props.taskboard_name}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={_handle_close}
                        sx={{
                            zIndex: _get_toolbar_z_index() + 10,
                            '& .MuiPaper-root': {
                                
                                backgroundColor: SELECTED_COLOR_THEME.bg_colour,
                                color: SELECTED_COLOR_THEME.text_colour,
                            },
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'taskboard-dropdown-button',
                        }}
                    >
                        <MenuItem sx={{ 
                            color: SELECTED_COLOR_THEME.text_colour,
                            background: SELECTED_COLOR_THEME.bg_colour,
                            width: taskboard_dropdown_width + "px",
                            height: taskboard_dropdown_height + "px",
                            fontSize: taskboard_dropdown_font_size + "px",
                         }}>
                            {props.taskboard_name}
                        </MenuItem>
                        <MenuItem
                            sx={{
                                color: SELECTED_COLOR_THEME.text_colour,
                                background: SELECTED_COLOR_THEME.bg_colour,
                                width: taskboard_dropdown_width + "px",
                                height: taskboard_dropdown_height + "px",
                                fontWeight: 'bold',
                                fontSize: taskboard_dropdown_font_size + "px",
                            }}
                        >
                            {"View All Taskboards"}
                        </MenuItem>
                    </Menu>
                    
                </Box>
            </div>            
        </div>
    );
};

export default _top_left_bar;