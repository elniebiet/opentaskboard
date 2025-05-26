import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/system';
import settings_img from '../../res/imgs/settings_100x100.png';
import history_img from '../../res/imgs/history_100x100.png';
import blank_profile_img from '../../res/imgs/blank_profile_100x100.png';
import { SELECTED_COLOR_THEME } from '../common/globals';
import { _get_max_z_index, _use_max_z_index } from '../common/globals';
import { _set_global_cursor_type } from '../taskboards/taskboard_globals';
import { _get_toolbar_z_index } from '../common/globals';
import { TOP_RIGHT_STATIC_TOOLBAR_ITEMS } from './toolbar_globals';
import { _colour_picker_no_button } from '../common/components/colour_picker';

import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';

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
            case TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_HISTORY:
            {
                props.trs_tb_item_clicked_notif(TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_HISTORY);
                break;    
            }
            case TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_PROFILE:
            {
                // e.stopPropagation(); // to keep toolbar active
                props.trs_tb_item_clicked_notif(TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_PROFILE);
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
        case TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_HISTORY:
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
 * top-right static toolbar component
 *  
 */
const _top_right_static_toolbar = (props) => {
    const ITEM_PERCENTAGE = 0.02;       // toolbar item res percentage rtive to window size (2 percent of orig win)
    const ROOT_PERCENTAGE = 0.02;       // toolbar container res percentage rtive to window size (3 percent of orig win)
    const ITEM_BR_PERCENTAGE = 0.05;    // toolbar item img border radius percentage

    let item_width = (ITEM_PERCENTAGE * props.win_width);
    let item_height = item_width;
    let item_br = (ITEM_BR_PERCENTAGE * props.win_width);

    let root_width = (ROOT_PERCENTAGE * props.win_width);
    let root_height = root_width;

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
    const _do_nothing = () => 
    {
        return;
    }

    return (
        <div>
            <div id="top_right_static_toolbar_root" style={toolbar_styling_top}>
                <Box sx={{ '& > :not(style)': { m: 0.5 } }} display="flex" flexDirection={"row"}>
                    <_add_toolbar_item item_index={TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_HISTORY} img_src={history_img} img_alt_txt={"History"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    trs_tb_item_clicked_notif={props.trs_toolbar_item_clicked} 
                    />
                    <_add_toolbar_item item_index={TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_PROFILE} img_src={profile_image} img_alt_txt={"Profile"} 
                    tb_item_width={item_width} tb_item_height={item_height} tb_root_width={root_width} tb_root_height={root_height} tb_item_br={item_br} 
                    taskboard_rerender_func={props.taskboard_rerender_func} request_taskboard_state_func={props.request_taskboard_state}
                    trs_tb_item_clicked_notif={props.trs_toolbar_item_clicked}
                    />

                    {/* Settings dropdown */}
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                            sx={{ borderRadius: 40, width: item_width, height: item_height, p: 0 }}
                        >
                            <img 
                                src={settings_img}
                                alt="Settings"
                                title="Settings"
                                style={{ width: item_width, height: item_height }}
                            />
                        </MenuButton>
                        <Menu
                            aria-labelledby="settings-menu"
                            variant="plain"
                            sx={{
                            '--List-padding': '0.5rem',
                            minWidth: 150
                            }}
                        >
                            <MenuItem onClick={() => props.trs_toolbar_item_clicked(TOP_RIGHT_STATIC_TOOLBAR_ITEMS.TRTBI_SETTINGS)}>Colour Theme</MenuItem>
                            <MenuItem onClick={() => console.log("Preferences clicked")}>Preferences</MenuItem>
                            <MenuItem onClick={() => console.log("Account clicked")}>Account</MenuItem>
                        </Menu>
                    </Dropdown>

                    {/* Apps dropdown */}
                    <Dropdown>
                        <MenuButton
                            slots={{ root: IconButton }}
                            slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                            sx={{ borderRadius: 40 }}
                        >
                            <Apps />
                        </MenuButton>
                        <Menu
                            variant="solid"
                            invertedColors
                            aria-labelledby="apps-menu-demo"
                            sx={{
                            '--List-padding': '0.5rem',
                            '--ListItemDecorator-size': '3rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 100px)',
                            gridAutoRows: '100px',
                            gap: 1,
                            }}
                        >
                            <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar>S</Avatar>
                            </ListItemDecorator>
                            Share
                            </MenuItem>
                            <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar>R</Avatar>
                            </ListItemDecorator>
                            Record
                            </MenuItem>
                            <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar>M</Avatar>
                            </ListItemDecorator>
                            Mail
                            </MenuItem>
                            <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar>D</Avatar>
                            </ListItemDecorator>
                            Drive
                            </MenuItem>
                            <MenuItem orientation="vertical">
                            <ListItemDecorator>
                                <Avatar>C</Avatar>
                            </ListItemDecorator>
                            Calendar
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                </Box>
            </div>            
        </div>
    );
};

export default _top_right_static_toolbar;