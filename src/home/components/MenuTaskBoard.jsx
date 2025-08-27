import React from 'react';
import Button from '@mui/material/Button';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { TASKBOARD_TYPES, URL_MAIN } from '../../common/globals';
import { useContext } from 'react';
import { _global_state_context } from '../../common/global_state_context';
import { _get_selected_color_theme } from '../../common/components/global_settings';

const _taskboard_menu = (props) => 
{
    /* Task boards */
    const { global_route, _set_global_route } = useContext(_global_state_context);
    const { global_login_status } = useContext(_global_state_context);

    const _taskboard_type_selected = (event) => {
        if(!global_login_status)
        {
            if(props.request_login_handler)
            {
                props.request_login_handler();
            }
            return;
        }

        let taskboard_id = event.currentTarget.dataset.taskboardId;
        let taskboard_name = event.currentTarget.dataset.taskboardName;
        if(taskboard_id !== "")
        {
            console.log("taskboard selected with id: " + taskboard_id + " name: " + taskboard_name);
            _set_global_route("taskboard/" + taskboard_id);
        }
        else
        {
            _set_global_route("/");
        }
        
    };

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
            <React.Fragment>
                <Button variant="text" style={{ fontWeight: 'bold', color: _get_selected_color_theme().text_colour, background: _get_selected_color_theme().surface_colour }} {...bindTrigger(popupState)}>
                TaskBoards
                </Button>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={_taskboard_type_selected} data-taskboard-id="abcde-defgh" data-taskboard-name="New Taskboard1">Create New Taskboard*</MenuItem>
                    <MenuItem onClick={_taskboard_type_selected} sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }} data-taskboard-id="" data-taskboard-name="">View All Taskboards</MenuItem>
                </Menu>
            </React.Fragment>
            )}
        </PopupState>
    );
};

export default _taskboard_menu;