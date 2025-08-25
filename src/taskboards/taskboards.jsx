import * as React from 'react';
import _taskboard_default from './taskboard_default';
import { TASKBOARD_TYPES } from '../common/globals';

/**
 * Taskboard base component
 *  
 */
const _get_taskboard = (taskboard_id) => 
{
    switch(taskboard_id)
    {
        case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
        {
            return <_taskboard_default taskboard_type={TASKBOARD_TYPES.TASKBOARD_DEFAULT} taskboard_id={taskboard_id} />;
        }
        default:
        {
            return <_taskboard_default taskboard_type={TASKBOARD_TYPES.TASKBOARD_DEFAULT} taskboard_id={taskboard_id} />;    
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
            { _get_taskboard(props.taskboard_id) }
        </div>
    );
};

export default _taskboard;