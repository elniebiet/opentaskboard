import * as React from 'react';
import _taskboard_default from './taskboard_default';
import { TASKBOARD_DEFAULT } from '../common/globals';

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
    return (
        <div>
            { _get_taskboard(props.taskboard_code) }
        </div>
    );
};

export default _taskboard;