import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { TASKBOARD_TYPES, URL_MAIN } from '../../common/globals';

const _taskboard_menu = (props) => 
{
    /* Task boards */
    const [template_type, _set_taskboard_type] = React.useState('');

    const _taskboard_type_selected = (event) => {
        _set_taskboard_type(event.target.value);
    
        switch (event.target.value) {
            case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
                props._on_update_route("taskboard/default");
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
                TaskBoards
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={_taskboard_type_selected} value={TASKBOARD_TYPES.TASKBOARD_DEFAULT}>Default</MenuItem>
                    <MenuItem onClick={_taskboard_type_selected} value={0}>Sample Taskboard</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _taskboard_menu;