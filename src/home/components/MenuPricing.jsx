import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const _pricing_menu = (props) => 
{
    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" {...bindTrigger(popupState)}>
                Pricing
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close} value={0}>PricingOpt0</MenuItem>
                    <MenuItem onClick={popupState.close} value={1}>PricingOpt1</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _pricing_menu;