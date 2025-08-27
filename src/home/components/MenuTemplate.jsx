import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { TEMPLATE_CODES, URL_MAIN } from '../../common/globals';
import { useContext } from 'react';
import { _global_state_context } from '../../common/global_state_context';
import { _get_selected_color_theme } from '../../common/components/global_settings';

const _template_menu = (props) => 
{
    /* Task boards */
    const [template_type, _set_template_type] = React.useState('');
    const { global_route, _set_global_route } = useContext(_global_state_context);

    const _template_type_selected = (event) => {
        _set_template_type(event.target.value);
    
        switch (event.target.value) {
            case TEMPLATE_CODES.SPRINT_PLANNING:
                _set_global_route("templates/sprint_planning");
                break;
            
            default:
                _set_global_route("/");
                break;
        }
    };

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" style={{ fontWeight: 'bold', color: _get_selected_color_theme().text_colour, background: _get_selected_color_theme().surface_colour }} {...bindTrigger(popupState)}>
                Project Templates
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={_template_type_selected} value={TEMPLATE_CODES.SPRINT_PLANNING}>Sprint Planning</MenuItem>
                    <MenuItem onClick={_template_type_selected} value={0}>Sample Template</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _template_menu;