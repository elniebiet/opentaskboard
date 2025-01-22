import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { SPRINT_PLANNING, URL_MAIN } from '../../common/globals';

const _template_menu = (props) => 
{
    /* Task boards */
    const [template_type, _set_template_type] = React.useState('');

    const _template_type_selected = (event) => {
        _set_template_type(event.target.value);
    
        switch (event.target.value) {
            case SPRINT_PLANNING:
                props._on_update_route("templates/sprint_planning");
                break;
            
            default:
                props._on_update_route("/");
                break;
        }
    };

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" {...bindTrigger(popupState)}>
                Template
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={_template_type_selected} value={SPRINT_PLANNING}>Sprint Planning</MenuItem>
                    <MenuItem onClick={_template_type_selected} value={0}>Sample Template</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _template_menu;