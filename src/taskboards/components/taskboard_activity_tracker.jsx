import { Taskboard_Activity } from "./taskboard_activity";
import { _add_taskboard_activity_stack, _taskboard_activity_stack_exists,
    _add_activity_to_stack, _delete_latest_activity_from_stack, _restore_last_removed_to_stack
 } from "./taskboard_activity_stacks_list";

/**
 * Taskboard Activity Tracker 
 */
export class Taskboard_Activity_Tracker {
  
    /**
     * @param {Number} taskboard_id 
     */
    constructor(taskboard_id) {
        if(!_taskboard_activity_stack_exists(taskboard_id)) {
            _add_taskboard_activity_stack(taskboard_id);
        }
    }

    /**
     * add activity to activity stack 
     * @param {Number} taskboard_id
     * @param {Taskboard_Activity} activity 
     */
    _add_activity = (taskboard_id, activity) => {
        if(taskboard_id === -1 || activity === null) return false;

        let b_result = _add_activity_to_stack(taskboard_id, activity);
        
        return b_result;
    };

    /**
     * delete latest activity from stack 
     * @param {Number} taskboard_id 
     */
    _delete_latest = (taskboard_id) => {
        if(taskboard_id === -1) return false;
        
        let result = _delete_latest_activity_from_stack(taskboard_id);

        return (result === null? false : true);
    };

    /**
     * undo last action by removing from the activity stack
     * @param {Number} taskboard_id 
     * @returns undone activity or null 
     */
    _undo = (taskboard_id) => {
        if(taskboard_id === -1) return null;
        
        let activity = _delete_latest_activity_from_stack(taskboard_id);

        return activity;
    };

    /**
     * redo an activity by copying back into the main activity stack list
     * @param {*} taskboard_id 
     * @returns redone activity or null
     */
    _redo = (taskboard_id) => {
        if(taskboard_id === -1) return null;
        
        let activity = _restore_last_removed_to_stack(taskboard_id);

        return activity;
    };
}
