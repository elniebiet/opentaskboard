import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { _get_selected_color_theme } from '../../common/components/global_settings';

const _FAQ_menu = (props) => 
{
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" style={{ fontWeight: 'bold', color: _get_selected_color_theme().text_colour, background: _get_selected_color_theme().surface_colour }} {...bindTrigger(popupState)}>
                FAQ
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close} value={0}>FAQOpt1</MenuItem>
                    <MenuItem onClick={popupState.close} value={1}>FAQOpt2</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _FAQ_menu;