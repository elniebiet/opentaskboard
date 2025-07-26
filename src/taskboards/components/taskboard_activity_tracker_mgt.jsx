import { Taskboard_Activity_Tracker } from "./taskboard_activity_tracker";
import { Taskboard_Activity } from "./taskboard_activity";
import { ACTIONS } from "../../common/globals";

/**
 * add taskboard activity to taskboard activity tracker
 * @param {*} taskboard_id - taskboard id
 * @param {ACTIONS} action_type - action type e.g. ADD, DELETE, UPDATE
 * @param {Taskboard_Comp_DS} component_data - component data   
 * @returns true if successful
 */
const _add_activity_to_tracker = ({taskboard_id, action_type, component_data}) => {
    console.log("action type: " + action_type);
    if(action_type != ACTIONS.ADD && action_type != ACTIONS.DELETE && action_type != ACTIONS.UPDATE) return false;
    console.log("adding activity to tracker");
    let b_result = false;
    const new_activity = new Taskboard_Activity(taskboard_id, action_type, component_data);
    const activity_tracker = new Taskboard_Activity_Tracker(taskboard_id);
    b_result = activity_tracker._add_activity(taskboard_id, new_activity);

    return b_result;
}; 

export {
    _add_activity_to_tracker,
}