import { Taskboard_Activity_Stack } from "./taskboard_activity_stack";

//*********** Taskboard activity stacks list ****************//
/**
 * Taskboard_Activity_Stacks list
 * object structure is:
 * {
 *   taskboard_id: taskboard id number,
 *   taskboard_activity_stack: Taskboard_Activity_Stack object 
 * }
 */
const Taskboard_Activity_Stacks = {};

const _taskboard_activity_stack_exists = (taskboard_id) => {
    for (let i = 0; i < Object.keys(Taskboard_Activity_Stacks).length; i++) {
        if (Taskboard_Activity_Stacks[i].taskboard_id === taskboard_id) {
            return true;
        }
    }

    return false;
};

const _add_taskboard_activity_stack = (taskboard_id) => {
    if(!_taskboard_activity_stack_exists(taskboard_id)) {
        Taskboard_Activity_Stacks[taskboard_id] = {
            taskboard_id: taskboard_id,
            taskboard_activity_stack: new Taskboard_Activity_Stack(taskboard_id)
        };

        return true;
    }

    return false;
};

const _add_activity_to_stack = (taskboard_id, activity) => {
    for (let i = 0; i < Object.keys(Taskboard_Activity_Stacks).length; i++) 
    {
        if (Taskboard_Activity_Stacks[i].taskboard_id === taskboard_id) {
            console.log(Taskboard_Activity_Stacks[i]);
            if(Taskboard_Activity_Stacks[i].taskboard_activity_stack !== null)
            {
                Taskboard_Activity_Stacks[i].taskboard_activity_stack.push(activity);
            }
            return true;
        }
    }

    return false;
}

const _delete_latest_activity_from_stack = (taskboard_id) => {

    for (let i = 0; i < Object.keys(Taskboard_Activity_Stacks).length; i++) 
    {
        if (Taskboard_Activity_Stacks[i].taskboard_id === taskboard_id) {
            if(Taskboard_Activity_Stacks[i].taskboard_activity_stack !== null)
            {
                return Taskboard_Activity_Stacks[i].taskboard_activity_stack.pop();
            }
        }
    }

    return null;
};

const _restore_last_removed_to_stack = (taskboard_id) => {
    for (let i = 0; i < Object.keys(Taskboard_Activity_Stacks).length; i++) 
    {
        if (Taskboard_Activity_Stacks[i].taskboard_id === taskboard_id) {
            if(Taskboard_Activity_Stacks[i].taskboard_activity_stack !== null)
            {
                return Taskboard_Activity_Stacks[i].taskboard_activity_stack.restore();
            }
        }
    }

    return null;
};


export {
    Taskboard_Activity_Stacks,
    _taskboard_activity_stack_exists,
    _add_taskboard_activity_stack,
    _add_activity_to_stack,
    _delete_latest_activity_from_stack,
    _restore_last_removed_to_stack
};