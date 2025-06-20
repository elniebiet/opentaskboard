import * as React from 'react';
import _taskboard_default from './taskboard_default';
import { TASKBOARD_DEFAULT } from '../common/globals';

/**
 * Taskboard base component
 *  
 */
const _get_taskboard = (taskboard_code) => 
{
    switch(taskboard_code)
    {
        case TASKBOARD_DEFAULT:
        {
            return <_taskboard_default />;
        }
        default:
        {
            return <_taskboard_default />;    
        }
    }
}
const _taskboard = (props) => {
    // Task boards must implement the following functions
    // - _load_all_components
    // - _undo
    // - _redo
    // - _add_component(component type, component data))
    // - _delete_component(component type, component id)

    return (
        <div>
            { _get_taskboard(props.taskboard_code) }
        </div>
    );
};

export default _taskboard;