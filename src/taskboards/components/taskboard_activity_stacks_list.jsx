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
    return !!Taskboard_Activity_Stacks[taskboard_id];
};

const _add_taskboard_activity_stack = (taskboard_id) => {
    if (!_taskboard_activity_stack_exists(taskboard_id)) {
        Taskboard_Activity_Stacks[taskboard_id] = {
            taskboard_id: taskboard_id,
            taskboard_activity_stack: new Taskboard_Activity_Stack(taskboard_id)
        };
        return true;
    }
    return false;
};

const _add_activity_to_stack = (taskboard_id, activity) => {
    const stack_obj = Taskboard_Activity_Stacks[taskboard_id];
    if (stack_obj && stack_obj.taskboard_activity_stack) {
        stack_obj.taskboard_activity_stack.push(activity);
        return true;
    }
    return false;
};

const _delete_latest_activity_from_stack = (taskboard_id) => {
    const stack_obj = Taskboard_Activity_Stacks[taskboard_id];
    if (stack_obj && stack_obj.taskboard_activity_stack) {
        return stack_obj.taskboard_activity_stack.pop();
    }
    return null;
};

const _restore_last_removed_to_stack = (taskboard_id) => {
    const stack_obj = Taskboard_Activity_Stacks[taskboard_id];
    if (stack_obj && stack_obj.taskboard_activity_stack) {
        return stack_obj.taskboard_activity_stack.restore();
    }
    return null;
};

const _get_latest_activity_from_stack = (taskboard_id) => {
    const stack_obj = Taskboard_Activity_Stacks[taskboard_id];
    if (stack_obj && stack_obj.taskboard_activity_stack) {
        return stack_obj.taskboard_activity_stack.peek();
    }
    return null;
};

export {
    Taskboard_Activity_Stacks,
    _taskboard_activity_stack_exists,
    _add_taskboard_activity_stack,
    _add_activity_to_stack,
    _delete_latest_activity_from_stack,
    _restore_last_removed_to_stack,
    _get_latest_activity_from_stack,
};