import React from 'react';
import { Box } from '@mui/material';
import { InputLabel } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { SPRINT_PLANNING, URL_MAIN } from '../../common/globals';

const _template_select_dropdown = () => {
    
    /* Task boards */
    const [template_type, _set_template_type] = React.useState('');

    const _template_type_change = (event) => {
    _set_template_type(event.target.value);
    
        switch (event.target.value) {
            case SPRINT_PLANNING:
                // _set_current_route("templates/sprint_planning");
                break;
            
            default:
                break;
        }
    };
    
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-select-small-label">Template</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={template_type}
                label="Template Type"
                onChange={_template_type_change}
                >
                <MenuItem value={1}>Sprint Planning</MenuItem>
            </Select>
        </FormControl>
    )
};

export default _template_select_dropdown;