import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { SELECTED_COLOR_THEME } from '../../common/components/use_colour_themes';

const _about_menu = (props) => 
{
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" style={{ fontWeight: 'bold', color: SELECTED_COLOR_THEME.text_colour, background: SELECTED_COLOR_THEME.surface_colour }} {...bindTrigger(popupState)}>
                About
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close} value={0}>AboutOpt0</MenuItem>
                    <MenuItem onClick={popupState.close} value={1}>AboutOpt1</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _about_menu;