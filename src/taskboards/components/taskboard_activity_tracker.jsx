import { Taskboard_Activity_Stack } from "./taskboard_activity_stack";
import { Taskboard_Activity } from "./taskboard_activity";
import { TASKBOARD_TYPES } from "../../common/globals";

//*********** Taskboard activity stacks list ****************//
const Taskboard_Default_Activity_Stack = new Taskboard_Activity_Stack();

/**
 * Taskboard Activity Tracker 
 */
export class Taskboard_Activity_Tracker {
  
    #taskboard_type;
    /**
     * @param {TASKBOARD_TYPES} taskboard_type 
     */
    constructor(taskboard_type) {
        let type = TASKBOARD_TYPES.TASKBOARD_DEFAULT;
        
        if((!Object.values(TASKBOARD_TYPES).includes(taskboard_type)))
        {
            type = taskboard_type;
        }

        this.#taskboard_type = type;
    }

    /**
     * add activity to activity stack 
     * @param {TASKBOARD_TYPES} taskboard_type
     * @param {Taskboard_Activity} activity 
     */
    _add_activity = (taskboard_type, activity) => {
        if(taskboard_type != this.#taskboard_type)
        {
            return false;
        }

        let b_result = false;
        switch(taskboard_type)
        {
            case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
            {
                b_result = Taskboard_Default_Activity_Stack.push(activity);
                break;
            }
            default:
            {
                b_result = false;
                break;
            }
        }

        return b_result;
    };

    /**
     * delete latest activity from stack 
     * @param {TASKBOARD_TYPES} taskboard_type
     * @param {Taskboard_Activity} activity 
     */
    _delete_latest = (taskboard_type, activity) => {
        if(taskboard_type != this.#taskboard_type)
        {
            return false;
        }

        let b_result = true;
        switch(taskboard_type)
        {
            case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
            {
                let popped_activity = Taskboard_Default_Activity_Stack.pop();
                if((activity == null) || 
                    (popped_activity._get_activity().taskboard_component_structure.id !== activity._get_activity().taskboard_component_structure.id))
                {
                    b_result = false;
                }
                break;
            }
            default:
            {
                b_result = false;
                break;
            }
        }

        return b_result;
    };

    /**
     * undo last action by removing from the activity stack
     * @param {*} taskboard_type 
     * @returns undone activity or null 
     */
    _undo = (taskboard_type) => {
        if(taskboard_type != this.#taskboard_type)
        {
            return null;
        }

        let activity = null;
        switch(taskboard_type)
        {
            case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
            {
                activity = Taskboard_Default_Activity_Stack.pop();
                break;
            }
            default:
            {
                activity = null;
                break;
            }
        }

        return activity;
    };

    /**
     * redo an activity by copying back into the main activity stack list
     * @param {*} taskboard_type 
     * @returns redone activity or null
     */
    _redo = (taskboard_type) => {
        if(taskboard_type != this.#taskboard_type)
        {
            return null;
        }

        let activity = null;
        switch(taskboard_type)
        {
            case TASKBOARD_TYPES.TASKBOARD_DEFAULT:
            {
                activity = Taskboard_Default_Activity_Stack.restore();
                break;
            }
            default:
            {
                activity = null;
                break;
            }
        }

        return activity;
    };
}
