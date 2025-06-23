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
            }
            default:
            {
                b_result = false;
                break;
            }
        }

        return b_result;
    };
}
